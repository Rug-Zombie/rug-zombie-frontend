import React from 'react'
import styled from 'styled-components'

interface ProgressTextProps {
    active: boolean
}

const ActiveText = styled.p`
  text-align: center;
  font: normal normal 300 14px/17px Poppins;
  color: #ffffff;
`

const InactiveText = styled.p`
  text-align: center;
  font: normal normal 300 14px/17px Poppins;
  color: #6b7682;
`

const BracketLine: React.FC<ProgressTextProps> = ({ active, children }) => {
    const Text = active ? ActiveText : InactiveText

    return <Text>{children}</Text>
}

export default BracketLine
