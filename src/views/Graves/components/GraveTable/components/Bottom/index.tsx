import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { BigNumber } from 'bignumber.js'
import ProgressBar from './components/ProgressBar'
import TableDetails from './components/TableDetails'
import { Grave } from '../../../../../../state/types'
import { useApprove } from '../../../../../../hooks/useApprove'
import { getAddress, getDrFrankensteinAddress } from '../../../../../../utils/addressHelpers'
import { useDrFrankenstein, useERC20, useZombie } from '../../../../../../hooks/useContract'
import {
  useDepositRug,
  useHarvest,
  useStake,
  useUnlock,
  useUnstake,
  useUnstakeEarly,
} from '../../../../../../hooks/useGrave'
import { getId } from '../../../../../../utils'
import { BIG_ZERO } from '../../../../../../utils/bigNumber'
import tokens from '../../../../../../config/constants/tokens'
import { getDecimalAmount } from '../../../../../../utils/formatBalance'

const Separator = styled.div`
  height: 0px;
  border: 1px dashed #6B7682;
  margin: 25px 0 0 0;
`

const StakingContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: stretch;
  flex-wrap: wrap;
`

const Inputs = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-evenly;
  margin: 25px 0 0 0;
`

const Buttons = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-evenly;
  margin: 25px 0 0 0;
`

const StakingInput = styled.input`
  width: 160px;
  height: 60px;
  background: #0D1417 0% 0% no-repeat padding-box;
  border-radius: 10px;
  padding-left: 20px;
  border: none;
  text-align: left;
  font: normal normal normal 14px/30px Poppins;
  color: #FFFFFF;
  margin: 0 5px;
`

const PrimaryStakeButton = styled.button`
  height: 60px;
  width: 160px;
  background: #B8C00D 0% 0% no-repeat padding-box;
  border-radius: 10px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;

  &:hover {
    cursor: pointer;
  }
;
`

const SecondaryStakeButton = styled.button`
  height: 60px;
  width: 160px;
  border: 2px solid #B8C00D;
  border-radius: 10px;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;

  &:hover {
    cursor: pointer;
  }
;
`

const PrimaryStakeButtonText = styled.text`
  text-align: center;
  font: normal normal normal 16px/25px Poppins;
  color: #010202;
`

const SecondaryStakeButtonText = styled.text`
  text-align: center;
  font: normal normal normal 16px/25px Poppins;
  color: #FFFFFF;
`

interface BottomProps {
  grave: Grave;
}

const Bottom: React.FC<BottomProps> = ({ grave }) => {
  const {
    pid,
    rug,
    userInfo: { rugDeposited, rugAllowance, paidUnlockFee, amount, zombieAllowance, nftMintDate, tokenWithdrawalDate },
    poolInfo: { unlockFee },
  } = grave
  const [stakeAmount, setStakeAmount] = useState(BIG_ZERO)
  const [unstakeAmount, setUnstakeAmount] = useState(BIG_ZERO)
  const rugContract = useERC20(getAddress(rug.address))
  const drFrankenstein = useDrFrankenstein()
  const approveRug = useApprove(rugContract, getDrFrankensteinAddress()).onApprove
  const approveZombie = useApprove(useZombie(), getDrFrankensteinAddress()).onApprove
  const { onStake } = useStake(drFrankenstein, getId(pid), stakeAmount)
  const { onUnlock } = useUnlock(drFrankenstein, getId(pid), unlockFee)
  const { onDepositRug } = useDepositRug(drFrankenstein, getId(pid), stakeAmount)
  const { onUnstake } = useUnstake(drFrankenstein, getId(pid), unstakeAmount)
  const { onUnstakeEarly } = useUnstakeEarly(drFrankenstein, getId(pid), unstakeAmount)
  const { onHarvest } = useHarvest(drFrankenstein, getId(pid))
  const [confirming, setConfirming] = useState(false)
  const steps = useMemo(() => [], [])
  const now = Math.floor(Date.now() / 1000)
  enum Step {
    ApproveRug,
    DepositRug,
    UnlockGrave,
    ApproveZombie,
    StakeZombie,
    Staked,
  }

  steps[Step.ApproveRug] = {
    label: `Approve ${rug.symbol}`,
    sent: `Approving...`,
    func: approveRug,
  }
  steps[Step.DepositRug] = {
    label: `Deposit ${rug.symbol}`,
    sent: `Depositing...`,
    func: onDepositRug,
  }
  steps[Step.UnlockGrave] = {
    label: `Unlock`,
    sent: `Unlocking...`,
    func: onUnlock,
  }
  steps[Step.ApproveZombie] = {
    label: `Approve ZMBE`,
    sent: `Approving...`,
    func: approveZombie,
  }
  steps[Step.StakeZombie] = {
    label: `Stake ZMBE`,
    sent: `Staking...`,
    func: onStake,
  }
  steps[Step.Staked] = {
    label: `Stake ZMBE`,
    sent: `Staking...`,
    func: onStake,
  }

  let currentStep = Step.ApproveRug
  if (rugAllowance.gt(0)) {
    currentStep = Step.DepositRug
  }
  if (rugDeposited.gt(0)) {
    currentStep = Step.UnlockGrave
  }
  if (paidUnlockFee) {
    currentStep = Step.ApproveZombie
  }
  if (zombieAllowance.gt(0) && paidUnlockFee) {
    currentStep = Step.StakeZombie
  }
  if (amount.gt(0)) {
    currentStep = Step.Staked
  }

  const handleTx = useCallback(async () => {
    setConfirming(true)
    steps[currentStep].func()
      .then(() => {
        setConfirming(false)
      })
      .catch(() => {
        setConfirming(false)
      })
  }, [currentStep, steps])

  const changeStakeInput = (e) => {
    const decimals = currentStep === Step.DepositRug ? rug.decimals : tokens.zmbe.decimals
    setStakeAmount(getDecimalAmount(new BigNumber(e.target.value), decimals))
  }

  const changeUnstakeInput = (e) => {
    setUnstakeAmount(getDecimalAmount(new BigNumber(e.target.value), tokens.zmbe.decimals))
  }

  const withdrawButton = () => {
    if(amount.gt(0)) {
      if (nftMintDate.lte(now)) {
        return <SecondaryStakeButton onClick={onHarvest}>
          <SecondaryStakeButtonText>Mint NFT</SecondaryStakeButtonText>
        </SecondaryStakeButton>
      }
      if(unstakeAmount.isZero() || unstakeAmount.isNaN()) {
        return <SecondaryStakeButton onClick={onHarvest}>
          <SecondaryStakeButtonText>Harvest</SecondaryStakeButtonText>
        </SecondaryStakeButton>
      }
      if (tokenWithdrawalDate.gt(now)) {
        return <SecondaryStakeButton onClick={onUnstakeEarly}>
          <SecondaryStakeButtonText>Unstake Early</SecondaryStakeButtonText>
        </SecondaryStakeButton>
      }
    }

    return <SecondaryStakeButton onClick={onUnstake}>
      <SecondaryStakeButtonText>Unstake</SecondaryStakeButtonText>
    </SecondaryStakeButton>
  }

  return <>
    <Separator />
    <StakingContainer>
      <Inputs>
        <StakingInput onInput={changeStakeInput} placeholder='Stake amount' type='number' />
        <StakingInput onInput={changeUnstakeInput} placeholder='Unstake amount' type='number' />
      </Inputs>
      <Buttons>
        <PrimaryStakeButton onClick={handleTx}>
          <PrimaryStakeButtonText>{confirming ? steps[currentStep].sent : steps[currentStep].label}</PrimaryStakeButtonText>
        </PrimaryStakeButton>
        {withdrawButton()}
      </Buttons>
    </StakingContainer>
    <ProgressBar grave={grave} />
    <Separator />
    <TableDetails grave={grave} />
  </>
}

export default Bottom