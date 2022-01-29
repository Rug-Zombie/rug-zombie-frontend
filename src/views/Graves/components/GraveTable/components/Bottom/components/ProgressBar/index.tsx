import React from 'react'
import styled from 'styled-components'
import ProgressCircle from './components/ProgressCircle'
import ProgressLine from './components/ProgressLine'
import ProgressText from './components/ProgressText'
import { Grave } from '../../../../../../../../state/types'

const ProgressFlex = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`

const IconFlex = styled.div`
  width: 89%;
  display: flex;
  justify-content: space-evenly;
  padding-top: 20px;
  align-items: center;
`

const TextFlex = styled.div`
  width: 96%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

interface StakingProgressBarProps {
  grave: Grave;
}

const ProgressBar: React.FC<StakingProgressBarProps> = ({ grave }) => {
  const steps = ['Approve rug', 'Deposit rug', 'Unlock grave', 'Approve ZMBE', 'Stake ZMBE']
  return <ProgressFlex>
    <IconFlex>
      {steps.map((step, index) => {
        return <>
          <ProgressCircle active={index <= 2} step={index + 1} />
          { index !== steps.length - 1 ? <ProgressLine active={index < 2} /> : null }
        </>
      })}
    </IconFlex>
    <TextFlex>
      {steps.map((step, index) => {
        return <ProgressText active={index <= 2}>{step}</ProgressText>
      })}
    </TextFlex>
  </ProgressFlex>

}

export default ProgressBar