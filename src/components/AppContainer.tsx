import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`

const AppContainer: React.FC = ({ children }) => {
  return <Container>{children}</Container>
}

export default AppContainer
