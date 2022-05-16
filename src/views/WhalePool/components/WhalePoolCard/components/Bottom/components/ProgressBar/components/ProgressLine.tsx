import React from 'react'
import styled from 'styled-components'

export enum ProgressLineState {
  Active,
  Inactive,
  PartiallyActive
}

interface ProgressLineProps {
  state: ProgressLineState
}

const ActiveLine = styled.div`
  width: 100%;
  height: 2px;
  background: #ae32aa 0% 0% no-repeat padding-box;
  position: relative;
  bottom: 1px;
`

const InactiveLine = styled.div`
  width: 100%;
  height: 2px;
  background: #0d1417 0% 0% no-repeat padding-box;
  position: relative;
  bottom: 1px;
`

const PartialFlex = styled.div`
  display: flex;
  width: 100%;
`

const ProgressLine: React.FC<ProgressLineProps> = ({ state }) => {
  switch (state) {
    case ProgressLineState.Active:
      return <ActiveLine/>
    case ProgressLineState.Inactive:
      return <InactiveLine/>
    case ProgressLineState.PartiallyActive:
      return <PartialFlex><ActiveLine style={{width: '50%'}}/><InactiveLine style={{width: '50%'}}/></PartialFlex>
    default:
    return <InactiveLine/>
  }
}

export default ProgressLine
