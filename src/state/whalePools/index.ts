/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import gravesConfig from 'config/constants/graves'
import { BigNumber } from 'bignumber.js'
import fetchWhalePool from './fetchWhalePool'
import { fetchGraveUserEarnings, fetchGraveUserInfo, fetchGraveUserTokenInfo } from './fetchGraveUser'
import { GravesState, Grave, WhalePool, WhalePoolState, WhalePoolInfo, WhalePoolUserInfo } from '../types'
import { BIG_ZERO } from '../../utils/bigNumber'
import { getId } from '../../utils'
import { ZERO_ADDRESS } from '../../config'
import { getWhalePoolAddress } from "../../utils/addressHelpers";
import { contracts } from "../../config/constants";

const WHALE_POOL_NFT = 39

const noAccountWhalePoolConfig: WhalePool = {
  address: contracts.whalePool,
  nftId: WHALE_POOL_NFT,
  poolInfo: {
    mintingFeeUSD: 0,
    isApproved: false,
    isStaked: false,
    isMintable: false,
    mintRequested: false,
    mintingTime: 0,
    mintOver: false,
    isNew: false,
    endDate: 0,
  },
  userInfo: {
    stakedNft: ZERO_ADDRESS,
    stakedId: BIG_ZERO,
    lastNftMint: BIG_ZERO,
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
export const fetchGravesPublicDataAsync = () => async (dispatch) => {
  const graves = await fetchWhalePool(gravesConfig)
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

export default whalePoolSlice.reducer
