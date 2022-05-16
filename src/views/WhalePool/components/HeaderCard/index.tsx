/* eslint-disable no-param-reassign */
import ContractLink from 'components/ContractLink'
import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import numeral from 'numeral'
import {getWhalePoolAddress} from 'utils/addressHelpers'
import {useWhalePoolContract} from "../../../../hooks/useContract";
import { account } from '../../../../redux/get'
import { WhalePool } from "../../../../state/types";


const InfoCard = styled.header`
  background-color: #151e21;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const HalfLine = styled.div`
  border-radius: 0px 0px 5px 5px;
  margin: 0 auto;
  height: 5px;
  width: 80%;
  background-color: red;
`

const InfoCardTitle = styled.h3`
  text-align: left;
  font: normal normal 500 1.6rem Poppins;
  letter-spacing: 0.5px;
  color: #ffffff;
  width: 100%;
  padding: 0 10px;
`

const InfoCardSubHeader = styled.h4`
  width: 100%;
  text-align: left;
  font: normal normal normal 16px/30px Poppins;
  letter-spacing: 0px;
  color: #6b7682;
  padding: 0 10px;
`

const InfoCardHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;
`

const InfoCardContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px 20px 20px;
  width: 100%;
`

const InfoCardSubtitle = styled.p`
  text-align: left;
  font: normal normal normal 12px/30px Poppins;
  letter-spacing: 0px;
  color: #6b7682;
  padding: 0 10px;
`

const InfoCardValue = styled.p`
  text-align: left;
  font: normal normal normal 30px/36px Poppins;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
  padding: 0 10px 10px 10px;
`

const Shadow = styled.div`
  width: 100%;
  height: 40px;
  background: #000000 0% 0% no-repeat padding-box;
  border-radius: 10px;
  opacity: 0.5;
  filter: blur(10px);
  position: relative;
  bottom: 26px;
  margin-bottom: -25px;
  z-index: -1;
`

interface HeaderCardProps {
  whalePool: WhalePool
}

const HeaderCard:  React.FC<HeaderCardProps> = ({ whalePool }) => {
  const { poolInfo: { totalStakers } } = whalePool
  return (
    <>
      <InfoCard>
        <HalfLine />
        <InfoCardHeader>
          <InfoCardTitle>WhalePools</InfoCardTitle>
          <InfoCardSubHeader>
            Stake your Whale Pass to earn random retired and exclusive NFTs.
            <ContractLink address={getWhalePoolAddress()} />
          </InfoCardSubHeader>
        </InfoCardHeader>
        <InfoCardContent>
          <InfoCardSubtitle>Total Stakers</InfoCardSubtitle>
          <InfoCardValue>{totalStakers}</InfoCardValue>
        </InfoCardContent>
      </InfoCard>
      <Shadow />
    </>
  )
}

export default HeaderCard
