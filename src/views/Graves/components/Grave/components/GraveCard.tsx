import styled from 'styled-components'
import React from 'react'

const GraveCardDiv = styled.div`
  width: 100%;
  min-height: 130px;
  background: #151E21 0% 0% no-repeat padding-box;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`

interface GraveCardProps {
  open: boolean;
}

const GraveCard: React.FC<GraveCardProps> = ({ open, children }) => {
  return <GraveCardDiv style={{
    border: open ? '2px solid #AE32AA' : '2px solid #151E21'
  }}>
    {children}
  </GraveCardDiv>
}

export default GraveCard