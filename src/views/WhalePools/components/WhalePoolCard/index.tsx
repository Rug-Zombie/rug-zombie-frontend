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
import { useGetWhalePool } from "../../../../state/whalePools/hooks";


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
    const [open, setOpen] = useState(true)
    const whalePool = useGetWhalePool()


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




    return (
        <>
            <DetailsCard open={open}>
                <Top
                    open={open}
                    setOpen={setOpen}
                    whalePool={whalePool}
                />
                {
                    open ? <Bottom
                        whalePool={whalePool}
                    /> : null}
            </DetailsCard>
            <Shadow/>
        </>
    )
}

export default WhalePoolCard
