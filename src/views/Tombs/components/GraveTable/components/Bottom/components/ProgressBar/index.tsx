import React from 'react'
import styled from 'styled-components'
import ProgressCircle from './components/ProgressCircle'
import ProgressLine from './components/ProgressLine'
import ProgressText from './components/ProgressText'
import { Tomb } from '../../../../../../../../state/types'

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
  tomb: Tomb;
}

enum Step {
  PairLp,
  ApproveLp,
  StakeZombie,
  Staked
}

const ProgressBar: React.FC<StakingProgressBarProps> = ({ tomb }) => {
  const { userInfo: { lpBalance, lpAllowance, amount } } = tomb
  const steps = ['Pair LP', 'Approve LP', 'Stake LP']

  let currentStep = Step.PairLp
  if(lpBalance.gt(0)) {
    currentStep = Step.ApproveLp
  }
  if(lpAllowance.gt(0)) {
    currentStep = Step.StakeZombie
  }
  if(amount.gt(0)) {
    currentStep = Step.Staked
  }

  return <ProgressFlex>
    <IconFlex>
      {steps.map((step, index) => {
        return <>
          <ProgressCircle active={index < currentStep} step={index + 1} />
          { index !== steps.length - 1 ? <ProgressLine active={index + 1 < currentStep} /> : null }
        </>
      })}
    </IconFlex>
    <TextFlex>
      {steps.map((step, index) => {
        return <ProgressText active={index <= currentStep}>{step}</ProgressText>
      })}
    </TextFlex>
  </ProgressFlex>

}

export default ProgressBar