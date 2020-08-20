import React, { useState, useEffect } from 'react'
import {
  List,
  ListItem,
  ListIcon,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/core'

import Spinner from './components/Spinner'
import Heading from './components/Heading'
import Paragraph from './components/Paragraph'
import Link from './components/Link'

const test = ({ setResults, setLoading }) => {
  return fetch('http://localhost:5000/bbca11y')
    .then(bbcA11yResults => bbcA11yResults.json())
    .then(bbcA11yResults => {
      setResults(bbcA11yResults)
    })
    .then(() => setLoading(false))
}

export default () => {
  const [isLoading, setLoading] = useState(true)
  const [results, setResults] = useState({ pages: [] })

  useEffect(() => {
    test({ setResults, setLoading })
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  if (results.pages.length === 0) {
    return <Heading level="1">No results!</Heading>
  }
  return (
    <>
      <Heading level="1" mb="4">
        BBC a11y checker
      </Heading>
      <Accordion
        borderLeft="solid 1px"
        borderRight="solid 1px"
        borderColor="gray.300"
      >
        {results.pages.map(({ url, sections }) => {
          return (
            <AccordionItem>
              <AccordionHeader>
                <Heading level="3" textAlign="left" flex="1" p="2">
                  URL: {url}
                </Heading>
                <AccordionIcon />
              </AccordionHeader>
              <AccordionPanel pb={4} pt={4}>
                {sections.map(section => {
                  return section.map(standards => {
                    return Object.entries(standards).map(
                      ([
                        key,
                        { title, documentationUrl, errors, warnings },
                      ]) => {
                        return (
                          <Box
                            rounded="lg"
                            border="solid 1px"
                            borderColor="gray.300"
                            p="4"
                            mb="2"
                          >
                            <Heading level="4" mb="4">
                              {title}
                            </Heading>
                            {errors && (
                              <List spacing={3}>
                                {errors.map(error => (
                                  <ListItem>
                                    <ListIcon icon="warning" color="red.500" />
                                    {error}
                                  </ListItem>
                                ))}
                              </List>
                            )}
                            {warnings && (
                              <List spacing={3}>
                                {warnings.map(warning => (
                                  <ListItem>
                                    <ListIcon
                                      icon="warning-2"
                                      color="yellow.500"
                                    />
                                    {warning}
                                  </ListItem>
                                ))}
                              </List>
                            )}
                            <Paragraph pt="8">
                              To fix:{' '}
                              <Link href={documentationUrl}>
                                {documentationUrl}
                              </Link>
                            </Paragraph>
                          </Box>
                        )
                      },
                    )
                  })
                })}
              </AccordionPanel>
            </AccordionItem>
          )
        })}
      </Accordion>
    </>
  )
}
