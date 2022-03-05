import { EventData } from 'web3-eth-contract'

import { BigNumber } from 'bignumber.js'
import { getDrFrankensteinContract } from '../../utils/contractHelpers'
import web3 from '../../utils/web3'
import { UserActivityType } from '../../config/constants/types'
import { UserActivity } from '../types'
import { range } from '../../utils'
import { invokeAfter, retry } from '../../utils/asyncHelpers'

// excludes 'Withdraw' due to overlap between harvest and withdraw activity types
const EVENT_NAME_TO_ACTIVITY_TYPE: Map<string, UserActivityType> = new Map([
  ['Deposit', UserActivityType.DrFDeposit],
  ['WithdrawEarly', UserActivityType.DrFWithdrawEarly],
  ['ReviveRug', UserActivityType.DrFMintNft],
])
const RELEVANT_EVENT_TYPES: Set<string> = new Set(['Deposit', 'Withdraw', 'WithdrawEarly', 'ReviveRug'])
const getActivityType = (event: EventData): UserActivityType => {
  const { event: eventName, returnValues } = event

  if (!RELEVANT_EVENT_TYPES.has(eventName)) {
    return -1
  }

  if (eventName === 'Withdraw') {
    return new BigNumber(returnValues.amount).isZero() ? UserActivityType.DrFHarvest : UserActivityType.DrFWithdraw
  }

  return EVENT_NAME_TO_ACTIVITY_TYPE.get(eventName)
}

const EVENT_USER_TOPIC_INDEX = 0
const isRelevantForUser = (account: string) => ({ event, returnValues }: EventData): boolean => {
  if (!RELEVANT_EVENT_TYPES.has(event)) {
    return false
  }

  const eventUser = returnValues[EVENT_USER_TOPIC_INDEX]
  return eventUser && eventUser.toLowerCase() === account.toLowerCase()
}

const MAX_BLOCK_QUERY_SIZE = 5000

const getRelevantEventsInInterval = (fromBlock: number, toBlock: number, userAddress: string): Promise<EventData[]> =>
  retry(() => getDrFrankensteinContract().getPastEvents('allEvents', { fromBlock, toBlock }), 3, 250).then((events) =>
    events.filter(isRelevantForUser(userAddress)),
  )

const getBlockTimestamp = async (blockNumber: number): Promise<number> => {
  const { timestamp: rawTimestamp } = await web3.eth.getBlock(blockNumber, false)
  return typeof rawTimestamp === 'string' ? parseInt(rawTimestamp) : rawTimestamp
}

const fetchDrFEvents = async (
  account: string,
  fromBlocksAgo: number = MAX_BLOCK_QUERY_SIZE * 5,
): Promise<UserActivity[]> => {
  const searchEndBlock = await web3.eth.getBlockNumber()
  const searchStartBlock = searchEndBlock - fromBlocksAgo

  const queries = range(0, fromBlocksAgo / MAX_BLOCK_QUERY_SIZE).map((i) => {
    const end = searchEndBlock - i * MAX_BLOCK_QUERY_SIZE
    return {
      fromBlock: Math.max(end - MAX_BLOCK_QUERY_SIZE, searchStartBlock),
      toBlock: end,
      delay: i * 100,
    }
  })

  const eventChunks: EventData[][] = await Promise.all(
    queries.map(({ fromBlock, toBlock, delay }) =>
      invokeAfter(() => getRelevantEventsInInterval(fromBlock, toBlock, account), delay),
    ),
  )

  const relevantEvents: EventData[] = eventChunks.flat()
  return Promise.all(
    relevantEvents.map(async (event) => {
      const { returnValues, blockNumber } = event
      const timestamp = await getBlockTimestamp(blockNumber)

      return {
        type: getActivityType(event),
        data: returnValues,
        timestamp,
      }
    }),
  )
}

export default fetchDrFEvents
