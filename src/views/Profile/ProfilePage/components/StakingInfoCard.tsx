import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from '../../../../state'
import {
  useGetBnbPriceUsd,
  useGetGraves,
  useGetSpawningPools,
  useGetTombs,
  useGetZombiePriceUsd,
} from '../../../../state/hooks'
import '../../Profile.Styles.css'
import { BIG_ZERO } from '../../../../utils/bigNumber'
import { fetchGravesUserDataAsync } from '../../../../state/graves'
import { getBalanceNumber, getFullDisplayBalance } from '../../../../utils/formatBalance'
import { now } from '../../../../utils/timerHelpers'
import { fetchSpawningPoolsPublicDataAsync, fetchSpawningPoolsUserDataAsync } from '../../../../state/spawningPools'
import { fetchTombsPublicDataAsync, fetchTombsUserDataAsync } from '../../../../state/tombs'
import { getId } from '../../../../utils'
import { useDrFrankenstein } from '../../../../hooks/useContract'
import { getAddress } from '../../../../utils/addressHelpers'
import { getSpawningPoolContract } from '../../../../utils/contractHelpers'
import useWeb3 from '../../../../hooks/useWeb3'

const Card = styled.div`
  min-width: 317px;
  max-width: 630px;
  width: 100%;
  height: 450px;
  background-color: #151e21;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 15px 25px;
  margin: 25px;
  box-shadow: 0 20px 20px -20px #000000;
`

const CardTitle = styled.p`
  text-align: left;
  font: normal normal normal 20px/36px Poppins;
  letter-spacing: 0px;
  color: #ffffff;
  font-weight: bolder;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-right: 20px;
`

const SubTitle = styled.p`
  text-align: left;
  font: normal normal normal 16px/36px Poppins;
  letter-spacing: 0px;
  color: #6b7682;
`

const Value = styled.p`
  font: normal normal normal 24px/36px Poppins;
  letter-spacing: 0px;
  color: #ffffff;
`

const ClaimButton = styled.button`
  width: 130px;
  min-height: 50px;
  border: 2px solid #30c00d;
  border-radius: 20px;
  background: none;
  &:hover {
    cursor: pointer;
  }
`

const ButtonText = styled.div`
  text-align: center;
  font: normal normal medium 16px/25px Poppins;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
`

const InnerCardDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const ProfilePage: React.FC = () => {
  const { account } = useWeb3React()
  const web3 = useWeb3()
  const dispatch = useAppDispatch()

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

  const stakedGraveIds = []
  const stakedTombIds = []
  const stakedSpawningPoolAddresses = []

  const graveSum = useGetGraves().data.reduce(
    (sum, { pid, userInfo: { amount, pendingZombie, nftMintDate } }) => {
      if (amount.gt(0)) {
        stakedGraveIds.push(getId(pid))
      }

      return {
        amount: sum.amount.plus(amount),
        pending: sum.pending.plus(pendingZombie),
        nfts: nftMintDate.lte(now()) && amount.gt(0) ? sum.nfts + 1 : sum.nfts,
      }
    },
    { amount: BIG_ZERO, pending: BIG_ZERO, nfts: 0 },
  )

  const bnbPriceUsd = useGetBnbPriceUsd()
  const spawningPoolSum = useGetSpawningPools().data.reduce(
    (
      sum,
      {
        address,
        rewardToken,
        unknownPrice,
        poolInfo: { rewardTokenPriceBnb },
        userInfo: { amount, pendingReward, nftMintDate },
      },
    ) => {
      if (amount.gt(0)) {
        stakedSpawningPoolAddresses.push(getAddress(address))
      }
      const rewardTokenPrice = rewardTokenPriceBnb.times(bnbPriceUsd).toNumber()
      return {
        amount: sum.amount.plus(amount),
        pendingValueUsd: unknownPrice
          ? sum.pendingValueUsd
          : sum.pendingValueUsd + getBalanceNumber(pendingReward.times(rewardTokenPrice), rewardToken.decimals),
        nfts: nftMintDate.lte(now()) && amount.gt(0) ? sum.nfts + 1 : sum.nfts,
      }
    },
    { amount: BIG_ZERO, pendingValueUsd: 0, nfts: 0 },
  )

  const tombSum = useGetTombs().data.reduce(
    (sum, { pid, poolInfo: { lpPriceBnb }, userInfo: { amount, pendingZombie, nftMintTime } }) => {
      if (amount.gt(0)) {
        stakedTombIds.push(getId(pid))
      }
      const lpPrice = lpPriceBnb.times(bnbPriceUsd).toNumber()
      return {
        amount: sum.amount.plus(amount),
        amountValueUsd: sum.amountValueUsd + getBalanceNumber(amount.times(lpPrice)),
        pending: sum.pending.plus(pendingZombie),
        nfts: nftMintTime.isZero() ? sum.nfts + 1 : sum.nfts,
      }
    },
    { amount: BIG_ZERO, amountValueUsd: 0, pending: BIG_ZERO, nfts: 0 },
  )

  const drFrankenstein = useDrFrankenstein()
  const claimGraves = async () => {
    return Promise.all(stakedGraveIds.map((id) => drFrankenstein.methods.withdraw(id, 0).send({ from: account })))
  }

  const claimTombs = async () => {
    return Promise.all(stakedTombIds.map((id) => drFrankenstein.methods.withdraw(id, 0).send({ from: account })))
  }

  const claimSpwaningPools = async () => {
    return Promise.all(
      stakedSpawningPoolAddresses.map((address) =>
        getSpawningPoolContract(address, web3).methods.withdraw(0).send({ from: account }),
      ),
    )
  }

  const zombiePriceUsd = useGetZombiePriceUsd()
  return (
    <Card>
      <CardTitle style={{ fontWeight: 'normal' }}>Staking Info</CardTitle>
      <div style={{ paddingBottom: '35px' }} />
      <InnerCardDiv className="scroll">
        <CardTitle>Graves</CardTitle>
        <Row>
          <SubTitle>Staked</SubTitle>
          <SubTitle>Pending Rewards</SubTitle>
        </Row>
        <Row>
          <Value>{getFullDisplayBalance(graveSum.amount, 18, 2)} ZMBE</Value>
          <Value>{getFullDisplayBalance(graveSum.pending, 18, 2)} ZMBE</Value>
        </Row>
        <Row>
          <SubTitle>${getFullDisplayBalance(graveSum.amount.times(zombiePriceUsd), 18, 2)}</SubTitle>
          <SubTitle>${getFullDisplayBalance(graveSum.pending.times(zombiePriceUsd), 18, 2)}</SubTitle>
        </Row>
        <Row>
          <ClaimButton onClick={claimGraves}>
            <ButtonText>Claim All</ButtonText>
          </ClaimButton>
          <SubTitle>
            {graveSum.nfts} {graveSum.nfts === 1 ? 'NFT' : 'NFTS'} Ready
          </SubTitle>
        </Row>

        <div style={{ paddingBottom: '35px' }} />
        <CardTitle>Tombs</CardTitle>
        <Row>
          <SubTitle>Staked</SubTitle>
          <SubTitle>Pending Rewards</SubTitle>
        </Row>
        <Row>
          <Value>{getFullDisplayBalance(tombSum.amount, 18, 2)} LP</Value>
          <Value>{getFullDisplayBalance(tombSum.pending, 18, 2)} ZMBE</Value>
        </Row>
        <Row>
          <SubTitle>${tombSum.amountValueUsd.toFixed(2)}</SubTitle>
          <SubTitle>${getFullDisplayBalance(tombSum.pending.times(zombiePriceUsd), 18, 2)}</SubTitle>
        </Row>
        <Row>
          <ClaimButton onClick={claimTombs}>
            <ButtonText>Claim All</ButtonText>
          </ClaimButton>
          <SubTitle>
            {tombSum.nfts} {tombSum.nfts === 1 ? 'NFT' : 'NFTS'} Ready
          </SubTitle>
        </Row>

        <div style={{ paddingBottom: '35px' }} />
        <CardTitle>Spawning Pools</CardTitle>
        <Row>
          <SubTitle>Staked</SubTitle>
          <SubTitle>Pending Rewards</SubTitle>
        </Row>
        <Row>
          <Value>{getFullDisplayBalance(spawningPoolSum.amount, 18, 2)} ZMBE</Value>
          <Value>${spawningPoolSum.pendingValueUsd.toFixed(2)}</Value>
        </Row>
        <Row>
          <SubTitle>${getFullDisplayBalance(spawningPoolSum.amount.times(zombiePriceUsd), 18, 2)}</SubTitle>
          <SubTitle>
            {spawningPoolSum.nfts} {spawningPoolSum.nfts === 1 ? 'NFT' : 'NFTS'} Ready
          </SubTitle>
        </Row>
        <ClaimButton onClick={claimSpwaningPools}>
          <ButtonText>Claim All</ButtonText>
        </ClaimButton>
      </InnerCardDiv>
    </Card>
  )
}

export default ProfilePage
