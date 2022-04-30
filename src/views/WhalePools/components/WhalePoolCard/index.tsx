/* eslint-disable no-param-reassign */
import React, {useCallback, useEffect, useMemo, useState} from 'react'
import styled from 'styled-components'
import {useWeb3React} from "@web3-react/core";
import {BigNumber} from 'bignumber.js';
import {getNftConfigByAddress} from '../../../../state/nfts/hooks';
import Top from './components/Top'
import Bottom from './components/Bottom'
import {useWhalePoolContract} from "../../../../hooks/useContract";
import {getFullDisplayBalance} from '../../../../utils/formatBalance';


const DetailsCard = styled.div<{ open: boolean }>`
  width: 100%;
  min-width: 260px;
  min-height: 130px;
  background-color: #151e21;
  border-radius: 10px;
  border: ${(props) => (props.open ? '2px solid #AE32AA' : '2px solid #151E21')};
  padding: 20px;
  margin: 0 0 0 0;
  display: flex;
  flex-direction: column;
  position: relative;
  @media (min-width: 1280px) {
    min-width: 668px;
  }
`

const Shadow = styled.div`
  width: 100%;
  height: 40px;
  background: #000000 0% 0% no-repeat padding-box;
  border-radius: 10px;
  opacity: 0.5;
  filter: blur(10px);
  position: relative;
  bottom: 35px;
  margin-bottom: -15px;
  z-index: -1;
`


const WhalePoolCard: React.FC = () => {

    const {account} = useWeb3React()
    const [open, setOpen] = useState(true)
    const whalePoolContract = useWhalePoolContract()

    const [nftId, setNftId] = useState(0)
    const [stakedNftId, setStakedNftId] = useState(0)
    const [isApproved, setIsApproved] = useState(false)
    const [isStaked, setIsStaked] = useState(false)
    const [canRequestMint, setCanRequestMint] = useState(false)
    const [mintRequested, setMintRequested] = useState(false)
    const [claimPrize, setCanClaimPrize] = useState(false)
    const [mintTime, setMintTime] = useState(new BigNumber(0))// time required to mint an nft
    const [mintingTime, setMintingTime] = useState(new BigNumber(0)) // time remaining to mint an nft if staked
    const [mintingFeeUSD, setMintingFeeUSD] = useState(0)
    const [mintFeeBNB, setMintFeeBNB] = useState(new BigNumber(0))

    const getMintFeeInBnb = useCallback(() => {
        whalePoolContract.methods.mintingFeeInBnb().call()
            .then(res => {
                setMintFeeBNB(res)
            })
    },[whalePoolContract.methods])

    const getDepositNftId = useCallback(() => {
        whalePoolContract.methods.stakeNft().call()
            .then(res => {
                setNftId(getNftConfigByAddress(res).id)
            })
    }, [whalePoolContract.methods])

    const getMintTime = useCallback(() => {
        whalePoolContract.methods.mintingTime().call()
            .then(res => {
                setMintTime(res)
            })
    }, [whalePoolContract.methods])

    const getMintingFee = useCallback(() => {
        whalePoolContract.methods.mintingFee().call()
            .then(res => {
                setMintingFeeUSD(Number(getFullDisplayBalance(new BigNumber(res))))
            })
    }, [whalePoolContract.methods])

    const checkIsStaked = useCallback(() => {
        if (account) {
            whalePoolContract.methods.checkUserStaked(account).call()
                .then(res => {
                    setIsStaked(res)
                })
        }
    }, [account, whalePoolContract.methods])

    const updateUserPoolInfo = useCallback(() => {
        if (account && isStaked) {
            whalePoolContract.methods.userInfo(account).call()
                .then(res => {
                    setStakedNftId(res.stakedId)
                    setIsApproved(true)
                    setMintRequested(res.isMinting)
                    if (res.hasRandom) {
                        setCanClaimPrize(true)
                    }
                })
        }
    }, [account, whalePoolContract.methods, isStaked])

    const updateUserNftMintingTime = useCallback(() => {
        if (account && isStaked) {
            whalePoolContract.methods.nftMintTime(account).call()
                .then(res => {
                    setMintingTime(res)
                    if (Number(res) === 0) {
                        setCanRequestMint(true)
                    }
                })
        }
    }, [account, whalePoolContract.methods, isStaked])

    useEffect(() => {
        getDepositNftId()
        getMintTime()
        getMintingFee()
        getMintFeeInBnb()
    })

    useEffect(() => {
        checkIsStaked()
    }, [account, checkIsStaked])

    useEffect(() => {
        updateUserPoolInfo()
    }, [account, isStaked, updateUserPoolInfo])

    useEffect(() => {
        updateUserNftMintingTime()
    }, [account, isStaked, updateUserNftMintingTime])

    return (
        <>
            <DetailsCard open={open}>
                <Top
                    open={open}
                    setOpen={setOpen}
                    fee={mintingFeeUSD}
                    isStaked={isStaked}
                    isMinting={mintRequested}
                    mintTime={mintTime}
                    mintTimeRemaining={mintingTime}
                />
                {
                    open ? <Bottom
                        nftId={nftId}
                        stakedNftId={stakedNftId}
                        mintingTime={mintingTime}
                        isApproved={isApproved}
                        isStaked={isStaked}
                        canRequestMint={canRequestMint}
                        mintRequested={mintRequested}
                        claimPrize={claimPrize}
                        mintFee={mintFeeBNB}
                    /> : null}
            </DetailsCard>
            <Shadow/>
        </>
    )
}

export default WhalePoolCard
