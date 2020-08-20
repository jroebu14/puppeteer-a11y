const sections = require('./sections')

const getAutomatedTests = () =>
  Object.entries(sections).reduce((acc, section) => {
    const automatedTests = section[1].tests.filter(
      ({ type }) => type === 'automated',
    )

    // console.log('xxxx', automatedTests)

    if (automatedTests.length) {
      return [...acc, section]
    }
    return acc
  }, [])

// automatedTests.forEach(([section, { tests }]) => console.log(tests))

module.exports.getAutomatedTests = getAutomatedTests
