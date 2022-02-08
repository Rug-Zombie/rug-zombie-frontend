/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import spawningPoolsConfig from 'config/constants/spawningPools'
import { BigNumber } from 'bignumber.js'
import fetchSpawningPools from './fetchSpawningPools'
import {
  fetchSpawningPoolUserEarnings,
  fetchSpawningPoolUserInfo, fetchSpawningPoolUserTokenInfo,
} from './fetchSpawningPoolUser'
import { SpawningPool, SpawningPoolState } from '../types'
import { BIG_ZERO } from '../../utils/bigNumber'

const noAccountSpawningPoolConfig: SpawningPool[] = spawningPoolsConfig.map((spawningPool) => ({
  ...spawningPool,
  poolInfo: {
    rewardPerBlock: BIG_ZERO,
    unlockFee: BIG_ZERO,
    minimumStake: BIG_ZERO,
    totalAmount: BIG_ZERO,
    withdrawCooldown: BIG_ZERO,
    nftMintTime: BIG_ZERO,
    rewardTokenPriceBnb: BIG_ZERO,
  },
  userInfo: {
    paidUnlockFee: false,
    tokenWithdrawalDate: BIG_ZERO,
    nftMintDate: BIG_ZERO,
    amount: BIG_ZERO,
    pendingReward: BIG_ZERO,
    zombieAllowance: BIG_ZERO,
    zombieBalance: BIG_ZERO,
  },
}))

const initialState: SpawningPoolState = { data: noAccountSpawningPoolConfig, userDataLoaded: false }

export const spawningPoolsSlice = createSlice({
  name: 'SpawningPools',
  initialState,
  reducers: {
    setSpawningPoolInfo: (state, action) => {
      const liveSpawningPoolsData: SpawningPool[] = action.payload
      state.data = state.data.map((spawningPool) => {
        const liveSpawningPoolData = liveSpawningPoolsData.find(s => s.id === spawningPool.id)
        return { ...spawningPool, poolInfo: { ...spawningPool.poolInfo, ...liveSpawningPoolData.poolInfo }  }
      })
    },
    setSpawningPoolUserInfo: (state, action) => {
      const { arrayOfUserDataObjects } = action.payload
      arrayOfUserDataObjects.forEach((userInfoEl) => {
        const { id } = userInfoEl
        const index = state.data.findIndex((s) => s.id === id)
        state.data[index] = { ...state.data[index], userInfo: { ...state.data[index].userInfo, ...userInfoEl } }
      })
      state.userDataLoaded = true
    },
  },
})

// Actions
export const { setSpawningPoolInfo, setSpawningPoolUserInfo } = spawningPoolsSlice.actions

// Thunks
export const fetchSpawningPoolsPublicDataAsync = () => async (dispatch) => {
  const spawningPools = await fetchSpawningPools(spawningPoolsConfig)
  dispatch(setSpawningPoolInfo(spawningPools))
}
export const fetchSpawningPoolsUserDataAsync = (account: string) => async (dispatch) => {
  const userInfos = await fetchSpawningPoolUserInfo(account, spawningPoolsConfig)
  const userSpawningPoolRewards = await fetchSpawningPoolUserEarnings(account, spawningPoolsConfig)
  const userSpawningPoolTokenInfos = await fetchSpawningPoolUserTokenInfo(account, spawningPoolsConfig)
  const arrayOfUserDataObjects = userInfos.map((userInfo, index) => {
    return {
      id: spawningPoolsConfig[index].id,
      paidUnlockFee: userInfo.paidUnlockFee,
      tokenWithdrawalDate: new BigNumber(userInfo.tokenWithdrawalDate._hex),
      nftMintDate: new BigNumber(userInfo.nftRevivalDate._hex),
      amount: new BigNumber(userInfo.amount._hex),
      pendingReward: userSpawningPoolRewards[index],
      zombieAllowance: new BigNumber(userSpawningPoolTokenInfos[index].allowance),
      zombieBalance: new BigNumber(userSpawningPoolTokenInfos[index].balance),
    }
  })

  dispatch(setSpawningPoolUserInfo({ arrayOfUserDataObjects }))
}

export default spawningPoolsSlice.reducer
