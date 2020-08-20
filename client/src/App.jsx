import React from 'react'
import { hot } from 'react-hot-loader'
import { ThemeProvider, CSSReset, Box } from '@chakra-ui/core'

import Results from './Results'

const App = ({ children }) => (
  <ThemeProvider>
    <CSSReset />
    <Box maxWidth="1228px" margin="3rem auto" width="100%">
      <Results />
    </Box>
  </ThemeProvider>
)

export default hot(module)(App)
