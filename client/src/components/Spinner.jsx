import React from 'react'
import { Box, Spinner } from '@chakra-ui/core'

export default () => (
  <Box display="flex" justifyContent="center" mt="10">
    <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" size="xl" />
  </Box>
)
