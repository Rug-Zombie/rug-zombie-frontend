import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { BigNumber } from 'bignumber.js'
import numeral from 'numeral'
import ProgressBar from './components/ProgressBar'
import TableDetails from './components/TableDetails'
import { Tomb } from '../../../../../../state/types'
import useApprove, { ApproveTarget } from '../../../../../../hooks/useApprove'
import { getAddress, getDrFrankensteinAddress } from '../../../../../../utils/addressHelpers'
import { useDrFrankenstein, useERC20, useTombOverlay } from '../../../../../../hooks/useContract'
import {
  useEmergencyWithdraw,
  useFinishMinting,
  useHarvest,
  useStake,
  useStartMinting,
  useUnstake,
  useUnstakeEarly,
} from '../../../../../../hooks/useTomb'
import { getId } from '../../../../../../utils'
import { getBalanceNumber, getDecimalAmount, getFullDisplayBalance } from '../../../../../../utils/formatBalance'
import {
  APESWAP_ADD_LIQUIDITY_URL,
  AUTOSHARK_ADD_LIQUIDITY_URL,
  BASE_ADD_LIQUIDITY_URL,
  DEXS,
  NATIVE_DEX,
} from '../../../../../../config'
import tokens from '../../../../../../config/constants/tokens'
import { Dex } from '../../../../../../config/constants/types'
import useToast from '../../../../../../hooks/useToast'
import { formatDuration, now } from '../../../../../../utils/timerHelpers'

const Separator = styled.div`
  height: 0px;
  border: 1px dashed #6b7682;
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
  background: #0d1417 0% 0% no-repeat padding-box;
  border-radius: 10px;
  padding-left: 20px;
  border: none;
  text-align: left;
  font: normal normal normal 14px/30px Poppins;
  color: #ffffff;
  margin: 0 2px;
`

const PrimaryStakeButton = styled.button`
  height: 60px;
  width: 150px;
  background: #b8c00d 0% 0% no-repeat padding-box;
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
  border: 2px solid #b8c00d;
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
  color: #ffffff;
`

const BalanceText = styled.button`
  font: normal normal normal 14px/21px Poppins;
  color: #6b7682;
  background: none;
  border: none;
  width: 150px;

  &:hover {
    cursor: pointer;
  }
`

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const FlexRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`

const AmountText = styled.p`
  font: normal normal normal 14px/21px Poppins;
  margin: 0;
`

interface BottomProps {
  tomb: Tomb
}

const Bottom: React.FC<BottomProps> = ({ tomb }) => {
  const {
    pid,
    lpAddress,
    token1,
    token2,
    dex,
    userInfo: { lpAllowance, lpBalance, nftMintTime, tokenWithdrawalDate, randomNumber, isMinting, amount },
    poolInfo: { mintingFee },
    overlay,
  } = tomb
  const [stakeAmount, setStakeAmount] = useState(new BigNumber(null))
  const [unstakeAmount, setUnstakeAmount] = useState(new BigNumber(null))
  const lpContract = useERC20(getAddress(lpAddress))
  const drFrankenstein = useDrFrankenstein()
  const tombOverlay = useTombOverlay()
  const approveLp = useApprove(lpContract, getDrFrankensteinAddress(), ApproveTarget.Tombs).onApprove
  const { onStake } = useStake(drFrankenstein, getId(pid), stakeAmount)
  const { onUnstake } = useUnstake(drFrankenstein, getId(pid), unstakeAmount)
  const { onUnstakeEarly } = useUnstakeEarly(drFrankenstein, getId(pid), unstakeAmount)
  const { onEmergencyWithdraw } = useEmergencyWithdraw(drFrankenstein, getId(pid))
  const { onHarvest } = useHarvest(drFrankenstein, getId(pid))
  const { onStartMinting } = useStartMinting(tombOverlay, getId(overlay.pid), mintingFee)
  const { onFinishMinting } = useFinishMinting(tombOverlay, getId(overlay.pid))
  const [confirming, setConfirming] = useState(false)
  const [confirmingUnstake, setConfirmingUnstake] = useState(false)
  const steps = useMemo(() => [], [])
  const unstakingSteps = useMemo(() => [], [])
  const mintingReady = randomNumber.gt(0)
  const { toastTombs } = useToast()

  enum Step {
    PairLp,
    ApproveLp,
    StakeLp,
    Staked,
  }

  const lpName = `${token2.symbol}-${token1.symbol}`

  let addLiquidityUrl: string
  const sortedTokens = token1 === tokens.wbnb ? [token1, token2] : [token2, token1]
  const quoteTokenUrl = dex === Dex.APESWAP ? 'ETH' : 'BNB'

  if (dex === Dex.APESWAP) {
    addLiquidityUrl = `${APESWAP_ADD_LIQUIDITY_URL}/${quoteTokenUrl}/${getAddress(sortedTokens[1].address)}`
  } else if (dex === Dex.AUTOSHARK) {
    addLiquidityUrl = `${AUTOSHARK_ADD_LIQUIDITY_URL}/${quoteTokenUrl}/${getAddress(sortedTokens[1].address)}`
  } else {
    addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${quoteTokenUrl}/${getAddress(sortedTokens[1].address)}`
  }

  steps[Step.PairLp] = {
    label: `Pair on ${DEXS[dex]}`,
    sent: `Redirecting...`,
    func: () => {
      window.location.href = addLiquidityUrl
    },
  }
  steps[Step.ApproveLp] = {
    label: `Approve ${lpName} LP`,
    sent: `Approving...`,
    func: approveLp,
    toast: { title: `Approved ${lpName} LP` },
  }
  steps[Step.StakeLp] = {
    label: `Stake LP`,
    sent: `Staking...`,
    func: onStake,
    toast: { title: `Staked ${lpName} LP` },
  }
  steps[Step.Staked] = {
    label: `Stake LP`,
    sent: `Staking...`,
    func: onStake,
    toast: { title: `Staked ${lpName} LP` },
  }
  let currentStep = Step.PairLp

  if (lpBalance.gt(0)) {
    currentStep = Step.ApproveLp
  }
  if (lpAllowance.gt(0)) {
    currentStep = Step.StakeLp
  }
  if (amount.gt(0)) {
    currentStep = Step.Staked
  }
  if (lpAllowance.isZero() && amount.gt(0)) {
    currentStep = Step.ApproveLp
  }

  const handleTx = useCallback(async () => {
    setConfirming(true)
    const step = steps[currentStep]
    step
      .func()
      .then((succeeded) => {
        if (succeeded) {
          toastTombs(step.toast.title, step.toast.description)
        }
        setConfirming(false)
      })
      .catch(() => {
        setConfirming(false)
      })
  }, [currentStep, steps, toastTombs])

  enum UnstakingStep {
    StartMinting,
    MintingInProgress,
    FinishMinting,
    Harvest,
    Unstake,
    UnstakeEarly,
    EmergencyWithdraw,
  }

  unstakingSteps[UnstakingStep.StartMinting] = {
    label: `Start Minting`,
    sent: `Confirming...`,
    func: onStartMinting,
    toast: { title: 'Started Minting', description: 'Please wait as Chainlink VRF generates your random number' },
  }
  unstakingSteps[UnstakingStep.MintingInProgress] = {
    label: `Minting in progress`,
    sent: `Confirming...`,
    func: null,
    toast: { title: 'Minting Finished' },
  }
  unstakingSteps[UnstakingStep.FinishMinting] = {
    label: `Finish Minting`,
    sent: `Minting...`,
    func: onFinishMinting,
    toast: { title: 'NFT Minted' },
  }
  unstakingSteps[UnstakingStep.Unstake] = {
    label: `Unstake`,
    sent: `Unstaking...`,
    func: onUnstake,
    toast: { title: `Unstaked ${lpName} LP` },
  }
  unstakingSteps[UnstakingStep.UnstakeEarly] = {
    label: `Unstake Early`,
    sent: `Unstaking...`,
    func: onUnstakeEarly,
    toast: { title: `Unstaked ${lpName} LP` },
  }
  unstakingSteps[UnstakingStep.EmergencyWithdraw] = {
    label: `Unstake Early`,
    sent: `Unstaking...`,
    func: onEmergencyWithdraw,
    toast: { title: `Unstaked ${lpName} LP` },
  }
  unstakingSteps[UnstakingStep.Harvest] = {
    label: `Harvest`,
    sent: `Harvesting...`,
    func: onHarvest,
    toast: { title: `Harvested ZMBE` },
  }

  let currentUnstakingStep
  if (isMinting && !mintingReady) {
    currentUnstakingStep = UnstakingStep.MintingInProgress
  } else if (isMinting && mintingReady) {
    currentUnstakingStep = UnstakingStep.FinishMinting
  } else if (amount.gt(0) && nftMintTime.isZero()) {
    currentUnstakingStep = UnstakingStep.StartMinting
  } else if ((unstakeAmount.isZero() || unstakeAmount.isNaN()) && amount.gt(0)) {
    currentUnstakingStep = UnstakingStep.Harvest
  } else if (tokenWithdrawalDate.gt(now()) && amount.gt(0)) {
    if (dex === NATIVE_DEX) {
      currentUnstakingStep = UnstakingStep.UnstakeEarly
    } else {
      currentUnstakingStep = UnstakingStep.EmergencyWithdraw
    }
  } else {
    currentUnstakingStep = UnstakingStep.Unstake
  }

  const handleUnstakingTx = useCallback(async () => {
    setConfirmingUnstake(true)
    const step = unstakingSteps[currentUnstakingStep]
    if (currentUnstakingStep === UnstakingStep.EmergencyWithdraw && !unstakeAmount.eq(amount)) {
      toastTombs(
        'Notice',
        <FlexColumn>
          <text>
            Partial early withdrawals are disabled on this tomb. Either wait{' '}
            {formatDuration(tokenWithdrawalDate.minus(now()).toNumber())} or withdraw all.
          </text>
          <FlexRow>
            <SecondaryStakeButton onClick={onEmergencyWithdraw}>
              <SecondaryStakeButtonText>Withdraw All</SecondaryStakeButtonText>
            </SecondaryStakeButton>
          </FlexRow>
        </FlexColumn>,
      )
      return
    }
    step
      .func()
      .then((succeeded) => {
        if (succeeded) {
          toastTombs(step.toast.title, step.toast.description)
        }
        setConfirmingUnstake(false)
      })
      .catch(() => {
        setConfirmingUnstake(false)
      })
  }, [
    UnstakingStep.EmergencyWithdraw,
    amount,
    currentUnstakingStep,
    onEmergencyWithdraw,
    toastTombs,
    tokenWithdrawalDate,
    unstakeAmount,
    unstakingSteps,
  ])

  const changeStakeInput = (e) => {
    setStakeAmount(getDecimalAmount(new BigNumber(e.target.value)))
  }

  const changeUnstakeInput = (e) => {
    setUnstakeAmount(getDecimalAmount(new BigNumber(e.target.value)))
  }

  const maxStakeAmount = () => {
    setStakeAmount(lpBalance)
  }

  const maxUnstakeAmount = () => {
    setUnstakeAmount(amount)
  }

  return (
    <>
      <Separator />
      <StakingContainer>
        <Inputs>
          <InputControl>
            <BalanceText onClick={maxStakeAmount}>
              Wallet Balance: <AmountText>{numeral(getFullDisplayBalance(lpBalance)).format('(0.00 a)')} LP</AmountText>
            </BalanceText>
            <StakingInput
              onInput={changeStakeInput}
              value={getBalanceNumber(stakeAmount)}
              placeholder="Stake amount"
              type="number"
            />
          </InputControl>
          <InputControl>
            <BalanceText onClick={maxUnstakeAmount}>
              Your Staked: <AmountText>{numeral(getFullDisplayBalance(amount)).format('(0.00 a)')} LP</AmountText>
            </BalanceText>
            <StakingInput
              onInput={changeUnstakeInput}
              value={getBalanceNumber(unstakeAmount)}
              placeholder="Unstake amount"
              type="number"
            />
          </InputControl>
        </Inputs>
        <Buttons>
          <PrimaryStakeButton onClick={handleTx}>
            <PrimaryStakeButtonText>
              {confirming ? steps[currentStep].sent : steps[currentStep].label}
            </PrimaryStakeButtonText>
          </PrimaryStakeButton>
          <SecondaryStakeButton onClick={handleUnstakingTx}>
            <SecondaryStakeButtonText>
              {confirmingUnstake
                ? unstakingSteps[currentUnstakingStep].sent
                : unstakingSteps[currentUnstakingStep].label}
            </SecondaryStakeButtonText>
          </SecondaryStakeButton>
        </Buttons>
      </StakingContainer>
      <ProgressBar tomb={tomb} />
      <Separator />
      <TableDetails tomb={tomb} />
    </>
  )
}

export default Bottom
