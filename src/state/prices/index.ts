/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PriceApiThunk, PriceState } from 'state/types'
import fetchPrices from './fetchPrices'

const initialState: PriceState = {
  lastUpdated: null,
  prices: {},
}

export const pricesSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {
    setPrices: (state, action: PayloadAction<PriceApiThunk>) => {
      const { updatedAt, prices } = action.payload

      Object.entries(prices).forEach(([token, tokenPrices]) => {
        state.prices[token] = tokenPrices
      })
      state.lastUpdated = updatedAt
    },
  },
})

export const { setPrices } = pricesSlice.actions

// Thunks
export const fetchPricesAsync = () => async (dispatch) => {
  const prices = await fetchPrices()
  dispatch(setPrices(prices))
}

export default pricesSlice.reducer
