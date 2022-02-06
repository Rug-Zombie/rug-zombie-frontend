/* eslint-disable no-param-reassign */
import React from 'react'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import numeral from 'numeral'

const InfoCard = styled.header`
  background-color: #151E21;
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
  background-color: #30C00D;
`

const InfoCardTitle = styled.h3`
  text-align: left;
  font: normal normal 500 1.6rem Poppins;
  letter-spacing: 0.5px;
  color: #FFFFFF;
`

const InfoCardSubHeader = styled.h4`
  width: 100%;
  text-align: left;
  font: normal normal normal 16px/30px Poppins;
  letter-spacing: 0px;
  color: #6B7682;
  padding: 0 10px;
`

const InfoCardLink = styled.p`
  text-align: left;
  text-decoration: underline;
  font: normal normal normal 16px/30px Poppins;
  letter-spacing: 0px;
  color: #AE32AA;
`

const InfoCardHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%
`

const InfoCardContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px 20px 20px;
  width: 100%
`

const InfoCardSubtitle = styled.p`
  text-align: left;
  font: normal normal normal 12px/30px Poppins;
  letter-spacing: 0px;
  color: #6B7682;
  padding: 0 10px;
`

const InfoCardValue = styled.p`
  text-align: left;
  font: normal normal normal 30px/36px Poppins;
  letter-spacing: 0px;
  color: #FFFFFF;
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
  tvl: number;
  pageTvl: { page: string, tvl: number };
  myHoldings: number;
}

const HeaderCard: React.FC<HeaderCardProps> = ({ tvl, pageTvl, myHoldings }) => {
  const { account } = useWeb3React()

  return (
    <>
      <InfoCard>
        <HalfLine />
        <InfoCardHeader>
          <InfoCardTitle>
            SpawningPools
          </InfoCardTitle>
          <InfoCardSubHeader>
            Use your dead tokens to unlock spawningPools then stake ZMBE to earn Zombie & NFT rewards.
          </InfoCardSubHeader>
        </InfoCardHeader>
        <InfoCardContent>
          <InfoCardSubtitle>
            Total Value Locked
          </InfoCardSubtitle>
          <InfoCardValue>
            {numeral(tvl).format('($ 0,0)')}
          </InfoCardValue>
          <InfoCardSubtitle>
            {pageTvl.page} TVL
          </InfoCardSubtitle>
          <InfoCardValue>
            {numeral(pageTvl.tvl).format('($ 0,0)')}
          </InfoCardValue>
          <InfoCardSubtitle>
            My Holdings
          </InfoCardSubtitle>
          <InfoCardValue>
            {numeral(myHoldings).format('($ 0,0)')}
          </InfoCardValue>
        </InfoCardContent>
      </InfoCard>
      <Shadow/>
    </>
  )
}

export default HeaderCard
