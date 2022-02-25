/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { flatten } from 'lodash'
import { fetchDrFEvents } from './fetchUserActivities'
import { UserActivityState } from '../types'
import web3 from '../../utils/web3'
import { range } from '../../utils'

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
async function sleep(delay, fn, ...args) {
  await timeout(delay)
  return fn(...args)
}

const initialState: UserActivityState = { data: [], userDataLoaded: false }

export const userActivitySlice = createSlice({
  name: 'UserActivity',
  initialState,
  reducers: {
    setUserActivity: (state, action) => {
      state.data = action.payload
    },
  },
})

// Actions
export const { setUserActivity } = userActivitySlice.actions

// Thunks
export const fetchUserActivityAsync = (account: string) => async (dispatch) => {
  const CHUNKS = 5
  const MAX_BLOCK_QUERY_SIZE = 5000
  const DELAY = 1500
  const currentBlock = await web3.eth.getBlockNumber()

  const drFEventChunks = await Promise.all(
    range(0, CHUNKS - 1).map((i) => {
      return sleep(i * DELAY, fetchDrFEvents, account, currentBlock - MAX_BLOCK_QUERY_SIZE * i)
    }),
  )

  const drFEvents = flatten(drFEventChunks)

  const arrayOfUserEventObjects = drFEvents.sort((a, b) =>
    // eslint-disable-next-line no-nested-ternary
    a.timestamp > b.timestamp ? -1 : a.timestamp < b.timestamp ? 1 : 0,
  )
  dispatch(setUserActivity(arrayOfUserEventObjects))
}

export default userActivitySlice.reducer
