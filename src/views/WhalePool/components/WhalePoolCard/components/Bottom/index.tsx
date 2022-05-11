import React, { useCallback, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { useModal } from '@rug-zombie-libs/uikit'
import { useWeb3React } from "@web3-react/core";
import { useWhalePoolContract } from '../../../../../../hooks/useContract'
import useToast from '../../../../../../hooks/useToast'
import PoolDetails from "./components/PoolDetails";
import DepositNftModal from "./components/DepositNftModal";
import WhalePoolProgressBar from "./components/ProgressBar";
import { WhalePool } from "../../../../../../state/types";
import { useFinishMinting, useStartMinting, useUnstake } from "../../../../../../hooks/useWhalePool";
import { formatDuration } from "../../../../../../utils/timerHelpers";
import { useAppDispatch } from "../../../../../../state";
import { fetchWhalePoolUserDataAsync } from "../../../../../../state/whalePools";

const Separator = styled.div`
  height: 0px;
  border: 1px dashed #6b7682;
  margin: 25px 0 0 0;
`

const StakingContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const Buttons = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-evenly;
  margin: 25px 0 0 0;
  @media (max-width: 723px) {
    margin: 10px 0 0 0;
  }
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
  margin: 30px 0px 0px 30px;

  @media (max-width: 723px) {
    margin: 10px 0 0 0;
  }
`

const AmountText = styled.p`
  font: normal normal normal 14px/21px Poppins;
  margin: 0;
`

interface BottomProps {
  whalePool: WhalePool
}

const Bottom: React.FC<BottomProps> = ({ whalePool }) => {
  const { account } = useWeb3React()
  const { toastError } = useToast()
  const whalePoolContract = useWhalePoolContract()
  const {
    nftId,
    poolInfo: { mintingFeeBnb },
    userInfo: { isStaked, isMinting, nftMintTime, hasRandom, stakedId }
  } = whalePool
  const canRequestMint = nftMintTime.isZero() && isStaked
  const stakingSteps = useMemo(() => [], [])
  const unstakingSteps = useMemo(() => [], [])

  const [confirmingStake, setConfirmingStake] = useState(false)
  const [confirmingUnstake, setConfirmingUnstake] = useState(false)

  const canMint = !isMinting && canRequestMint
  const mintRequested = !hasRandom && isMinting

  const { onStartMinting } = useStartMinting(whalePoolContract, mintingFeeBnb)
  const { onFinishMinting } = useFinishMinting(whalePoolContract)
  const { onUnstake } = useUnstake(whalePoolContract)
  const dispatch = useAppDispatch()
  const [openModal] = useModal(
    <DepositNftModal nftId={nftId}/>
  )

  const onDepositNftModal = async () => {
    openModal()
    return true
  }

  const showMintInProgress = async () => {
    toastError("Mint is still in progress.")
    dispatch(fetchWhalePoolUserDataAsync(account))
    return true
  }

  enum StakingStep {
    DepositWhaleNft,
    CanRequestMint,
    MintRequested,
    ClaimPrize,
  }

  enum UnstakingStep {
    NA,
    Unstake,
  }

  let currentStep = StakingStep.DepositWhaleNft
  let currentUnstakingStep = UnstakingStep.NA

  if(isStaked) {
    currentStep = StakingStep.CanRequestMint
  }

  if(mintRequested) {
    currentStep = StakingStep.MintRequested
  }

  if(hasRandom && isMinting) {
    currentStep = StakingStep.ClaimPrize
  }

  if(canMint) {
    currentStep = StakingStep.CanRequestMint
  }

  stakingSteps[StakingStep.DepositWhaleNft] = {
    label: `Deposit Whale Pass`,
    sent: `Depositing...`,
    func: onDepositNftModal,
  }
  stakingSteps[StakingStep.CanRequestMint] = {
    label: `Request mint`,
    sent: `Requesting...`,
    func: onStartMinting,
    toast: { title: `Mint Requested` },
  }
  stakingSteps[StakingStep.MintRequested] = {
    label: `Mint Requested`,
    sent: `Requesting...`,
    func: showMintInProgress,
    toast: { title: `Mint Requested` },
  }
  stakingSteps[StakingStep.ClaimPrize] = {
    label: `Claim Prize`,
    sent: `Claiming...`,
    func: onFinishMinting,
    toast: { title: `Prize claimed successfully` },
  }

  if(isStaked) {
    currentUnstakingStep = UnstakingStep.Unstake
  }

  unstakingSteps[UnstakingStep.NA] = {
    label: `NA`,
    sent: `NA`,
    func: null,
  }

  unstakingSteps[UnstakingStep.Unstake] = {
    label: `Unstake Whale Pass`,
    sent: `Unstaking...`,
    func: onUnstake,
    toast: { title: `Unstaked successfully` },
  }

  const handleTx = useCallback(() => {
    const step = stakingSteps[currentStep]
    if(currentStep === StakingStep.CanRequestMint && nftMintTime.gt(0)) {
      toastError("NFT is not ready", `${formatDuration(nftMintTime.toNumber(), false, true)} remaining.`)
      dispatch(fetchWhalePoolUserDataAsync(account))
      return
    }
    setConfirmingStake(true)
    step.func()
      .then((succeeded) => {
        if(succeeded) {
          if(step.toast) {
            toastError(step.toast.title, step.toast.description)
          }
        }
        setConfirmingStake(false)
      })
  }, [StakingStep.CanRequestMint, account, currentStep, dispatch, nftMintTime, stakingSteps, toastError])

  const handleUnstakeTx = () => {
    const step = unstakingSteps[currentUnstakingStep]
    setConfirmingUnstake(true)
    step.func()
      .then((succeeded) => {
        if(succeeded) {
          toastError(step.toast.title, step.toast.description)
        }
        setConfirmingUnstake(false)
      })
  }

  return (
    <>
      <Separator/>
      <StakingContainer>
        <BalanceText>
          Staked NFT ID : <AmountText>{isStaked ? stakedId.toString() : 'None'}</AmountText>
        </BalanceText>
        <Buttons>
          <PrimaryStakeButton onClick={handleTx}>
            <PrimaryStakeButtonText>
              {confirmingStake ? stakingSteps[currentStep].sent : stakingSteps[currentStep].label}
            </PrimaryStakeButtonText>
          </PrimaryStakeButton>
          <SecondaryStakeButton onClick={handleUnstakeTx} disabled={!isStaked}>
            <SecondaryStakeButtonText>
              {confirmingUnstake ? unstakingSteps[currentUnstakingStep].sent : unstakingSteps[currentUnstakingStep].label}
            </SecondaryStakeButtonText>
          </SecondaryStakeButton>
        </Buttons>
      </StakingContainer>
      <WhalePoolProgressBar isDeposited={isStaked} mintRequested={canRequestMint}
                            mintFinished={hasRandom && isMinting}/>
      <Separator/>
      <PoolDetails whalePool={whalePool}/>
    </>
  )
}

export default Bottom
