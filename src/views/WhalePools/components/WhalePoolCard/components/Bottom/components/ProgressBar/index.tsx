import React from 'react'
import styled from 'styled-components'
import ProgressCircle from './components/ProgressCircle'
import ProgressLine from './components/ProgressLine'
import ProgressText from './components/ProgressText'
import { getId } from '../../../../../../../../utils'

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
  isApproved: boolean
  isDeposited: boolean
  mintRequested: boolean
  mintFinished: boolean
}

enum Step {
  ApproveWhaleNft,
  DepositWhaleNft,
  RequestMint,
  MintFinished,
}

const WhalePoolProgressBar: React.FC<StakingProgressBarProps> = ({ isApproved, isDeposited, mintRequested, mintFinished }) => {

  const steps = ['Approve Whale NFT', 'Deposit Whale NFT', 'Request Mint', 'Claim NFT']

  let currentStep = Step.ApproveWhaleNft
  if (isApproved) {
    currentStep = Step.ApproveWhaleNft
  }
  if (isApproved && isDeposited) {
    currentStep = Step.DepositWhaleNft
  }
  if (isApproved && isDeposited && mintRequested) {
    currentStep = Step.RequestMint
  }
  if (isApproved && isDeposited && mintRequested && mintFinished) {
    currentStep = Step.MintFinished
  }

  return (
    <ProgressFlex>
      <IconFlex>
        {steps.map((step, index) => {
          return (
            <>
              <ProgressCircle active={index < currentStep} step={index + 1} />
              {index !== steps.length - 1 ? <ProgressLine active={index < currentStep} /> : null}
            </>
          )
        })}
      </IconFlex>
      <TextFlex>
        {steps.map((step, index) => {
          return <ProgressText active={index <= currentStep}>{step}</ProgressText>
        })}
      </TextFlex>
    </ProgressFlex>
  )
}

export default WhalePoolProgressBar
