import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import gravesReducer from "./graves"
import tombsReducer from "./tombs"
import spawningPoolsReducer from "./spawningPools"


const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    graves: gravesReducer,
    tombs: tombsReducer,
    spawningPools: spawningPoolsReducer
  },
})

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
 */
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
