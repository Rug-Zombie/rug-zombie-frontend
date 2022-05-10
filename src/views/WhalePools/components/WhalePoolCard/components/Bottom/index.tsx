import React, { useEffect, useMemo, useRef, useState } from 'react'
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
import { fetchNftUserDataAsync } from "../../../../../../state/nfts";
import { WhalePool } from "../../../../../../state/types";

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
  const { toastGraves } = useToast()
  const whalePoolContract = useWhalePoolContract()


  const stakingSteps = useMemo(() => [], [])

  const [confirmingStake, setConfirmingStake] = useState(false)
  const [confirmingUnstake, setConfirmingUnstake] = useState(false)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchNftUserDataAsync(account))
  }, [account, dispatch])


  const approvedFromModal = (approved) => {
    setNftIsApproved(approved)
    currentStep.current = StakingStep.DepositWhaleNft
  }

  const [onApproveNftModal] = useModal(
    <ApproveNftModal approveNftId={nftId} approval={approvedFromModal}/>
  )

  const requestMint = () => {
    if(nftIsStaked && canRequestMint) {
      setConfirmingStake(true)
      whalePoolContract.methods.startMinting().send({ from: account, value: mintFee })
        .then(res => {
          setMintInProgress(true)
          toastGraves(stakingSteps[currentStep.current].toast.title)
          currentStep.current = StakingStep.MintRequested
          setConfirmingStake(false)
          updateMintRequested()
        })
    } else {
      toastGraves("Mint time not passed yet.")
    }
  }

  const showMintInProgress = () => {
    toastGraves("Mint is still in progress.")
  }

  const finishMint = () => {
    if(nftIsStaked && claimPrize) {
      whalePoolContract.methods.finishMinting().send({ from: account })
        .then(res => {
          toastGraves(stakingSteps[currentStep.current].toast.title)
          currentStep.current = StakingStep.Unstake
        })
    }
  }

  const unstakeWhaleNft = () => {
    if(nftIsStaked) {
      whalePoolContract.methods.unstake().send({ from: account })
        .then(res => {
          setNftIsApproved(false)
          setNftIsStaked(false)
          setMintInProgress(false)
          setUserCanRequestMint(false)
          setStakedId(0)
          toastGraves(stakingSteps[currentStep.current].toast.title)
          currentStep.current = StakingStep.DepositWhaleNft
        })
    }
  }

  enum StakingStep {
    DepositWhaleNft,
    CanRequestMint,
    MintRequested,
    ClaimPrize,
    Unstake,
  }

  const currentStep = useRef(StakingStep.DepositWhaleNft)

  if(isStaked) {
    currentStep.current = StakingStep.Unstake
  }

  useEffect(() => {
    if(!mintRequested) {
      setNftIsApproved(isApproved)
      setNftIsStaked(isStaked)
      if(isApproved && isStaked) {
        currentStep.current = StakingStep.CanRequestMint
      }
    }
  }, [isApproved, isStaked, mintRequested, StakingStep.CanRequestMint])

  useEffect(() => {
    if(!claimPrize) {
      setNftIsApproved(isApproved)
      setNftIsStaked(isStaked)
      setMintFinished(mintRequested)
      if(isApproved && isStaked && mintRequested) {
        currentStep.current = StakingStep.MintRequested
      }
    }
  }, [isApproved, isStaked, mintRequested, claimPrize, StakingStep.MintRequested])

  useEffect(() => {
    if(claimPrize && isApproved && isStaked && mintRequested) {
      currentStep.current = StakingStep.ClaimPrize
    }
  }, [isApproved, isStaked, mintRequested, claimPrize, StakingStep.ClaimPrize])

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
  stakingSteps[StakingStep.Unstake] = {
    label: `Unstake Whale NFT`,
    sent: `Unstaking...`,
    func: unstakeWhaleNft,
    toast: { title: `Unstaked successfully` },
  }

  const unstakeEarly = () => {
    if(nftIsStaked) {
      setConfirmingUnstake(true)
      whalePoolContract.methods.emergencyUnstake().send({ from: account })
        .then(res => {
          setConfirmingUnstake(false)
          toastGraves("Unstaked successfully")
        })
    }
  }


  const handleTx = () => {
    stakingSteps[currentStep.current].func()
  }

  return (
    <>
      <Separator/>
      <StakingContainer>
        <BalanceText>
          Staked NFT id : <AmountText>{stakedId}</AmountText>
        </BalanceText>
        <Buttons>
          <PrimaryStakeButton onClick={handleTx}>
            <PrimaryStakeButtonText>
              {confirmingStake ? stakingSteps[currentStep.current].sent : stakingSteps[currentStep.current].label}
            </PrimaryStakeButtonText>
          </PrimaryStakeButton>
          <SecondaryStakeButton onClick={unstakeEarly} disabled={!isStaked}>
            <SecondaryStakeButtonText>
              {confirmingUnstake ? 'Confirming Unstake...' : 'Unstake Early'}
            </SecondaryStakeButtonText>
          </SecondaryStakeButton>
        </Buttons>
      </StakingContainer>
      <WhalePoolProgressBar isApproved={nftIsApproved} isDeposited={nftIsApproved} mintRequested={canRequestMint}
                            mintFinished={mintRequested}/>
      <Separator/>
      <PoolDetails nftId={nftId}/>
    </>
  )
}

export default Bottom
