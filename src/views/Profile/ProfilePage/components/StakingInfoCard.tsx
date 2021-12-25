import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { fetchUserActivityAsync } from '../../../../state/userActivites'
import { useAppDispatch } from '../../../../state'
import { useGetGraves, useGetSpawningPools, useGetTombs } from '../../../../state/hooks'
import '../../Profile.Styles.css'
import { BIG_ZERO } from '../../../../utils/bigNumber'
import { fetchGravesUserDataAsync } from '../../../../state/graves'
import { getBalanceNumber, getFullDisplayBalance } from '../../../../utils/formatBalance'
import { bnbPriceUsd, zombiePriceUsd } from '../../../../redux/get'
import { now } from '../../../../utils/timerHelpers'
import { fetchSpawningPoolsPublicDataAsync, fetchSpawningPoolsUserDataAsync } from '../../../../state/spawningPools'
import { fetchTombsPublicDataAsync, fetchTombsUserDataAsync } from '../../../../state/tombs'

const Container = styled.div`
  width: 100%;
  padding-right: 10px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Card = styled.div`
  width: 100%;
  height: 450px;
  background-color: #151E21;
  border-radius: 10px;
  //border: 2px solid #30C00D;
  opacity: 1;
  display: flex;
  flex-direction: column;
  padding-top: 15px;
  padding-left: 25px;
`

const CardTitle = styled.text`
  text-align: left;
  font: normal normal normal 20px/36px Poppins;
  letter-spacing: 0px;
  color: #FFFFFF;
  font-weight: bolder;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-right: 20px;
`

const SubTitle = styled.text`
  text-align: left;
  font: normal normal normal 16px/36px Poppins;
  letter-spacing: 0px;
  color: #6B7682;
`

const Value = styled.text`
  font: normal normal normal 24px/36px Poppins;
  letter-spacing: 0px;
  color: #FFFFFF;
`

const ClaimButton = styled.button`
  width: 130px;
  min-height: 50px;
  border: 2px solid #30C00D;
  border-radius: 20px;
  background: none;
`

const ButtonText = styled.text`
  text-align: center;
  font: normal normal medium 16px/25px Poppins;
  letter-spacing: 0px;
  color: #FFFFFF;
  opacity: 1;`

const InnerCardDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 30px;
  margin-bottom: 30px;
  height: 100%;
`

const Shadow = styled.div`
  width: 100%;
  height: 40px;
  background: #000000 0% 0% no-repeat padding-box;
  border-radius: 10px;
  opacity: 0.5;
  filter: blur(10px);
  position: relative;
  bottom: 20px;
  margin-bottom: -15px;
  z-index: -1;
`

const ProfilePage: React.FC = () => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (account) {
      dispatch(fetchUserActivityAsync(account))
    }
  }, [account, dispatch])

  useEffect(() => {
    if (account) {
      dispatch(fetchGravesUserDataAsync(account))
    }
  }, [account, dispatch])

  useEffect(() => {
    dispatch(fetchSpawningPoolsPublicDataAsync())
    if (account) {
      dispatch(fetchSpawningPoolsUserDataAsync(account))
    }
  }, [account, dispatch])

  useEffect(() => {
    dispatch(fetchTombsPublicDataAsync())
    if (account) {
      dispatch(fetchTombsUserDataAsync(account))
    }
  }, [account, dispatch])

  const graveSum = useGetGraves().data.reduce((sum, { userInfo: { amount, pendingZombie, nftMintDate } }) => {
    return {
      amount: sum.amount.plus(amount),
      pending: sum.pending.plus(pendingZombie),
      nfts: nftMintDate.lte(now()) && amount.gt(0) ? sum.nfts + 1 : sum.nfts,
    }
  }, { amount: BIG_ZERO, pending: BIG_ZERO, nfts: 0 })


  const spawningPoolSum = useGetSpawningPools().data.reduce((sum, {
    rewardToken,
    poolInfo: { rewardTokenPriceBnb },
    userInfo: { amount, pendingReward, nftMintDate },
  }) => {
    const rewardTokenPrice = rewardTokenPriceBnb.times(bnbPriceUsd()).toNumber()
    return {
      amount: sum.amount.plus(amount),
      pendingValueUsd: sum.pendingValueUsd + getBalanceNumber(pendingReward.times(rewardTokenPrice), rewardToken.decimals),
      nfts: nftMintDate.lte(now()) && amount.gt(0) ? sum.nfts + 1 : sum.nfts,
    }
  }, { amount: BIG_ZERO, pendingValueUsd: 0, nfts: 0 })

  const tombSum = useGetTombs().data.reduce((sum, {
    poolInfo: { lpPriceBnb },
    userInfo: { amount, pendingZombie, nftMintTime },
  }) => {
    const lpPrice = lpPriceBnb.times(bnbPriceUsd()).toNumber()
    return {
      amount: sum.amount.plus(amount),
      amountValueUsd: sum.amountValueUsd + getBalanceNumber(amount.times(lpPrice)),
      pending: sum.pending.plus(pendingZombie),
      nfts: nftMintTime.isZero() ? sum.nfts + 1 : sum.nfts,
    }
  }, { amount: BIG_ZERO, amountValueUsd: 0, pending: BIG_ZERO, nfts: 0 })

  return (
    <Container>
      <Card>
        <CardTitle style={{ fontWeight: 'normal' }}>
          Staking Info
        </CardTitle>
        <div style={{ paddingBottom: '35px' }} />
        <InnerCardDiv className='scroll'>
          <CardTitle>
            Graves
          </CardTitle>
          <Row>
            <SubTitle>
              Staked
            </SubTitle>
            <SubTitle>
              Pending Rewards
            </SubTitle>
          </Row>
          <Row>
            <Value>
              {getFullDisplayBalance(graveSum.amount, 18, 2)} ZMBE
            </Value>
            <Value>
              {getFullDisplayBalance(graveSum.pending, 18, 2)} ZMBE
            </Value>
          </Row>
          <Row>
            <SubTitle>
              ${getFullDisplayBalance(graveSum.amount.times(zombiePriceUsd()), 18, 2)}
            </SubTitle>
            <SubTitle>
              {graveSum.nfts} {graveSum.nfts === 1 ? 'NFT' : 'NFTS'} Ready
            </SubTitle>
          </Row>
          <ClaimButton>
            <ButtonText>
              Claim All
            </ButtonText>
          </ClaimButton>
          <div style={{ paddingBottom: '35px' }} />
          <CardTitle>
            Tombs
          </CardTitle>
          <Row>
            <SubTitle>
              Staked
            </SubTitle>
            <SubTitle>
              Pending Rewards
            </SubTitle>
          </Row>
          <Row>
            <Value>
              {getFullDisplayBalance(tombSum.amount, 18, 2)} LP
            </Value>
            <Value>
              {getFullDisplayBalance(tombSum.pending, 18, 2)} ZMBE
            </Value>
          </Row>
          <Row>
            <SubTitle>
              ${tombSum.amountValueUsd.toFixed(2)}
            </SubTitle>
            <SubTitle>
              {tombSum.nfts} {tombSum.nfts === 1 ? 'NFT' : 'NFTS'} Ready
            </SubTitle>
          </Row>
          <ClaimButton>
            <ButtonText>
              Claim All
            </ButtonText>
          </ClaimButton>
          <div style={{ paddingBottom: '35px' }} />
          <CardTitle>
            Spawning Pools
          </CardTitle>
          <Row>
            <SubTitle>
              Staked
            </SubTitle>
            <SubTitle>
              Pending Rewards
            </SubTitle>
          </Row>
          <Row>
            <Value>
              {getFullDisplayBalance(spawningPoolSum.amount, 18, 2)} ZMBE
            </Value>
            <Value>
              ${spawningPoolSum.pendingValueUsd.toFixed(2)}
            </Value>
          </Row>
          <Row>
            <SubTitle>
              ${getFullDisplayBalance(spawningPoolSum.amount.times(zombiePriceUsd()), 18, 2)}
            </SubTitle>
            <SubTitle>
              {spawningPoolSum.nfts} {spawningPoolSum.nfts === 1 ? 'NFT' : 'NFTS'} Ready
            </SubTitle>
          </Row>
          <ClaimButton>
            <ButtonText>
              Claim All
            </ButtonText>
          </ClaimButton>
        </InnerCardDiv>
      </Card>
      <Shadow/>
    </Container>
  )
}

export default ProfilePage
