import React from 'react'
import styled from 'styled-components'

interface ProgressLineProps {
  active: boolean;
}

const ActiveLine = styled.div`
  width: 100%;
  height: 2px;
  background: #AE32AA 0% 0% no-repeat padding-box;
  position: relative;
  bottom: 1px;
`

const InactiveLine = styled.div`
  width: 100%;
  height: 2px;
  background: #0D1417 0% 0% no-repeat padding-box;
  position: relative;
  bottom: 1px;
`

const ProgressLine: React.FC<ProgressLineProps> = ({ active }) => {
  return active ? <ActiveLine /> : <InactiveLine />
}

export default ProgressLine