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

enum Step {
  ApproveRug,
  DepositRug,
  UnlockGrave,
  ApproveZombie,
  StakeZombie,
  Staked
}

const ProgressBar: React.FC<StakingProgressBarProps> = ({ grave }) => {
  const { userInfo: { rugDeposited, rugAllowance, zombieAllowance, paidUnlockFee, amount } } = grave
  const steps = ['Approve rug', 'Deposit rug', 'Unlock grave', 'Approve ZMBE', 'Stake ZMBE']

  let currentStep = Step.ApproveRug
  if(rugAllowance.gt(0)) {
    currentStep = Step.DepositRug
  }
  if(rugDeposited.gt(0)) {
    currentStep = Step.UnlockGrave
  }
  if(paidUnlockFee) {
    currentStep = Step.ApproveZombie
  }
  if(zombieAllowance.gt(0) && paidUnlockFee) {
    steps.splice(Step.ApproveZombie, 1)
    // currentStep -= 1
  }
  if(amount.gt(0)) {
    currentStep = Step.Staked
  }
  if(zombieAllowance.isZero()) {
    currentStep = Step.ApproveZombie
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