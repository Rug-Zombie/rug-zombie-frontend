/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import tombsConfig from 'config/constants/tombs'
import { BigNumber } from 'bignumber.js'
import fetchTombs from './fetchTombs'
import { fetchTombUserEarnings, fetchTombUserInfo, fetchTombUserTokenInfo } from './fetchTombUser'
import { Tomb, TombsState } from '../types'
import { BIG_ZERO } from '../../utils/bigNumber'
import { getId } from '../../utils'
import fetchTombOverlayUserInfo from './fetchTombOverlayUser'
import fetchTombOverlays from './fetchTombOverlays'

const noAccountTombConfig: Tomb[] = tombsConfig.map((tomb) => ({
  ...tomb,
  poolInfo: {
    allocPoint: BIG_ZERO,
    weight: BIG_ZERO,
    tokenAmount: BIG_ZERO,
    withdrawCooldown: BIG_ZERO,
    nftMintTime: BIG_ZERO,
    mintingFee: BIG_ZERO,
    lpPriceBnb: BIG_ZERO,
  },
  userInfo: {
    tokenWithdrawalDate: BIG_ZERO,
    nftMintTime: BIG_ZERO,
    amount: BIG_ZERO,
    pendingZombie: BIG_ZERO,
    lpBalance: BIG_ZERO,
    lpAllowance: BIG_ZERO,
    randomNumber: BIG_ZERO,
    isMinting: false,
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
  const tombOverlays = await fetchTombOverlays(tombsConfig)
  const arrayOfTombDataObjects = tombs.map((tomb, index) => {
    return {
      ...tomb,
      poolInfo: {
        ...tomb.poolInfo,
        ...tombOverlays[index].poolInfo,
      },
    }
  })

  dispatch(setTombPoolInfo(arrayOfTombDataObjects))
}
export const fetchTombsUserDataAsync = (account: string) => async (dispatch) => {
  const userInfos = await fetchTombUserInfo(account, tombsConfig)
  const userTombEarnings = await fetchTombUserEarnings(account, tombsConfig)
  const userTombLpInfo = await fetchTombUserTokenInfo(account, tombsConfig)
  const userTombOverlayInfo = await fetchTombOverlayUserInfo(account, tombsConfig)

  const arrayOfUserDataObjects = userInfos.map((userInfo, index) => {
    return {
      pid: getId(tombsConfig[index].pid),
      tokenWithdrawalDate: new BigNumber(userInfo.tokenWithdrawalDate._hex),
      amount: new BigNumber(userInfo.amount._hex),
      pendingZombie: new BigNumber(userTombEarnings[index]),
      lpBalance: new BigNumber(userTombLpInfo[index].balance),
      lpAllowance: new BigNumber(userTombLpInfo[index].allowance),
      nextNftMintDate: new BigNumber(userTombOverlayInfo[index].nextNftMintDate),
      isMinting: userTombOverlayInfo[index].isMinting,
      randomNumber: new BigNumber(userTombOverlayInfo[index].randomNumber._hex),
      nftMintTime: new BigNumber(userTombOverlayInfo[index].nftMintTime),
    }
  })

  dispatch(setTombUserInfo({ arrayOfUserDataObjects }))
}

export default tombsSlice.reducer
