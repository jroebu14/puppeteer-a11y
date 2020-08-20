import React from 'react'
import styled from '@emotion/styled'

import Text from './Text'

const Styledtext = styled(Text)`
  font-weight: 700;
  line-height: 1.25;
`

const sizes = {
  1: '3xl',
  2: '2xl',
  3: '1xl',
  4: 'xl',
}

const Heading = ({ level, ...props }) => (
  <Styledtext
    as={`h${level}`}
    color="black"
    fontSize={sizes[level]}
    {...props}
  />
)

Heading.defaultProps = {
  level: 1,
}

export default Heading
