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
import { WhalePool } from "../../../../state/types";


const DetailsCard = styled.div<{ open: boolean }>`
  width: 100%;
  min-width: 260px;
  min-height: 130px;
  background-color: #151e21;
  border-radius: 10px;
  border: ${(props) => (props.open ? '2px solid red' : '2px solid #151E21')};
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

interface WhalePoolCardProps {
    whalePool: WhalePool
}

const WhalePoolCard: React.FC<WhalePoolCardProps> = ({ whalePool }) => {
    const [open, setOpen] = useState(true)
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
