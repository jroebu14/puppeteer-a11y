const puppeteer = require('puppeteer')
const serialize = require('serialize-javascript')
const replaceElementsWithXPaths = require('./utils/replaceElementsWithXPaths')
const detectTableType = require('./utils/detectTableType')

const sections = Object.entries(require('./standards/sections'))

const urls = ['https://www.bbc.co.uk', 'https://www.bbc.co.uk/news']

module.exports = async () => {
  const browser = await puppeteer.launch()

  const a11yResults = await urls.reduce(
    async (accumulatedResultsPromise, url) => {
      const accumulatedResults = await accumulatedResultsPromise
      const page = await browser.newPage()

      await page.goto(url, { waitUntil: 'load' })
      await page.addScriptTag({
        url: 'https://code.jquery.com/jquery-3.5.1.min.js',
      })
      await page.addScriptTag({
        content: `
        const sections = ${serialize(sections)};
        const replaceElementsWithXPaths = ${serialize(
          replaceElementsWithXPaths,
        )}
        const detectTableType = ${serialize(detectTableType)}
      `,
      })

      const failedSections = await page.evaluate(async () => {
        return sections.reduce(
          (
            accumulatedFailedSections,
            [section, { title, documentationUrl, tests }],
          ) => {
            const failedTests = tests.reduce((problems, { type, test }) => {
              if (type === 'manual') return problems
              const errors = []
              const warnings = []
              const fail = (message, el) => {
                const xPath = el
                  ? replaceElementsWithXPaths(el)
                      .map(({ xpath }) => xpath)
                      .join('')
                  : ''
                errors.push(`${message}${xPath}`)
              }
              const warn = (message, el) => {
                const xPath = el
                  ? replaceElementsWithXPaths(el)
                      .map(({ xpath }) => xpath)
                      .join('')
                  : ''
                warnings.push(`${message}${xPath}`)
              }

              try {
                // eslint-disable-next-line no-undef
                test({ $: jQuery, fail, warn })
                const hasErrors = errors.length
                const hasWarnings = warnings.length

                if (hasErrors || hasWarnings) {
                  return [
                    ...problems,
                    {
                      [section]: {
                        title,
                        documentationUrl,
                        ...(hasErrors && { errors }),
                        ...(hasWarnings && { warnings }),
                      },
                    },
                  ]
                }

                return problems
              } catch ({ message }) {
                return [
                  ...problems,
                  {
                    [section]: {
                      title,
                      documentationUrl,
                      errors: [message],
                    },
                  },
                ]
              }
            }, [])

            if (failedTests.length) {
              return [...accumulatedFailedSections, failedTests]
            }
            return accumulatedFailedSections
          },
          [],
        )
      })

      if (failedSections.length) {
        return [...accumulatedResults, { url, sections: failedSections }]
      }
      return accumulatedResults
    },
    [],
  )

  await browser.close()

  return { pages: a11yResults }
}
