/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import gravesConfig from 'config/constants/graves'
import { BigNumber } from 'bignumber.js'
import fetchGraves from './fetchGraves'
import {
  fetchFarmUserEarnings,
  fetchFarmUserAllowances,
  fetchFarmUserTokenBalances,
  fetchFarmUserStakedBalances,
} from './fetchFarmUser'
import { Farm, GravesState, Grave } from '../types'
import { BIG_ZERO } from '../../utils/bigNumber'

const noAccountGraveConfig: Grave[] = gravesConfig.map((grave) => ({
  ...grave,
  userInfo: {
    paidUnlockFee: false,
    rugDeposited: BIG_ZERO,
    tokenWithdrawalDate: 0,
    nftMintDate: 0,
    amount: BIG_ZERO,
    pendingZombie: BIG_ZERO
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
        const liveGraveData = liveGravesData.find((g) => g.pid === grave.pid)

        return { ...grave, poolInfo: { ...grave.poolInfo, ...liveGraveData.poolInfo }  }
      })
    },
    setGraveUserInfo: (state, action) => {
      const { arrayOfUserDataObjects } = action.payload
      arrayOfUserDataObjects.forEach((userInfoEl) => {
        const { pid } = userInfoEl
        const index = state.data.findIndex((grave) => grave.pid === pid)
        state.data[index] = { ...state.data[index], userInfo: userInfoEl }
      })
      state.userDataLoaded = true
    },
  },
})

// Actions
export const { setGravePoolInfo, setGraveUserInfo } = gravesSlice.actions

// Thunks
export const fetchFarmsPublicDataAsync = () => async (dispatch, getState) => {
  const graves = await fetchGraves(gravesConfig)
  dispatch(setGravePoolInfo(graves))
}
export const fetchFarmUserDataAsync = (account: string) => async (dispatch, getState) => {
  const fetchArchived = getState().farms.loadArchivedFarmsData
  const farmsToFetch = fetchArchived ? farmsConfig : nonArchivedFarms
  const userFarmAllowances = await fetchFarmUserAllowances(account, farmsToFetch)
  const userFarmTokenBalances = await fetchFarmUserTokenBalances(account, farmsToFetch)
  const userStakedBalances = await fetchFarmUserStakedBalances(account, farmsToFetch)
  const userFarmEarnings = await fetchFarmUserEarnings(account, farmsToFetch)

  const arrayOfUserDataObjects = userFarmAllowances.map((farmAllowance, index) => {
    return {
      pid: farmsToFetch[index].pid,
      allowance: userFarmAllowances[index],
      tokenBalance: userFarmTokenBalances[index],
      stakedBalance: userStakedBalances[index],
      earnings: userFarmEarnings[index],
    }
  })

  dispatch(setFarmUserData({ arrayOfUserDataObjects }))
}

export default gravesSlice.reducer
