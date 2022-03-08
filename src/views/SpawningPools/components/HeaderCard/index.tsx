/* eslint-disable no-param-reassign */
import React from 'react'
import styled from 'styled-components'
import numeral from 'numeral'
import { useGetSpawningPools, useGetZombiePriceUsd } from '../../../../state/hooks'
import { getBalanceNumber } from '../../../../utils/formatBalance'
import { BIG_ZERO } from '../../../../utils/bigNumber'

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
  background-color: #30c00d;
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

const HeaderCard: React.FC = () => {
  const spawningPoolSum = useGetSpawningPools().data.reduce(
    (sum, { poolInfo: { totalAmount }, userInfo: { amount } }) => {
      return {
        amount: sum.amount.plus(amount),
        totalAmount: sum.totalAmount.plus(totalAmount),
      }
    },
    { amount: BIG_ZERO, totalAmount: BIG_ZERO },
  )

  const zombiePriceUsd = useGetZombiePriceUsd()
  const spawningPoolsTvl = getBalanceNumber(spawningPoolSum.totalAmount) * zombiePriceUsd
  const userTvl = getBalanceNumber(spawningPoolSum.amount) * zombiePriceUsd

  return (
    <>
      <InfoCard>
        <HalfLine />
        <InfoCardHeader>
          <InfoCardTitle>SpawningPools</InfoCardTitle>
          <InfoCardSubHeader>Stake your ZMBE to earn NFTs and rewards in partnered project tokens.</InfoCardSubHeader>
        </InfoCardHeader>
        <InfoCardContent>
          <InfoCardSubtitle>Spawning Pools TVL</InfoCardSubtitle>
          <InfoCardValue>{numeral(spawningPoolsTvl).format('($ 0,0)')}</InfoCardValue>
          <InfoCardSubtitle>My Holdings</InfoCardSubtitle>
          <InfoCardValue>{numeral(userTvl).format('($ 0,0)')}</InfoCardValue>
        </InfoCardContent>
      </InfoCard>
      <Shadow />
    </>
  )
}

export default HeaderCard
