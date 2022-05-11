/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { fetchWhalePool, fetchWhalePoolUser } from './fetchWhalePool'
import { WhalePool, WhalePoolState, WhalePoolInfo, WhalePoolUserInfo } from '../types'
import { BIG_ZERO } from '../../utils/bigNumber'
import { ZERO_ADDRESS } from '../../config'
import { contracts } from "../../config/constants";

const WHALE_POOL_NFT = 39

const noAccountWhalePoolConfig: WhalePool = {
  address: contracts.whalePool,
  nftId: WHALE_POOL_NFT,
  rewardNftIds: [95, 47, 75, 76, 80],
  poolInfo: {
    mintingFeeBnb: BIG_ZERO,
    totalStakers: 0,
    mintingTime: BIG_ZERO
  },
  userInfo: {
    stakedNft: ZERO_ADDRESS,
    stakedId: BIG_ZERO,
    nftMintTime: BIG_ZERO,
    isStaked: false,
    isMinting: false,
    hasRandom: false,
    randomNumber: BIG_ZERO
  }
}

const initialState: WhalePoolState = { data: noAccountWhalePoolConfig, userDataLoaded: false }

export const whalePoolSlice = createSlice({
  name: 'WhalePool',
  initialState,
  reducers: {
    setWhalePoolInfo: (state, action) => {
      const livePoolInfo: WhalePoolInfo = action.payload
      state.data = { ...state.data, poolInfo: livePoolInfo }
    },
    setWhalePoolUserInfo: (state, action) => {
      const liveUserInfo: WhalePoolUserInfo = action.payload
      state.data = { ...state.data, userInfo: liveUserInfo }
      state.userDataLoaded = true
    },
  },
})

// Actions
export const { setWhalePoolInfo, setWhalePoolUserInfo } = whalePoolSlice.actions

// Thunks
export const fetchWhalePoolPublicDataAsync = () => async (dispatch) => {
  const poolInfo = await fetchWhalePool()
  dispatch(setWhalePoolInfo(poolInfo))
}

export const fetchWhalePoolUserDataAsync = (account: string) => async (dispatch) => {
  const userInfo = await fetchWhalePoolUser(account)
  dispatch(setWhalePoolUserInfo(userInfo))
}

export default whalePoolSlice.reducer
