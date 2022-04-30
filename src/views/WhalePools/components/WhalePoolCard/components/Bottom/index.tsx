import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import styled from 'styled-components'
import {LinkExternal, useModal} from '@rug-zombie-libs/uikit'
import {BigNumber} from "bignumber.js";
import {WhalePool} from '../../../../../../state/types'
import {useERC721, useWhalePoolContract} from '../../../../../../hooks/useContract'
import useToast from '../../../../../../hooks/useToast'
import {getNftConfigById} from "../../../../../../state/nfts/hooks";
import {getAddress, getWhalePoolAddress} from "../../../../../../utils/addressHelpers";
import PoolDetails from "./components/PoolDetails";
import ApproveNftModal from "./components/ApproveNftModal";
import {account} from "../../../../../../redux/get";
import WhalePoolProgressBar from "./components/ProgressBar";

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

  &:hover {
    cursor: pointer;
  }
`

const AmountText = styled.p`
  font: normal normal normal 14px/21px Poppins;
  margin: 0;
`

interface BottomProps {
    nftId: number, // the nft to stake
    stakedNftId: number,
    isApproved: boolean,
    isStaked: boolean,
    canRequestMint: boolean,
    mintRequested: boolean,
    claimPrize: boolean,
    mintingTime: BigNumber,
    mintFee: BigNumber,
}

const Bottom: React.FC<BottomProps> = (
    {
        nftId,
        stakedNftId,
        isApproved,
        isStaked,
        canRequestMint,
        mintRequested,
        claimPrize,
        mintingTime,
        mintFee
    }) => {

    const {toastGraves} = useToast()
    const whalePoolContract = useWhalePoolContract()

    const [stakedId, setStakedId] = useState(stakedNftId) // id of the staked whale nft
    const [nftIsApproved, setNftIsApproved] = useState(isApproved) // is the selected whale nft is approved
    const [nftIsStaked, setNftIsStaked] = useState(isStaked)
    const [userCanRequestMint, setUserCanRequestMint] = useState(canRequestMint)
    const [mintInProgress, setMintInProgress] = useState(mintRequested)
    const [canClaimPrize, setCanClaimPrize] = useState(claimPrize)

    const [selectedTokenId, setSelectedTokenId] = useState(0) // selected whale nft to approve and stake
    const [mintFinished, setMintFinished] = useState(false) // if mint finished/rewards claimed
    const [mintDate, setMintDate] = useState(Number(mintingTime)) // if staked then time remaining to mint an nft

    const stakingSteps = useMemo(() => [], [])
    const unstakingSteps = useMemo(() => [], [])

    const [confirmingStake, setConfirmingStake] = useState(false)
    const [confirmingUnstake, setConfirmingUnstake] = useState(false)

    useEffect(() => {
        setStakedId(stakedNftId)
    }, [stakedNftId])

    const selectToken = (id) => {
        setSelectedTokenId(id)
    }

    const approvedFromModal = (approved) => {
        setNftIsApproved(approved)
        currentStep.current = StakingStep.DepositWhaleNft
    }

    const [onApproveNftModal] = useModal(
        <ApproveNftModal approveNftId={nftId} idSelected={selectToken} approval={approvedFromModal}/>
    )

    const onDepositNft = () => {
        if (nftIsApproved) {
            setConfirmingStake(true)
            whalePoolContract.methods.stake(selectedTokenId).send({from: account()})
                .then(res => {
                    setNftIsStaked(true)
                    setStakedId(selectedTokenId)
                    currentStep.current = StakingStep.CanRequestMint
                    setConfirmingStake(false)
                })
        }
    }

    const requestMint = () => {
        if (nftIsStaked && canRequestMint) {
            setConfirmingStake(true)
            whalePoolContract.methods.startMinting().send({from: account(), value: mintFee})
                .then(res => {
                    setMintInProgress(true)
                    currentStep.current = StakingStep.MintRequested
                    setConfirmingStake(false)
                })
        } else {
            toastGraves("Mint time not passed yet.")
        }
    }

    const showMintInProgress = () => {
        toastGraves("Mint is still in progress.")
    }

    const finishMint = () => {
        if (nftIsStaked && claimPrize) {
            whalePoolContract.methods.finishMinting().send({from: account()})
                .then(res => {
                    console.log(res)
                    currentStep.current = StakingStep.CanRequestMint
                })
        }
    }

    enum StakingStep {
        ApproveWhaleNft,
        DepositWhaleNft,
        CanRequestMint,
        MintRequested,
        ClaimPrize,
    }

    const currentStep = useRef(StakingStep.ApproveWhaleNft)

    useEffect(() => {
        if (!isStaked) {
            setNftIsApproved(isApproved)
            if (isApproved) {
                currentStep.current = StakingStep.DepositWhaleNft
            }
        }
    }, [isApproved, isStaked, StakingStep.DepositWhaleNft])

    useEffect(() => {
        if (!mintRequested) {
            setNftIsApproved(isApproved)
            setNftIsStaked(isStaked)
            if (isApproved && isStaked) {
                currentStep.current = StakingStep.CanRequestMint
            }
        }
    }, [isApproved, isStaked, mintRequested, StakingStep.CanRequestMint])

    useEffect(() => {
        if (!claimPrize) {
            setNftIsApproved(isApproved)
            setNftIsStaked(isStaked)
            setMintFinished(mintRequested)
            if (isApproved && isStaked  && mintRequested) {
                currentStep.current = StakingStep.MintRequested
            }
        }
    }, [isApproved, isStaked, mintRequested, claimPrize, StakingStep.MintRequested])

    useEffect(() => {
        if (claimPrize && isApproved && isStaked && mintRequested) {
            currentStep.current = StakingStep.ClaimPrize
        }
    }, [isApproved, isStaked, mintRequested, claimPrize, StakingStep.ClaimPrize])

    stakingSteps[StakingStep.ApproveWhaleNft] = {
        label: `Approve whale NFT`,
        sent: `Approving...`,
        func: onApproveNftModal,
        toast: {title: `Approved`},
    }
    stakingSteps[StakingStep.DepositWhaleNft] = {
        label: `Deposit whale NFT`,
        sent: `Depositing...`,
        func: onDepositNft,
        toast: {title: `Deposited`},
    }
    stakingSteps[StakingStep.CanRequestMint] = {
        label: `Request mint`,
        sent: `Requesting...`,
        func: requestMint,
        toast: {title: `Mint Requested`},
    }
    stakingSteps[StakingStep.MintRequested] = {
        label: `Request mint`,
        sent: `Requesting...`,
        func: showMintInProgress,
        toast: {title: `Mint Requested`},
    }
    stakingSteps[StakingStep.ClaimPrize] = {
        label: `Claim Prize`,
        sent: `Claiming...`,
        func: finishMint,
        toast: {title: `Prize claimed successfully`},
    }

    const unstakeWhaleNft = () => {
        if (nftIsStaked) {
            whalePoolContract.methods.unstake().send({from: account()})
                .then(res => {
                    console.log(res, ' < unstaked')
                })
        }
    }

    const unstakeEarly = () => {
        if (nftIsStaked) {
            whalePoolContract.methods.emergencyUnstake().send({from: account()})
                .then(res => {
                    console.log(res, ' < unstaked')
                })
        }
    }

    enum UnstakingStep {
        Unstake,
        UnstakeEarly,
    }

    const currentUnstakingStep = (nftIsStaked && mintFinished) ? UnstakingStep.Unstake : UnstakingStep.UnstakeEarly

    unstakingSteps[UnstakingStep.Unstake] = {
        label: `Unstake`,
        sent: `Unstaking...`,
        func: unstakeWhaleNft,
        toast: {title: `Unstaked successfully`},
    }

    unstakingSteps[UnstakingStep.UnstakeEarly] = {
        label: `Unstake Early`,
        sent: `Unstaking...`,
        func: unstakeEarly,
        toast: {title: `Unstaked successfully`},
    }

    const handleTx = () => {
        stakingSteps[currentStep.current].func()
    }

    const handleUnstakeTx = () => {
        unstakingSteps[currentUnstakingStep].func()
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
                    <SecondaryStakeButton onClick={handleUnstakeTx} disabled={!isStaked}>
                        <SecondaryStakeButtonText>
                            {confirmingUnstake
                                ? unstakingSteps[currentUnstakingStep].sent
                                : unstakingSteps[currentUnstakingStep].label}
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
