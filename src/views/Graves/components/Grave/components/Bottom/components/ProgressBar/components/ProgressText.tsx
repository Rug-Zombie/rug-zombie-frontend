import React from 'react'
import styled from 'styled-components'

interface ProgressTextProps {
  active: boolean;
}

const ActiveText = styled.div`
  text-align: left;
  font: normal normal 300 14px/21px Poppins;
  letter-spacing: 0px;
  color: #FFFFFF;
`

const InactiveText = styled.div`
  text-align: left;
  font: normal normal 300 14px/21px Poppins;
  letter-spacing: 0px;
  color: #6B7682;
  opacity: 1;
`

const ProgressLine: React.FC<ProgressTextProps> = ({ active, children }) => {
  const Text = active ? ActiveText: InactiveText

  return <Text>
    {children}
  </Text>
}

export default ProgressLine