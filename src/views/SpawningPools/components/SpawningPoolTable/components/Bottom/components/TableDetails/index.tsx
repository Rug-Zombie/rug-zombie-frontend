import React from 'react'
import styled from 'styled-components'
import numeral from 'numeral'
import { useHistory } from 'react-router'
import { getAddress } from 'utils/addressHelpers'
import ContractLink from 'components/ContractLink'
import { getBalanceAmount, getFullDisplayBalance } from '../../../../../../../../utils/formatBalance'
import { SpawningPool } from '../../../../../../../../state/types'
import { formatDays, formatDuration, now } from '../../../../../../../../utils/timerHelpers'
import { useGetBnbPriceUsd, useGetNftById, useGetZombiePriceUsd } from '../../../../../../../../state/hooks'

export enum SpawningPoolItemType {
  Number,
  Money,
  Percentage,
  Duration,
}

interface TableDetailsProps {
  spawningPool: SpawningPool
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const NftImageContainer = styled.div`
  margin: 25px 0 0 0;
  position: relative;
  min-width: 150px;
  max-width: 150px;
  height: 150px;
  background: #0d1417;
  border-radius: 10px;
  
  &:hover {
    cursor: pointer;
  }
`

const NftImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  min-width: 150px;
  max-width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
`

const NftVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  min-width: 150px;
  max-width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
`

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 25px 10px 0 10px;
`

const SpawningPoolInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 10px;
`

const HeaderText = styled.p`
  text-align: left;
  font: normal normal normal 16px/30px Poppins;
  color: #ffffff;
`

const SubHeaderText = styled.p`
  text-align: left;
  font: normal normal normal 14px/21px Poppins;
  color: #6b7682;
`

const Text = styled.span`
  text-align: left;
  font: normal normal normal 14px/21px Poppins;
  color: #ffffff;
  white-space: nowrap;
`

const TableDetails: React.FC<TableDetailsProps> = ({ spawningPool }) => {
  const {
    address,
    nftId,
    endDate,
    poolInfo: { withdrawCooldown, nftMintTime, totalAmount, minimumStake, unlockFee },
  } = spawningPool
  const { name, path, type } = useGetNftById(nftId)
  const tvl = getBalanceAmount(totalAmount.times(useGetZombiePriceUsd()))
  const unlockFeeUsd = unlockFee.times(useGetBnbPriceUsd())
  const history = useHistory()
  const imageOnErrorHandler = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const source = event.target as HTMLImageElement
    source.onerror = null
    source.remove()
  }

  return (
    <Container>
      <NftImageContainer onClick={() => history.push(`/nfts/${nftId}`)}>
        {type === 'video' ? (
          <NftVideo autoPlay loop muted>
            <source src={path} type="video/webm" />
          </NftVideo>
        ) : (
          <NftImage src={path} onError={imageOnErrorHandler} />
        )}
      </NftImageContainer>
      <Details>
        <SpawningPoolInfo>
          <HeaderText>{name}</HeaderText>
          <SubHeaderText>
            Pool TVL: <Text>{numeral(tvl.toString()).format('$ (0.00 a)')}</Text>
          </SubHeaderText>
          <SubHeaderText>
            <ContractLink address={getAddress(address)} linkText="Pool Contract" />
          </SubHeaderText>
        </SpawningPoolInfo>
        <SpawningPoolInfo>
          <HeaderText>
            Unlock Fees: {getFullDisplayBalance(unlockFee)} BNB (~ ${getFullDisplayBalance(unlockFeeUsd, 18, 2)})
          </HeaderText>
          <SubHeaderText>
            Early Withdraw Fee: <Text>5%</Text>
          </SubHeaderText>
          <SubHeaderText>
            Withdrawal Cooldown: <Text>{formatDays(withdrawCooldown.toNumber())}</Text>
          </SubHeaderText>
          <SubHeaderText>
            NFT Minting Time: <Text>{formatDays(nftMintTime.toNumber())}</Text>
          </SubHeaderText>
          <SubHeaderText>
            Minimum Stake: <Text>{getBalanceAmount(minimumStake).toString()} ZMBE</Text>
          </SubHeaderText>
          <SubHeaderText>
            Rewards end: <Text>{formatDuration(endDate - now())}</Text>
          </SubHeaderText>
        </SpawningPoolInfo>
      </Details>
    </Container>
  )
}

export default TableDetails
