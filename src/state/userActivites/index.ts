/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import fetchDrFEvents from './fetchUserActivities'
import { UserActivityState } from '../types'

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
  const drFEvents = await fetchDrFEvents(account)

  const arrayOfUserEventObjects = drFEvents.sort((a, b) =>
    // eslint-disable-next-line no-nested-ternary
    a.timestamp > b.timestamp ? -1 : a.timestamp < b.timestamp ? 1 : 0,
  )
  dispatch(setUserActivity(arrayOfUserEventObjects))
}

export default userActivitySlice.reducer
