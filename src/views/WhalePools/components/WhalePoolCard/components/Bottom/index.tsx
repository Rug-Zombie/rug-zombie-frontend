import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { useModal } from '@rug-zombie-libs/uikit'
import { BigNumber } from "bignumber.js";
import { useWeb3React } from "@web3-react/core";
import { useWhalePoolContract } from '../../../../../../hooks/useContract'
import useToast from '../../../../../../hooks/useToast'
import PoolDetails from "./components/PoolDetails";
import ApproveNftModal from "./components/ApproveNftModal";
import WhalePoolProgressBar from "./components/ProgressBar";
import { useAppDispatch } from "../../../../../../state";
import { WhalePool } from "../../../../../../state/types";
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
  const dispatch = useAppDispatch()
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

  const [onApproveNftModal] = useModal(
    <ApproveNftModal nftId={nftId}/>
  )

  const requestMint = () => {
    if(isStaked && canRequestMint) {
      setConfirmingStake(true)
      whalePoolContract.methods.startMinting().send({ from: account, value: mintingFeeBnb.toString() })
        .then(() => {
          toastError(stakingSteps[currentStep.current].toast.title)
          currentStep.current = StakingStep.MintRequested
          setConfirmingStake(false)
        })
    } else {
      toastError("Mint time not passed yet.")
    }
  }

  const showMintInProgress = () => {
    toastError("Mint is still in progress.")
  }

  const finishMint = () => {
    setConfirmingStake(true)
    whalePoolContract.methods.finishMinting().send({ from: account })
      .then(() => {
        toastError(stakingSteps[currentStep.current].toast.title)
        currentUnstakingStep.current = UnstakingStep.Unstake
        setConfirmingStake(false)
      })
      .catch(() => {
        setConfirmingStake(false)
      })
  }

  const unstakeWhaleNft = useCallback(() => {
    if(isStaked && account) {
      setConfirmingUnstake(true)
      whalePoolContract.methods.unstake().send({ from: account })
        .then(() => {
          toastError(unstakingSteps[currentUnstakingStep.current].toast.title)
          setConfirmingUnstake(false)
        })
        .catch(() => {
          setConfirmingUnstake(false)
        })
    }
  } , [account, isStaked, toastError, unstakingSteps, whalePoolContract.methods])

  enum StakingStep {
    DepositWhaleNft,
    CanRequestMint,
    MintRequested,
    ClaimPrize,
    Staked,
  }

  enum UnstakingStep {
    NA,
    Unstake,
  }

  const currentStep = useRef(StakingStep.DepositWhaleNft)
  const currentUnstakingStep = useRef(UnstakingStep.NA)

  if(isStaked) {
    currentStep.current = StakingStep.CanRequestMint
  }

  if(mintRequested) {
    currentStep.current = StakingStep.MintRequested
  }

  if(hasRandom && isMinting) {
    currentStep.current = StakingStep.ClaimPrize
  }

  if(canMint) {
    currentStep.current = StakingStep.CanRequestMint
  }

  stakingSteps[StakingStep.DepositWhaleNft] = {
    label: `Deposit Whale Pass`,
    sent: `Depositing...`,
    func: onApproveNftModal,
  }
  stakingSteps[StakingStep.CanRequestMint] = {
    label: `Request mint`,
    sent: `Requesting...`,
    func: requestMint,
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
    func: finishMint,
    toast: { title: `Prize claimed successfully` },
  }

  if(isStaked) {
    currentUnstakingStep.current = UnstakingStep.Unstake
  }

  unstakingSteps[UnstakingStep.NA] = {
    label: `NA`,
    sent: `NA`,
    func: null,
  }

  unstakingSteps[UnstakingStep.Unstake] = {
    label: `Unstake Whale Pass`,
    sent: `Unstaking...`,
    func: unstakeWhaleNft,
    toast: { title: `Unstaked successfully` },
  }

  const handleTx = () => {
    stakingSteps[currentStep.current].func()
    dispatch(fetchWhalePoolUserDataAsync(account))
  }

  const handleUnstakeTx = () => {
    unstakingSteps[currentUnstakingStep.current].func()
    dispatch(fetchWhalePoolUserDataAsync(account))
  }

  return (
    <>
      <Separator/>
      <StakingContainer>
        <BalanceText>
          Staked NFT id : <AmountText>{stakedId ? stakedId.toString() : 'None'}</AmountText>
        </BalanceText>
        <Buttons>
          <PrimaryStakeButton onClick={handleTx}>
            <PrimaryStakeButtonText>
              {confirmingStake ? stakingSteps[currentStep.current].sent : stakingSteps[currentStep.current].label}
            </PrimaryStakeButtonText>
          </PrimaryStakeButton>
          <SecondaryStakeButton onClick={handleUnstakeTx} disabled={!isStaked}>
            <SecondaryStakeButtonText>
              {confirmingUnstake ? unstakingSteps[currentUnstakingStep.current].sent : unstakingSteps[currentUnstakingStep.current].label}
            </SecondaryStakeButtonText>
          </SecondaryStakeButton>
        </Buttons>
      </StakingContainer>
      <WhalePoolProgressBar isDeposited={isStaked} mintRequested={canRequestMint}
                            mintFinished={mintRequested}/>
      <Separator/>
      <PoolDetails nftId={nftId}/>
    </>
  )
}

export default Bottom
