/* eslint-disable no-param-reassign */
import React from 'react'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import numeral from 'numeral'
import { useGetTombs } from '../../../../state/hooks'
import { bnbPriceUsd } from '../../../../redux/get'
import { getBalanceNumber } from '../../../../utils/formatBalance'
import { BIG_ZERO } from '../../../../utils/bigNumber'

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
  background-color: #4B7BDC;
`

const InfoCardTitle = styled.h3`
  text-align: left;
  font: normal normal 500 1.6rem Poppins;
  letter-spacing: 0.5px;
  color: #FFFFFF;
  width: 100%;
  padding: 0 10px;
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

const HeaderCard: React.FC = () => {
  const tombSum = useGetTombs().data.reduce((sum, {
    poolInfo: { tokenAmount, lpPriceBnb },
    userInfo: { amount},
  }) => {
    const lpPrice = lpPriceBnb.times(bnbPriceUsd()).toNumber()
    return {
      amountTvl: sum.amountTvl.plus(getBalanceNumber(amount.times(lpPrice))),
      tokenAmountTvl: sum.tokenAmountTvl.plus(getBalanceNumber(tokenAmount.times(lpPrice))),
    }
  }, { amountTvl: BIG_ZERO, tokenAmountTvl: BIG_ZERO })

  return (
    <>
      <InfoCard>
        <HalfLine />
        <InfoCardHeader>
          <InfoCardTitle>
            Tombs
          </InfoCardTitle>
          <InfoCardSubHeader>
            Provide liquidity to roll for various NFTs. Increase your stake in the tombs to increase your chance at rolling rare NFTs.
          </InfoCardSubHeader>
        </InfoCardHeader>
        <InfoCardContent>
          <InfoCardSubtitle>
            Tombs TVL
          </InfoCardSubtitle>
          <InfoCardValue>
            {numeral(tombSum.tokenAmountTvl).format('($ 0,0)')}
          </InfoCardValue>
          <InfoCardSubtitle>
            My Holdings
          </InfoCardSubtitle>
          <InfoCardValue>
            {numeral(tombSum.amountTvl).format('($ 0,0)')}
          </InfoCardValue>
        </InfoCardContent>
      </InfoCard>
      <Shadow/>
    </>
  )
}

export default HeaderCard
