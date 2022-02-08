import { BigNumber } from 'bignumber.js'
import * as actions from './actionTypes'
import {
  AuctionInfo, AuctionUserInfo, PoolInfo,
  SpawningPoolInfo,
  SpawningUserInfo,
  TombPoolInfo,
  TombUserInfo,
  UserInfo,
  TombOverlayPoolInfo, TombOverlayUserInfo, SharkPoolInfo, SharkPoolUserInfo,
  BurnGravePoolInfo, BurnGraveUserInfo, RugMarketListing,
} from './types'

export const updateAccount = (account: string) => ({
  type: actions.UPDATE_ACCOUNT,
  payload: {
    account,
  },
})

export const updateZombieAllowance = (allowance: BigNumber) => ({
  type: actions.UPDATE_ZOMBIE_ALLOWANCE,
  payload: {
    allowance,
  },
})

export const updateZombieTotalSupply = (totalSupply: BigNumber) => ({
  type: actions.UPDATE_ZOMBIE_TOTAL_SUPPLY,
  payload: {
    totalSupply,
  },
})

export const updateDrFrankensteinZombieBalance = (zombieBalance: BigNumber) => ({
  type: actions.UPDATE_DR_FRANKENSTEIN_ZOMBIE_BALANCE,
  payload: {
    zombieBalance,
  },
})

export const updateDrFrankensteinTotalAllocPoint = (totalAllocPoint: BigNumber) => ({
  type: actions.UPDATE_DR_FRANKENSTEIN_TOTAL_ALLOC_POINT,
  payload: {
    totalAllocPoint,
  },
})

export const updateZombieBalance = (balance: BigNumber) => ({
  type: actions.UPDATE_ZOMBIE_BALANCE,
  payload: {
    balance,
  },
})

export const updateZombiePriceBnb = (zombiePriceBnb: BigNumber) => ({
  type: actions.UPDATE_ZOMBIE_PRICE_BNB,
  payload: {
    zombiePriceBnb,
  },
})

export const updateBnbPriceUsd = (bnbPriceUsd: number) => ({
  type: actions.UPDATE_BNB_PRICE_USD,
  payload: {
    bnbPriceUsd,
  },
})

export const updateTombPoolInfo = (pid: number, poolInfo: TombPoolInfo) => ({ // todo add tomb result type restriction
  type: actions.UPDATE_TOMB_POOL_INFO,
  payload: {
    pid,
    poolInfo,
  },
})

export const updateTombUserInfo = (pid: number, userInfo: TombUserInfo) => ({ // todo add tomb result type restriction
  type: actions.UPDATE_TOMB_USER_INFO,
  payload: {
    pid,
    userInfo,
  },
})

export const updateGravePoolInfo = (pid: number, poolInfo: PoolInfo) => {
  return {
    type: actions.UPDATE_GRAVE_POOL_INFO,
    payload: {
      pid,
      poolInfo,
    },
  }
}

export const updateGraveUserInfo = (pid: number, userInfo: UserInfo) => ({
  type: actions.UPDATE_GRAVE_USER_INFO,
  payload: {
    pid,
    userInfo,
  },
})


export const updateSpawningPoolInfo = (id: number, poolInfo: SpawningPoolInfo) => ({
  type: actions.UPDATE_SPAWNING_POOL_INFO,
  payload: {
    id,
    poolInfo,
  },
})

export const updateSharkPoolInfo = (id: number, poolInfo: SharkPoolInfo) => ({
  type: actions.UPDATE_SHARKPOOL_INFO,
  payload: {
    id,
    poolInfo
  }
})

export const updateSpawningPoolUserInfo = (id: number, userInfo: SpawningUserInfo) => ({
  type: actions.UPDATE_SPAWNING_POOL_USER_INFO,
  payload: {
    id,
    userInfo,
  },
})

export const updateSharkPoolUserInfo = (id: number, userInfo: SharkPoolUserInfo) => ({
  type: actions.UPDATE_SHARKPOOL_USER_INFO,
  payload: {
    id,
    userInfo
  }
})

export const updateAuctionInfo = (id: number, auctionInfo: AuctionInfo) => ({
  type: actions.UPDATE_AUCTION_INFO,
  payload: {
    id,
    auctionInfo,
  },
})

export const updateAuctionUserInfo = (id: number, userInfo: AuctionUserInfo) => ({
  type: actions.UPDATE_AUCTION_USER_INFO,
  payload: {
    id,
    userInfo,
  },
})


export const updateBnbBalance = (bnbBalance: BigNumber) => ({
  type: actions.UPDATE_BNB_BALANCE,
  payload: {
    bnbBalance,
  },
})

export const updateTombOverlayPoolInfo = (pid: number, poolInfo: TombOverlayPoolInfo) => ({
  type: actions.UPDATE_TOMB_OVERLAY_POOL_INFO,
  payload: {
    pid,
    poolInfo
  }
})

export const updateTombOverlayUserInfo = (pid: number, userInfo: TombOverlayUserInfo) => ({
  type: actions.UPDATE_TOMB_OVERLAY_USER_INFO,
  payload: {
    pid,
    userInfo
  }
})

export const updateBurnGravePoolInfo = (id: number, poolInfo: BurnGravePoolInfo) => ({
  type: actions.UPDATE_BURNGRAVE_POOL_INFO,
  payload: {
    id,
    poolInfo
  }
})

export const updateBurnGraveUserInfo = (id: number, userInfo: BurnGraveUserInfo) => ({
  type: actions.UPDATE_BURNGRAVE_USER_INFO,
  payload: {
    id,
    userInfo
  }
})


export const addRugMarketListing = (listing: RugMarketListing) => ({
  type: actions.ADD_RUG_MARKET_LISTING,
  payload: {
    listing
  }
})

export const updateRugMarketListing = (listing: RugMarketListing) => ({
  type: actions.UPDATE_RUG_MARKET_LISTING,
  payload: {
    listing
  }
})

export const cancelRugMarketListing = (listingId: number) => ({
  type: actions.CANCEL_RUG_MARKET_LISTING,
  payload:  {
    listingId
  }
})

export const markRugMarketListingSold = (listingId: number) => ({
  type: actions.MARK_RUG_MARKET_LISTING_SOLD,
  payload:  {
    listingId
  }
})