import React from 'react'
import { Flex, Text } from '@rug-zombie-libs/uikit'
import { BigNumber } from 'bignumber.js'
import { useGetZombieBnbLpPriceBnb } from '../../../../state/hooks'
import PositionTag from '../PositionTag'
import { UsdPriceRow, PrizePoolRow, RoundResultBox } from './styles'
import { auctionById } from '../../../../redux/get'
import { getBalanceAmount } from '../../../../utils/formatBalance'

interface RoundResultProps {
  bid: any
  id: number
  mb?: string
}

const RoundResult: React.FC<RoundResultProps> = ({ bid, id }) => {
  const { bidder } = bid
  const { length: bidderLength } = bidder
  const displayBidder = `${bidder.slice(0, 6)}...${bidder.slice(bidderLength - 4, bidderLength)}`
  const { version } = auctionById(id)
  const v3 = version === 'v3'

  const zombieBnbLpPriceBnb = useGetZombieBnbLpPriceBnb()

  return (
    <RoundResultBox betPosition={bid.amount}>
      <Text color="textSubtle" fontSize="12px" bold textTransform="uppercase" mb="8px">
        {`Bid by ${displayBidder}`}
      </Text>
      <Flex alignItems="center" justifyContent="space-between" mb="16px">
        <Text color="success" bold fontSize="24px">
          {Math.round(getBalanceAmount(bid.amount).toNumber() * 100) / 100}
        </Text>
        <PositionTag betPosition={bid.amount}>
          {Math.round(getBalanceAmount(new BigNumber(bid.amount - bid.previousBidAmount)).toNumber() * 100) / 100}{' '}
          {v3 ? 'BNB' : 'BT'}
        </PositionTag>
      </Flex>
      <UsdPriceRow bid={bid} id={id} />
      <PrizePoolRow
        totalAmount={getBalanceAmount(v3 ? bid.amount : zombieBnbLpPriceBnb.times(bid.amount)).toNumber()}
      />
    </RoundResultBox>
  )
}

export default RoundResult
