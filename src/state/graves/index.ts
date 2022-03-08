/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import gravesConfig from 'config/constants/graves'
import { BigNumber } from 'bignumber.js'
import fetchGraves from './fetchGraves'
import { fetchGraveUserEarnings, fetchGraveUserInfo, fetchGraveUserTokenInfo } from './fetchGraveUser'
import { GravesState, Grave } from '../types'
import { BIG_ZERO } from '../../utils/bigNumber'
import { getId } from '../../utils'
import { ZERO_ADDRESS } from '../../config'

const noAccountGraveConfig: Grave[] = gravesConfig.map((grave) => ({
  ...grave,
  poolInfo: {
    lpToken: ZERO_ADDRESS,
    allocPoint: BIG_ZERO,
    weight: BIG_ZERO,
    unlockFee: BIG_ZERO,
    minimumStake: BIG_ZERO,
    tokenAmount: BIG_ZERO,
    withdrawCooldown: BIG_ZERO,
    nftMintTime: BIG_ZERO,
  },
  userInfo: {
    paidUnlockFee: false,
    rugDeposited: BIG_ZERO,
    rugAllowance: BIG_ZERO,
    rugBalance: BIG_ZERO,
    zombieAllowance: BIG_ZERO,
    zombieBalance: BIG_ZERO,
    tokenWithdrawalDate: BIG_ZERO,
    nftMintDate: BIG_ZERO,
    amount: BIG_ZERO,
    pendingZombie: BIG_ZERO,
  },
}))

const initialState: GravesState = { data: noAccountGraveConfig, userDataLoaded: false }

export const gravesSlice = createSlice({
  name: 'Graves',
  initialState,
  reducers: {
    setGravePoolInfo: (state, action) => {
      const liveGravesData: Grave[] = action.payload
      state.data = state.data.map((grave) => {
        const liveGraveData = liveGravesData.find((g) => getId(g.pid) === getId(grave.pid))
        return { ...grave, poolInfo: { ...grave.poolInfo, ...liveGraveData.poolInfo } }
      })
    },
    setGraveUserInfo: (state, action) => {
      const { arrayOfUserDataObjects } = action.payload
      arrayOfUserDataObjects.forEach((userInfoEl) => {
        const { pid } = userInfoEl
        const index = state.data.findIndex((grave) => getId(grave.pid) === pid)
        state.data[index] = { ...state.data[index], userInfo: { ...state.data[index].userInfo, ...userInfoEl } }
      })
      state.userDataLoaded = true
    },
  },
})

// Actions
export const { setGravePoolInfo, setGraveUserInfo } = gravesSlice.actions

// Thunks
export const fetchGravesPublicDataAsync = () => async (dispatch) => {
  const graves = await fetchGraves(gravesConfig)
  dispatch(setGravePoolInfo(graves))
}
export const fetchGravesUserDataAsync = (account: string) => async (dispatch) => {
  const userInfos = await fetchGraveUserInfo(account, gravesConfig)
  const userGraveEarnings = await fetchGraveUserEarnings(account, gravesConfig)
  const userGraveRugInfo = await fetchGraveUserTokenInfo(account, gravesConfig)

  const arrayOfUserDataObjects = userInfos.map((userInfo, index) => {
    return {
      pid: getId(gravesConfig[index].pid),
      paidUnlockFee: userInfo.paidUnlockFee,
      rugDeposited: new BigNumber(userInfo.rugDeposited._hex),
      tokenWithdrawalDate: new BigNumber(userInfo.tokenWithdrawalDate._hex),
      nftMintDate: new BigNumber(userInfo.nftRevivalDate._hex),
      amount: new BigNumber(userInfo.amount._hex),
      pendingZombie: new BigNumber(userGraveEarnings[index]),
      rugAllowance: new BigNumber(userGraveRugInfo[index].allowance),
      rugBalance: new BigNumber(userGraveRugInfo[index].balance),
      zombieAllowance: new BigNumber(userGraveRugInfo[index].zombieAllowance),
      zombieBalance: new BigNumber(userGraveRugInfo[index].zombieBalance),
    }
  })

  dispatch(setGraveUserInfo({ arrayOfUserDataObjects }))
}

export default gravesSlice.reducer
