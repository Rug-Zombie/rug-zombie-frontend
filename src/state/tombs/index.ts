/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import tombsConfig from 'config/constants/tombs'
import { BigNumber } from 'bignumber.js'
import fetchTombs from './fetchTombs'
import {
  fetchTombUserEarnings,
  fetchTombUserInfo, fetchTombUserTokenInfo,
} from './fetchTombUser'
import { Tomb, TombsState } from '../types'
import { BIG_ZERO } from '../../utils/bigNumber'
import { getId } from '../../utils'

const noAccountTombConfig: Tomb[] = tombsConfig.map((tomb) => ({
  ...tomb,
  poolInfo: {
    allocPoint: BIG_ZERO,
    weight: BIG_ZERO,
    tokenAmount: BIG_ZERO,
    withdrawCooldown: BIG_ZERO,
    nftMintTime: BIG_ZERO,
  },
  userInfo: {
    tokenWithdrawalDate: BIG_ZERO,
    nftMintDate: BIG_ZERO,
    amount: BIG_ZERO,
    pendingZombie: BIG_ZERO,
    lpBalance: BIG_ZERO,
    lpAllowance: BIG_ZERO,
  },
}))

const initialState: TombsState = { data: noAccountTombConfig, userDataLoaded: false }

export const tombsSlice = createSlice({
  name: 'Tombs',
  initialState,
  reducers: {
    setTombPoolInfo: (state, action) => {
      const liveTombsData: Tomb[] = action.payload
      state.data = state.data.map((tomb) => {
        const liveTombData = liveTombsData.find((t) => getId(t.pid) === getId(tomb.pid))
        return { ...tomb, poolInfo: { ...tomb.poolInfo, ...liveTombData.poolInfo } }
      })
    },
    setTombUserInfo: (state, action) => {
      const { arrayOfUserDataObjects } = action.payload
      arrayOfUserDataObjects.forEach((userInfoEl) => {
        const { pid } = userInfoEl
        const index = state.data.findIndex((tomb) => getId(tomb.pid) === pid)
        state.data[index] = { ...state.data[index], userInfo: { ...state.data[index].userInfo, ...userInfoEl } }
      })
      state.userDataLoaded = true
    },
  },
})

// Actions
export const { setTombPoolInfo, setTombUserInfo } = tombsSlice.actions

// Thunks
export const fetchTombsPublicDataAsync = () => async (dispatch) => {
  const tombs = await fetchTombs(tombsConfig)
  dispatch(setTombPoolInfo(tombs))
}
export const fetchTombsUserDataAsync = (account: string) => async (dispatch) => {
  const userInfos = await fetchTombUserInfo(account, tombsConfig)
  const userTombEarnings = await fetchTombUserEarnings(account, tombsConfig)
  const userTombLpInfo = await fetchTombUserTokenInfo(account, tombsConfig)

  const arrayOfUserDataObjects = userInfos.map((userInfo, index) => {
    return {
      pid: getId(tombsConfig[index].pid),
      tokenWithdrawalDate: new BigNumber(userInfo.tokenWithdrawalDate._hex),
      nftMintDate: new BigNumber(userInfo.nftRevivalDate._hex),
      amount: new BigNumber(userInfo.amount._hex),
      pendingZombie: new BigNumber(userTombEarnings[index]),
      lpBalance: new BigNumber(userTombLpInfo[index].balance),
      lpAllowance: new BigNumber(userTombLpInfo[index].allowance),
    }
  })

  dispatch(setTombUserInfo({ arrayOfUserDataObjects }))
}

export default tombsSlice.reducer
