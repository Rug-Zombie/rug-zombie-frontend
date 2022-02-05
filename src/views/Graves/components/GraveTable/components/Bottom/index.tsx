import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { BigNumber } from 'bignumber.js'
import numeral from 'numeral'
import ProgressBar from './components/ProgressBar'
import TableDetails from './components/TableDetails'
import { Grave } from '../../../../../../state/types'
import useApprove from '../../../../../../hooks/useApprove'
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
import { getBalanceNumber, getDecimalAmount, getFullDisplayBalance } from '../../../../../../utils/formatBalance'
import { zombieBalance } from '../../../../../../redux/get'

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
    width: 100%;
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

const InputControl = styled.p`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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
  margin: 0 3px;
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
  margin: 0 3px;

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
  margin: 0 3px;

  &:hover {
    cursor: pointer;
  }
`

const PrimaryStakeButtonText = styled.p`
  text-align: center;
  font: normal normal normal 16px/25px Poppins;
  color: #010202;
`

const SecondaryStakeButtonText = styled.p`
  text-align: center;
  font: normal normal normal 16px/25px Poppins;
  color: #FFFFFF;
`

const BalanceText = styled.button`
  font: normal normal normal 14px/21px Poppins;
  color: #6B7682;
  background: none;
  border: none;
  width: 150px;
  &:hover {
    cursor: pointer;
  }
`

interface BottomProps {
  grave: Grave;
}

const Bottom: React.FC<BottomProps> = ({ grave }) => {
  const {
    pid,
    rug,
    userInfo: {
      rugDeposited,
      rugAllowance,
      rugBalance,
      paidUnlockFee,
      amount,
      zombieAllowance,
      nftMintDate,
      tokenWithdrawalDate,
    },
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
  const [confirmingStake, setConfirmingStake] = useState(false)
  const [confirmingUnstake, setConfirmingUnstake] = useState(false)
  const stakingSteps = useMemo(() => [], [])
  const unstakingSteps = useMemo(() => [], [])
  const now = Math.floor(Date.now() / 1000)

  enum StakingStep {
    ApproveRug,
    DepositRug,
    UnlockGrave,
    ApproveZombie,
    StakeZombie,
    Staked,
  }

  stakingSteps[StakingStep.ApproveRug] = {
    label: `Approve ${rug.symbol}`,
    sent: `Approving...`,
    func: approveRug,
  }
  stakingSteps[StakingStep.DepositRug] = {
    label: `Deposit ${rug.symbol}`,
    sent: `Depositing...`,
    func: onDepositRug,
  }
  stakingSteps[StakingStep.UnlockGrave] = {
    label: `Unlock`,
    sent: `Unlocking...`,
    func: onUnlock,
  }
  stakingSteps[StakingStep.ApproveZombie] = {
    label: `Approve ZMBE`,
    sent: `Approving...`,
    func: approveZombie,
  }
  stakingSteps[StakingStep.StakeZombie] = {
    label: `Stake ZMBE`,
    sent: `Staking...`,
    func: onStake,
  }
  stakingSteps[StakingStep.Staked] = {
    label: `Stake ZMBE`,
    sent: `Staking...`,
    func: onStake,
  }

  let currentStep = StakingStep.ApproveRug
  if (rugAllowance.gt(0)) {
    currentStep = StakingStep.DepositRug
  }
  if (rugDeposited.gt(0)) {
    currentStep = StakingStep.UnlockGrave
  }
  if (paidUnlockFee) {
    currentStep = StakingStep.ApproveZombie
  }
  if (zombieAllowance.gt(0) && paidUnlockFee) {
    currentStep = StakingStep.StakeZombie
  }
  if (amount.gt(0)) {
    currentStep = StakingStep.Staked
  }
  if(zombieAllowance.isZero()) {
    currentStep = StakingStep.ApproveZombie
  }

  const handleTx = useCallback(async () => {
    setConfirmingStake(true)
    stakingSteps[currentStep].func()
      .then(() => {
        setConfirmingStake(false)
      })
      .catch(() => {
        setConfirmingStake(false)
      })
  }, [currentStep, stakingSteps])

  enum UnstakingStep {
    MintNft,
    Harvest,
    Unstake,
    UnstakeEarly,
    StakeZombie,
    Staked,
  }

  unstakingSteps[UnstakingStep.MintNft] = {
    label: `Mint NFT`,
    sent: `Minting...`,
    func: onHarvest,
  }
  unstakingSteps[UnstakingStep.Harvest] = {
    label: `Harvest`,
    sent: `Harvesting...`,
    func: onHarvest,
  }
  unstakingSteps[UnstakingStep.Unstake] = {
    label: `Unstake`,
    sent: `Unstaking...`,
    func: onUnstake,
  }
  unstakingSteps[UnstakingStep.UnstakeEarly] = {
    label: `Unstake Early`,
    sent: `Unstaking...`,
    func: onUnstakeEarly,
  }

  let currentUnstakingStep = UnstakingStep.Unstake
  if (amount.gt(0)) {
    if (nftMintDate.lte(now)) {
      currentUnstakingStep = UnstakingStep.MintNft
    } else if (unstakeAmount.isZero() || unstakeAmount.isNaN()) {
      currentUnstakingStep = UnstakingStep.Harvest
    } else if (tokenWithdrawalDate.gt(now)) {
      currentUnstakingStep = UnstakingStep.UnstakeEarly
    }
  }

  const handleUnstakeTx = useCallback(async () => {
    setConfirmingUnstake(true)
    unstakingSteps[currentUnstakingStep].func()
      .then(() => {
        setConfirmingUnstake(false)
      })
      .catch(() => {
        setConfirmingUnstake(false)
      })
  }, [currentUnstakingStep, unstakingSteps])



  const decimals = currentStep === StakingStep.ApproveRug || currentStep === StakingStep.DepositRug ? rug.decimals : tokens.zmbe.decimals
  const changeStakeInput = (e) => {
    setStakeAmount(getDecimalAmount(new BigNumber(e.target.value), decimals))
  }

  const changeUnstakeInput = (e) => {
    setUnstakeAmount(getDecimalAmount(new BigNumber(e.target.value), tokens.zmbe.decimals))
  }

  const maxStakeAmount = () => {
    const maxAmount = currentStep === StakingStep.ApproveRug || currentStep === StakingStep.DepositRug ? rugBalance : zombieBalance()
    setStakeAmount(maxAmount)
  }

  const maxUnstakeAmount = () => {
    setUnstakeAmount(amount)
  }

  return <>
    <Separator />
    <StakingContainer>
      <Inputs>
        <InputControl>
          {currentStep === StakingStep.ApproveRug || currentStep === StakingStep.DepositRug
          ? <BalanceText onClick={maxStakeAmount}>
              Wallet Balance: <p>{numeral(getFullDisplayBalance(rugBalance, rug.decimals)).format('(0.00 a)')} {rug.symbol}</p>
            </BalanceText>
          : <BalanceText onClick={maxStakeAmount}>
              Wallet Balance: {numeral(getFullDisplayBalance(zombieBalance())).format('(0.00 a)')} ZMBE
            </BalanceText>
          }
          <StakingInput
            onInput={changeStakeInput}
            value={getBalanceNumber(stakeAmount, decimals)}
            placeholder='Stake amount' type='number'
          />
        </InputControl>
        <InputControl>
          <BalanceText onClick={maxUnstakeAmount}>
            Your Staked: {numeral(getFullDisplayBalance(amount)).format('(0.00 a)')} ZMBE
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
          <PrimaryStakeButtonText>{confirmingStake ? stakingSteps[currentStep].sent : stakingSteps[currentStep].label}</PrimaryStakeButtonText>
        </PrimaryStakeButton>
        <SecondaryStakeButton onClick={handleUnstakeTx}>
          <SecondaryStakeButtonText>{confirmingUnstake ? unstakingSteps[currentUnstakingStep].sent : unstakingSteps[currentUnstakingStep].label}</SecondaryStakeButtonText>
        </SecondaryStakeButton>
      </Buttons>
    </StakingContainer>
    <ProgressBar grave={grave} />
    <Separator />
    <TableDetails grave={grave} />
  </>
}

export default Bottom