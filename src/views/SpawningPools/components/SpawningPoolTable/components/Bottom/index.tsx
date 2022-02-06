import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { BigNumber } from 'bignumber.js'
import numeral from 'numeral'
import ProgressBar from './components/ProgressBar'
import TableDetails from './components/TableDetails'
import { SpawningPool } from '../../../../../../state/types'
import useApprove from '../../../../../../hooks/useApprove'
import { getAddress } from '../../../../../../utils/addressHelpers'
import { useSpawningPool, useZombie } from '../../../../../../hooks/useContract'
import { useHarvest, useStake, useUnlock, useUnstake, useUnstakeEarly } from '../../../../../../hooks/useSpawningPool'
import { BIG_ZERO } from '../../../../../../utils/bigNumber'
import { getBalanceNumber, getDecimalAmount, getFullDisplayBalance } from '../../../../../../utils/formatBalance'

const Separator = styled.div`
  height: 0px;
  border: 1px dashed #6B7682;
  margin: 25px 0 0 0;
`

const BalanceContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: nowrap;
  margin: 25px 0 0 0;
  white-space: nowrap;
  @media (max-width: 771px) {
    width: 100%;;
  }

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
  margin: 10px 0 0 0;
`

const Buttons = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-evenly;
  margin: 10px 0 0 0;
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

const BalanceText = styled.button`
  font: normal normal normal 14px/21px Poppins;
  color: #6B7682;
  background: none;
  border: none;

  &:hover {
    cursor: pointer;
  }
`

interface BottomProps {
  spawningPool: SpawningPool;
}

const Bottom: React.FC<BottomProps> = ({ spawningPool }) => {
  const {
    id,
    address,
    rewardToken,
    userInfo: { zombieBalance, paidUnlockFee, amount, zombieAllowance, nftMintDate, tokenWithdrawalDate },
    poolInfo: { unlockFee },
  } = spawningPool
  const [stakeAmount, setStakeAmount] = useState(BIG_ZERO)
  const [unstakeAmount, setUnstakeAmount] = useState(BIG_ZERO)
  const spawningPoolContract = useSpawningPool(id)
  const approveZombie = useApprove(useZombie(), getAddress(address)).onApprove
  const { onStake } = useStake(spawningPoolContract, stakeAmount)
  const { onUnlock } = useUnlock(spawningPoolContract, unlockFee)
  const { onUnstake } = useUnstake(spawningPoolContract, unstakeAmount)
  const { onUnstakeEarly } = useUnstakeEarly(spawningPoolContract, unstakeAmount)
  const { onHarvest } = useHarvest(spawningPoolContract)
  const [confirming, setConfirming] = useState(false)
  const steps = useMemo(() => [], [])
  const now = Math.floor(Date.now() / 1000)
  enum Step {
    UnlockSpawningPool,
    ApproveZombie,
    StakeZombie,
    Staked,
  }

  steps[Step.UnlockSpawningPool] = {
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

  let currentStep = Step.UnlockSpawningPool
  if (paidUnlockFee) {
    currentStep = Step.ApproveZombie
  }
  if (zombieAllowance.gt(0)) {
    currentStep = Step.StakeZombie
  }
  if (amount.gt(0)) {
    currentStep = Step.Staked
  }
  if (zombieAllowance.isZero()) {
    currentStep = Step.ApproveZombie
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
    setStakeAmount(getDecimalAmount(new BigNumber(e.target.value)))
  }

  const changeUnstakeInput = (e) => {
    setUnstakeAmount(getDecimalAmount(new BigNumber(e.target.value)))
  }

  const maxStakeAmount = () => {
    setStakeAmount(zombieBalance)
  }

  const maxUnstakeAmount = () => {
    setUnstakeAmount(amount)
  }

  const withdrawButton = () => {
    if (amount.gt(0)) {
      if (nftMintDate.lte(now)) {
        return <SecondaryStakeButton onClick={onHarvest}>
          <SecondaryStakeButtonText>Mint NFT</SecondaryStakeButtonText>
        </SecondaryStakeButton>
      }
      if (unstakeAmount.isZero() || unstakeAmount.isNaN()) {
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
    <BalanceContainer>
      <BalanceText onClick={maxStakeAmount}>Wallet
        Balance: {numeral(getFullDisplayBalance(zombieBalance)).format('(0.00 a)')} ZMBE</BalanceText>
      <BalanceText onClick={maxUnstakeAmount}>Your
        Staked: {numeral(getFullDisplayBalance(amount)).format('(0.00 a)')} ZMBE</BalanceText>
    </BalanceContainer>
    <StakingContainer>
      <Inputs>
        <StakingInput onInput={changeStakeInput} value={getBalanceNumber(stakeAmount)}
                      placeholder='Stake amount' type='number' />
        <StakingInput onInput={changeUnstakeInput} value={getBalanceNumber(unstakeAmount)} placeholder='Unstake amount'
                      type='number' />
      </Inputs>
      <Buttons>
        <PrimaryStakeButton onClick={handleTx}>
          <PrimaryStakeButtonText>{confirming ? steps[currentStep].sent : steps[currentStep].label}</PrimaryStakeButtonText>
        </PrimaryStakeButton>
        {withdrawButton()}
      </Buttons>
    </StakingContainer>
    <ProgressBar spawningPool={spawningPool} />
    <Separator />
    <TableDetails spawningPool={spawningPool} />
  </>
}

export default Bottom