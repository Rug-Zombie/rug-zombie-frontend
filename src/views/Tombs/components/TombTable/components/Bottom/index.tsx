import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { BigNumber } from 'bignumber.js'
import numeral from 'numeral'
import ProgressBar from './components/ProgressBar'
import TableDetails from './components/TableDetails'
import { Tomb } from '../../../../../../state/types'
import { useApprove } from '../../../../../../hooks/useApprove'
import { getAddress, getDrFrankensteinAddress } from '../../../../../../utils/addressHelpers'
import { useDrFrankenstein, useERC20 } from '../../../../../../hooks/useContract'
import {
  useHarvest,
  useStake,
  useUnstake,
  useUnstakeEarly,
} from '../../../../../../hooks/useGrave'
import { getId } from '../../../../../../utils'
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
`;

interface BottomProps {
  tomb: Tomb;
}

const Bottom: React.FC<BottomProps> = ({ tomb }) => {
  const {
    pid,
    lpAddress,
    token1,
    token2,
    userInfo: { lpAllowance, lpBalance, nftMintDate, tokenWithdrawalDate, amount },
  } = tomb
  const [stakeAmount, setStakeAmount] = useState(BIG_ZERO)
  const [unstakeAmount, setUnstakeAmount] = useState(BIG_ZERO)
  const lpContract = useERC20(getAddress(lpAddress))
  const drFrankenstein = useDrFrankenstein()
  const approveLp = useApprove(lpContract, getDrFrankensteinAddress()).onApprove
  const { onStake } = useStake(drFrankenstein, getId(pid), stakeAmount)
  const { onUnstake } = useUnstake(drFrankenstein, getId(pid), unstakeAmount)
  const { onUnstakeEarly } = useUnstakeEarly(drFrankenstein, getId(pid), unstakeAmount)
  const { onHarvest } = useHarvest(drFrankenstein, getId(pid))
  const [confirming, setConfirming] = useState(false)
  const steps = useMemo(() => [], [])
  const now = Math.floor(Date.now() / 1000)

  enum Step {
    PairLp,
    ApproveLp,
    StakeLp,
    Staked
  }

  const lpName = `${token2.symbol}-${token1.symbol} LP`

  steps[Step.PairLp] = {
    label: `Pair ${lpName} LP`,
    sent: `Pairing...`,
    func: null,
  }
  steps[Step.ApproveLp] = {
    label: `Approve ${lpName} LP`,
    sent: `Approving...`,
    func: approveLp,
  }
  steps[Step.StakeLp] = {
    label: `Stake LP ${lpName}`,
    sent: `Staking...`,
    func: onStake,
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
    setStakeAmount(lpBalance)
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
      <BalanceText onClick={maxStakeAmount}>Wallet Balance: {numeral(getFullDisplayBalance(lpBalance)).format('(0.00 a)')} {lpName}</BalanceText>
      <BalanceText onClick={maxUnstakeAmount}>Your Staked: {numeral(getFullDisplayBalance(amount)).format('(0.00 a)')} {lpName}</BalanceText>
  </BalanceContainer>
    <StakingContainer>
      <Inputs>
        <StakingInput onInput={changeStakeInput} value={getBalanceNumber(stakeAmount)} placeholder='Stake amount' type='number' />
        <StakingInput onInput={changeUnstakeInput} value={getBalanceNumber(unstakeAmount)} placeholder='Unstake amount' type='number' />
      </Inputs>
      <Buttons>
        <PrimaryStakeButton onClick={handleTx}>
          <PrimaryStakeButtonText>{confirming ? steps[currentStep].sent : steps[currentStep].label}</PrimaryStakeButtonText>
        </PrimaryStakeButton>
        {withdrawButton()}
      </Buttons>
    </StakingContainer>
    <ProgressBar tomb={tomb} />
    <Separator />
    <TableDetails tomb={tomb} />
  </>
}

export default Bottom