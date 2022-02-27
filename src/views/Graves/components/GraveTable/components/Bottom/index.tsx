import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { BigNumber } from 'bignumber.js'
import numeral from 'numeral'
import { LinkExternal, useModal } from '@rug-zombie-libs/uikit'
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
import tokens from '../../../../../../config/constants/tokens'
import { getBalanceNumber, getDecimalAmount, getFullDisplayBalance } from '../../../../../../utils/formatBalance'
import { zombieBalance } from '../../../../../../redux/get'
import { useGetNfts } from '../../../../../../state/hooks'
import ConvertNftModal from './components/ConvertNftModal'
import BurnZombieModal from './components/BurnZombieModal'
import useToast from '../../../../../../hooks/useToast'
import { formatDuration, now } from '../../../../../../utils/timerHelpers'
import PreApprovalProgressBar from './components/PreApprovalProgressBar'

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

const Link = styled(LinkExternal)`
  text-align: left;
  text-decoration: underline;
  font: normal normal normal 16px/30px Poppins;
  letter-spacing: 0px;
  color: #ae32aa;
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

const PrimaryStakeButtonText = styled.div`
  text-align: center;
  font: normal normal normal 16px/25px Poppins;
  color: #010202;
`

const SecondaryStakeButtonText = styled.div`
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

const AmountText = styled.p`
  font: normal normal normal 14px/21px Poppins;
  margin: 0;
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

interface BottomProps {
  grave: Grave
}

const Bottom: React.FC<BottomProps> = ({ grave }) => {
  const {
    pid,
    rug,
    nftId,
    depositNftId,
    nftConverterPid,
    endDate,
    isRetired,
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
    poolInfo: { unlockFee, minimumStake, nftMintTime },
  } = grave

  const [stakeAmount, setStakeAmount] = useState(new BigNumber(null))
  const [unstakeAmount, setUnstakeAmount] = useState(new BigNumber(null))
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
  const isFirstGrave = getId(pid) === 22
  const nfts = useGetNfts().data
  const depositNft = depositNftId ? nfts.find((n) => n.id === depositNftId) : null
  const nft = nfts.find((n) => n.id === nftId)
  const { toastGraves } = useToast()

  enum StakingStep {
    ApproveRug,
    DepositRug,
    UnlockGrave,
    ApproveZombie,
    StakeZombie,
    Staked,
    ApproveDepositNft,
    ConvertDepositNft,
  }

  const insufficientStakeAmount = amount.plus(stakeAmount).lt(minimumStake)
  const insufficientZombieBalance = stakeAmount.gt(zombieBalance())
  const validUnstakeAmount = amount.minus(unstakeAmount).gte(minimumStake) || amount.minus(unstakeAmount).isZero()
  const insufficientStakedBalance = unstakeAmount.gt(amount)

  const [onConvertNftModal] = useModal(
    <ConvertNftModal nftConverterPid={nftConverterPid} depositNftId={depositNftId} />,
  )
  const [onBurnZombieModal] = useModal(<BurnZombieModal pid={getId(pid)} />)

  if (depositNftId) {
    stakingSteps[StakingStep.ConvertDepositNft] = {
      label: `Convert ${depositNft.symbol} NFT`,
      sent: `Selecting...`,
      func: onConvertNftModal,
      nonAsync: true,
    }
  }
  stakingSteps[StakingStep.ApproveRug] = {
    label: `Approve ${rug.symbol}`,
    sent: `Approving...`,
    func: approveRug,
    toast: { title: `Approved ${rug.symbol}` },
  }
  if (isFirstGrave) {
    stakingSteps[StakingStep.DepositRug] = {
      label: 'Begin Journey',
      func: onBurnZombieModal,
      nonAsync: true,
    }
  } else {
    stakingSteps[StakingStep.DepositRug] = {
      label: `Deposit ${rug.symbol}`,
      sent: `Depositing...`,
      func: onDepositRug,
      toast: { title: `Deposited ${rug.symbol}` },
    }
  }
  stakingSteps[StakingStep.UnlockGrave] = {
    label: `Unlock`,
    sent: `Unlocking...`,
    func: onUnlock,
    toast: { title: 'Unlocked Grave' },
  }
  stakingSteps[StakingStep.ApproveZombie] = {
    label: `Approve ZMBE`,
    sent: `Approving...`,
    func: approveZombie,
    toast: { title: 'Approved ZMBE' },
  }
  stakingSteps[StakingStep.StakeZombie] = {
    label: `Stake ZMBE`,
    sent: `Staking...`,
    func: onStake,
    toast: { title: 'Staked ZMBE' },
  }
  stakingSteps[StakingStep.Staked] = {
    label: `Stake ZMBE`,
    sent: `Staking...`,
    func: onStake,
    toast: { title: 'Staked ZMBE' },
  }
  let currentStep
  if (rugBalance.isZero() && depositNftId) {
    currentStep = StakingStep.ConvertDepositNft
  } else {
    currentStep = StakingStep.ApproveRug
  }
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
  if (zombieAllowance.isZero() && amount.gt(0)) {
    currentStep = StakingStep.ApproveZombie
  }

  const handleTx = useCallback(async () => {
    const step = stakingSteps[currentStep]
    if (step.nonAsync) {
      step.func()
    } else {
      if (currentStep === StakingStep.StakeZombie) {
        if (insufficientZombieBalance) {
          toastGraves(
            'Insufficient ZMBE balance',
            <Link href={`https://swap.rugzombie.io/swap?outputCurrency=${getAddress(tokens.zmbe.address)}`}>
              Buy ZMBE
            </Link>,
          )
          return
        }
        if (insufficientStakeAmount) {
          toastGraves(
            'Insufficient Stake',
            `This grave requires a minimum of ${getFullDisplayBalance(minimumStake)} ZMBE`,
          )
          return
        }
      }
      if (
        (nftMintTime.gt(endDate - now()) || isRetired) &&
        [StakingStep.DepositRug, StakingStep.StakeZombie, StakingStep.UnlockGrave].includes(currentStep)
      ) {
        toastGraves(
          'Notice',
          <FlexColumn>
            <text>
              {endDate - now() > 0 || isRetired
                ? 'This grave is retired. '
                : `This grave retires in ${formatDuration(endDate - now())}. `}
              You will can no longer earn the {nft.name} NFT by staking.
            </text>
            <FlexRow>
              <PrimaryStakeButton onClick={step.func}>
                <PrimaryStakeButtonText>Proceed</PrimaryStakeButtonText>
              </PrimaryStakeButton>
            </FlexRow>
          </FlexColumn>,
        )
        return
      }

      setConfirmingStake(true)
      step
        .func()
        .then((succeeded) => {
          if (succeeded) {
            toastGraves(step.toast.title)
          }
          setConfirmingStake(false)
        })
        .catch(() => {
          setConfirmingStake(false)
        })
    }
  }, [
    stakingSteps,
    currentStep,
    StakingStep.StakeZombie,
    StakingStep.DepositRug,
    StakingStep.UnlockGrave,
    nftMintTime,
    endDate,
    insufficientZombieBalance,
    insufficientStakeAmount,
    toastGraves,
    minimumStake,
    nft.name,
    isRetired,
  ])

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
    toast: { title: `Minted ${nft.symbol} NFT` },
    func: onHarvest,
  }
  unstakingSteps[UnstakingStep.Harvest] = {
    label: `Harvest`,
    sent: `Harvesting...`,
    toast: { title: 'Harvested ZMBE' },
    func: onHarvest,
  }
  unstakingSteps[UnstakingStep.Unstake] = {
    label: `Unstake`,
    sent: `Unstaking...`,
    toast: { title: 'Unstaked ZMBE' },
    func: onUnstake,
  }
  unstakingSteps[UnstakingStep.UnstakeEarly] = {
    label: `Unstake Early`,
    sent: `Unstaking...`,
    toast: { title: 'Unstaked ZMBE' },
    func: onUnstakeEarly,
  }

  let currentUnstakingStep = UnstakingStep.Unstake
  if (amount.gt(0)) {
    if (nftMintDate.lte(now())) {
      currentUnstakingStep = UnstakingStep.MintNft
    } else if (unstakeAmount.isZero() || unstakeAmount.isNaN()) {
      currentUnstakingStep = UnstakingStep.Harvest
    } else if (tokenWithdrawalDate.gt(now())) {
      currentUnstakingStep = UnstakingStep.UnstakeEarly
    }
  }

  const handleUnstakeTx = useCallback(async () => {
    if (currentUnstakingStep === UnstakingStep.Unstake || currentUnstakingStep === UnstakingStep.UnstakeEarly) {
      if (insufficientStakedBalance) {
        toastGraves('Insufficient staked balance', 'The amount specified exceeds your staked balance')
        return
      }
      if (!validUnstakeAmount) {
        toastGraves(
          'Invalid amount',
          <FlexColumn>
            <text>You must leave a minimum of {getFullDisplayBalance(minimumStake)} ZMBE in the grave</text>
            <FlexRow>
              <PrimaryStakeButton
                onClick={() => {
                  setUnstakeAmount(amount.minus(minimumStake))
                }}
              >
                <PrimaryStakeButtonText>Leave minimum</PrimaryStakeButtonText>
              </PrimaryStakeButton>
              <SecondaryStakeButton
                onClick={() => {
                  setUnstakeAmount(amount)
                }}
              >
                <SecondaryStakeButtonText>Withdraw max</SecondaryStakeButtonText>
              </SecondaryStakeButton>
            </FlexRow>
          </FlexColumn>,
        )
        return
      }
    }

    setConfirmingUnstake(true)
    unstakingSteps[currentUnstakingStep]
      .func()
      .then((succeeded) => {
        if (succeeded) {
          toastGraves(unstakingSteps[currentUnstakingStep].toast.title)
        }
        setConfirmingUnstake(false)
      })
      .catch(() => {
        setConfirmingUnstake(false)
      })
  }, [
    UnstakingStep.Unstake,
    UnstakingStep.UnstakeEarly,
    amount,
    currentUnstakingStep,
    insufficientStakedBalance,
    minimumStake,
    toastGraves,
    unstakingSteps,
    validUnstakeAmount,
  ])

  const decimals =
    currentStep === StakingStep.ApproveRug || currentStep === StakingStep.DepositRug
      ? rug.decimals
      : tokens.zmbe.decimals
  const changeStakeInput = (e) => {
    setStakeAmount(getDecimalAmount(new BigNumber(e.target.value), decimals))
  }

  const changeUnstakeInput = (e) => {
    setUnstakeAmount(getDecimalAmount(new BigNumber(e.target.value), tokens.zmbe.decimals))
  }

  const maxStakeAmount = () => {
    const maxAmount =
      currentStep === StakingStep.ApproveRug || currentStep === StakingStep.DepositRug ? rugBalance : zombieBalance()
    setStakeAmount(maxAmount)
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
            {currentStep === StakingStep.ApproveRug || currentStep === StakingStep.DepositRug ? (
              <BalanceText onClick={maxStakeAmount}>
                Wallet Balance:{' '}
                <AmountText>
                  {numeral(getFullDisplayBalance(rugBalance, rug.decimals)).format('(0.00 a)')} {rug.symbol}
                </AmountText>
              </BalanceText>
            ) : (
              <BalanceText onClick={maxStakeAmount}>
                Wallet Balance:{' '}
                <AmountText>{numeral(getFullDisplayBalance(zombieBalance())).format('(0.00 a)')} ZMBE</AmountText>
              </BalanceText>
            )}
            <StakingInput
              onInput={changeStakeInput}
              value={getBalanceNumber(stakeAmount, decimals)}
              placeholder="Stake amount"
              type="number"
            />
          </InputControl>
          <InputControl>
            <BalanceText onClick={maxUnstakeAmount}>
              Your Staked: <AmountText>{numeral(getFullDisplayBalance(amount)).format('(0.00 a)')} ZMBE</AmountText>
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
              {confirmingStake ? stakingSteps[currentStep].sent : stakingSteps[currentStep].label}
            </PrimaryStakeButtonText>
          </PrimaryStakeButton>
          <SecondaryStakeButton onClick={handleUnstakeTx}>
            <SecondaryStakeButtonText>
              {confirmingUnstake
                ? unstakingSteps[currentUnstakingStep].sent
                : unstakingSteps[currentUnstakingStep].label}
            </SecondaryStakeButtonText>
          </SecondaryStakeButton>
        </Buttons>
      </StakingContainer>
      {/* eslint-disable-next-line react/jsx-no-undef */}
      {zombieAllowance.gt(0) ? <ProgressBar grave={grave} /> : <PreApprovalProgressBar grave={grave} />}
      <Separator />
      <TableDetails grave={grave} />
    </>
  )
}

export default Bottom
