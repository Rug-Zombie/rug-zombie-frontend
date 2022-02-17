import { BigNumber } from 'bignumber.js'
import { getDrFrankensteinContract } from '../../utils/contractHelpers'
import web3 from '../../utils/web3'
import { UserActivity } from '../types'
import { UserActivityType } from '../../config/constants/types'

const getEventType = (event) => {
  switch (event.event) {
    case('Deposit'):
      return UserActivityType.DrFDeposit
    case('Withdraw'):
      if (new BigNumber(event.returnValues.amount).isZero()) {
        return UserActivityType.DrFHarvest
      }
      return UserActivityType.DrFWithdraw
    case 'WithdrawEarly':
      return UserActivityType.DrFWithdrawEarly
    case 'ReviveRug':
      return UserActivityType.DrFMintNft
    default:
      return -1
  }
}

// eslint-disable-next-line import/prefer-default-export
export const fetchDrFEvents = async (account: string, toBlock?: number) => {
  const drFrankenstein = getDrFrankensteinContract()
  const currentBlock = toBlock || await web3.eth.getBlockNumber()

  const depositsPromise = drFrankenstein.getPastEvents('Deposit', {
    fromBlock: currentBlock - 5000,
    toBlock: currentBlock,
    filter: { user: account },
  })

  const withdrawalsPromise = drFrankenstein.getPastEvents('Withdraw', {
    fromBlock: currentBlock - 5000,
    toBlock: currentBlock,
    filter: { user: account },
  })

  const withdrawEarlysPromise = drFrankenstein.getPastEvents('WithdrawEarly', {
    fromBlock: currentBlock - 5000,
    toBlock: currentBlock,
    filter: { user: account },
  })

  const emergencyWithdrawalsPromise = drFrankenstein.getPastEvents('WithdrawEarly', {
    fromBlock: currentBlock - 5000,
    toBlock: currentBlock,
    filter: { user: account },
  })

  const nftMintsPromise = drFrankenstein.getPastEvents('ReviveRug', {
    fromBlock: currentBlock - 5000,
    toBlock: currentBlock,
    filter: { to: account },
  })

  const [
    deposits,
    withdrawals,
    withdrawEarlys,
    emergencyWithdrawals,
    nftMints,
  ] = await Promise.all([
    depositsPromise,
    withdrawalsPromise,
    withdrawEarlysPromise,
    emergencyWithdrawalsPromise,
    nftMintsPromise
  ])

  const events: UserActivity[] = await Promise.all(deposits.concat(withdrawals, withdrawEarlys, emergencyWithdrawals, nftMints).map(async (event) => {
    let { timestamp } = (await web3.eth.getBlock(event.blockNumber))
    if (typeof timestamp === 'string') {
      timestamp = parseInt(timestamp)
    }
    return {
      type: getEventType(event),
      data: event.returnValues,
      timestamp,
    }
  }))

  return events
}

