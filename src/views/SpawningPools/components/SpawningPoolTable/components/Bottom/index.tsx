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
import useToast from '../../../../../../hooks/useToast'

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
  margin: 54px 0 0 0;
  @media (max-width: 723px) {
    margin: 10px 0 0 0;
  }
`

const InputControl = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 104px;
`

const StakingInput = styled.input`
  width: 150px;
  height: 60px;
  background: #0D1417 0% 0% no-repeat padding-box;
  border-radius: 10px;
  padding-left: 20px;
  border: none;
  text-align: left;
  font: normal normal normal 14px/30px Poppins;
  color: #FFFFFF;
  margin: 0 2px;
`

const PrimaryStakeButton = styled.button`
  height: 60px;
  width: 150px;
  background: #B8C00D 0% 0% no-repeat padding-box;
  border-radius: 10px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 2px;

  &:hover {
    cursor: pointer;
  }
`

const SecondaryStakeButton = styled.button`
  height: 60px;
  width: 150px;
  border: 2px solid #B8C00D;
  border-radius: 10px;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 2px;

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

const AmountText = styled.p`
  font: normal normal normal 14px/21px Poppins;
  margin: 0;
`

interface BottomProps {
  spawningPool: SpawningPool;
}

const Bottom: React.FC<BottomProps> = ({ spawningPool }) => {
  const {
    id,
    address,
    userInfo: { zombieBalance, paidUnlockFee, amount, zombieAllowance, nftMintDate, tokenWithdrawalDate },
    poolInfo: { unlockFee },
  } = spawningPool
  const [stakeAmount, setStakeAmount] = useState(new BigNumber(null))
  const [unstakeAmount, setUnstakeAmount] = useState(new BigNumber(null))
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
  const {toastDefault} = useToast()
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
    toast: {title: 'Spawning Pool Unlocked'}
  }
  steps[Step.ApproveZombie] = {
    label: `Approve ZMBE`,
    sent: `Approving...`,
    func: approveZombie,
    toast: {title: 'Approved ZMBE'}
  }
  steps[Step.StakeZombie] = {
    label: `Stake ZMBE`,
    sent: `Staking...`,
    func: onStake,
    toast: {title: 'Staked ZMBE'}
  }
  steps[Step.Staked] = {
    label: `Stake ZMBE`,
    sent: `Staking...`,
    func: onStake,
    toast: {title: 'Staked ZMBE'}
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
    const step = steps[currentStep]
    step.func()
      .then((succeeded) => {
        if(succeeded) {
          toastDefault(step.toast.title, step.toast.description)
        }
        setConfirming(false)
      })
      .catch(() => {
        setConfirming(false)
      })
  }, [currentStep, steps, toastDefault])

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
    <StakingContainer>
      <Inputs>
        <InputControl>
          <BalanceText onClick={maxStakeAmount}>
            Wallet Balance: <AmountText>{numeral(getFullDisplayBalance(zombieBalance)).format('(0.00 a)')} ZMBE</AmountText>
          </BalanceText>
          <StakingInput
            onInput={changeStakeInput}
            value={getBalanceNumber(stakeAmount)}
            placeholder='Stake amount'
            type='number'
          />
        </InputControl>
        <InputControl>
          <BalanceText onClick={maxUnstakeAmount}>
            Your Staked: <AmountText>{numeral(getFullDisplayBalance(amount)).format('(0.00 a)')} ZMBE</AmountText>
          </BalanceText>
          <StakingInput
            onInput={changeUnstakeInput}
            value={getBalanceNumber(unstakeAmount)}
            placeholder='Unstake amount'
            type='number'
          />
        </InputControl>
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