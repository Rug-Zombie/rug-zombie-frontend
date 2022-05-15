import React from 'react'
import styled from 'styled-components'
import ProgressCircle from './components/ProgressCircle'
import ProgressLine from './components/ProgressLine'
import ProgressText from './components/ProgressText'
import BracketCircle from "./components/BracketCircle";
import BracketLine from "./components/BracketLine";
import BracketText from "./components/BracketText";
import { Tomb } from '../../../../../../../../state/types'
import {formatNumber} from "../../../../../../../../utils/formatBalance";


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
  width: 91%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const IconFlexBracket = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-evenly;
  padding-top: 20px;
  align-items: center;
`

const BracketFlex = styled.div`
  width: 86%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`


interface StakingProgressBarProps {
  tomb: Tomb
}

enum Step {
  PairLp,
  ApproveLp,
  StakeZombie,
  Staked,
}

enum Bracket {
  O,
  A,
  B,
  C,
}

const ProgressBar: React.FC<StakingProgressBarProps> = ({ tomb }) => {
  const {
    userInfo: { lpBalance, lpAllowance, amount },
  } = tomb
  const steps = ['Pair LP', 'Approve LP', 'Stake LP']

  const bracketA = (tomb.poolInfo.tokenAmount.times(0.05e-18).toNumber())
  const bracketB = (tomb.poolInfo.tokenAmount.times(0.1e-18).toNumber())

  const brackets = [['Less than ', bracketA, ' LP'], [bracketA,' LP to ',bracketB, ' LP'], ['More than ', bracketB, ' LP']]


  let currentStep = Step.PairLp
  if (lpBalance.gt(0)) {
    currentStep = Step.ApproveLp
  }
  if (lpAllowance.gt(0)) {
    currentStep = Step.StakeZombie
  }
  if (amount.gt(0)) {
    currentStep = Step.Staked
  }

  let currentBracket = Bracket.O
  if (tomb.userInfo.amount.eq(0)){
    currentBracket = Bracket.O
  }
  if (tomb.userInfo.amount.dividedBy(tomb.poolInfo.tokenAmount).lt(0.05) && tomb.userInfo.amount.gt(0)){
    currentBracket = Bracket.A
  }
  if (tomb.userInfo.amount.dividedBy(tomb.poolInfo.tokenAmount).gte(0.05) && tomb.userInfo.amount.dividedBy(tomb.poolInfo.tokenAmount).lte(0.1)){
    currentBracket = Bracket.B
  }
  if (tomb.userInfo.amount.dividedBy(tomb.poolInfo.tokenAmount).gt(0.1)){
    currentBracket = Bracket.C
  }

  return (
    <ProgressFlex>
      <IconFlex>
        {steps.map((step, index) => {
          return (
            <>
              <ProgressCircle active={index < currentStep} step={index + 1} />
              {index !== steps.length - 1 ? <ProgressLine active={index + 1 < currentStep} /> : null}
            </>
          )
        })}
      </IconFlex>
      <TextFlex>
        {steps.map((step, index) => {
          return <ProgressText active={index <= currentStep}>{step}</ProgressText>
        })}
      </TextFlex>

      <IconFlexBracket>
        {brackets.map((step, index) => {
          return (
              <>
                <BracketCircle active={index < currentBracket} step={index} />
                {index !== brackets.length - 1 ? <BracketLine active={index + 1 < currentBracket} /> : null}
              </>
          )
        })}
      </IconFlexBracket>
      <BracketFlex>
        {brackets.map((step, index) => {
          return <BracketText active={index < currentBracket}>{step}</BracketText>
        })}
      </BracketFlex>
      <br/><br/>
      <BracketText active>The users owned percentage of Tombs total LP determines which bracket they will be in.</BracketText>
    </ProgressFlex>
  )
}

export default ProgressBar
