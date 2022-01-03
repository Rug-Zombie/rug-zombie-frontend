/* eslint-disable no-param-reassign */
import React from 'react'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import numeral from 'numeral'

const InfoCard = styled.div`
  width: 280px;
  height: 500px;
  background: #151E21 0% 0% no-repeat padding-box;
  border-radius: 20px;
`

const InfoCardFlex = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const HalfLine = styled.div`
  width: 220px;
  height: 5px;
  background: #AE32AA 0% 0% no-repeat padding-box;
  border-radius: 0px 0px 5px 5px;
  margin-left: auto;
  margin-right: auto;
`

const InfoCardTitle = styled.div`
  text-align: left;
  font: normal normal 500 1.6rem Poppins;
  letter-spacing: 0.5px;
  color: #FFFFFF;
  padding-top: 25px;
`
const InfoCardTextFlex = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
`

const InfoCardDescription = styled.text`
  width: 100%;
  text-align: left;
  font: normal normal normal 16px/30px Poppins;
  letter-spacing: 0px;
  color: #6B7682;
`

const InfoCardLink = styled.text`
  text-align: left;
  text-decoration: underline;
  font: normal normal normal 16px/30px Poppins;
  letter-spacing: 0px;
  color: #AE32AA;
`

const InfoCardSubtitle = styled.text`
  text-align: left;
  font: normal normal normal 12px/30px Poppins;
  letter-spacing: 0px;
  color: #6B7682;
  padding-top: 29px;
`

const InfoCardValue = styled.text`
  text-align: left;
  font: normal normal normal 30px/36px Poppins;
  letter-spacing: 0px;
  color: #FFFFFF;
  opacity: 1;
`

interface HeaderCardProps {
  tvl: number;
  pageTvl: { page: string, tvl: number };
  myHoldings: number;
}

const HeaderCard: React.FC<HeaderCardProps> = ({ tvl, pageTvl, myHoldings }) => {
  const { account } = useWeb3React()

  return (
    <InfoCard>
      <InfoCardFlex>
        <HalfLine />
        <InfoCardTextFlex>
          <InfoCardTitle>
            Graves
          </InfoCardTitle>
          <InfoCardDescription>
            Use your dead tokens to unlock graves then stake ZMBE to earn Zombie & NFT rewards.
          </InfoCardDescription>
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
        </InfoCardTextFlex>
      </InfoCardFlex>
    </InfoCard>

  )
}

export default HeaderCard
