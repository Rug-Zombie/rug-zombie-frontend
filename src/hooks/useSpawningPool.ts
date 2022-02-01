// Approve an address
import { Contract } from 'web3-eth-contract'
import { BigNumber } from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { useCallback } from 'react'
import { useAppDispatch } from '../state'
import {
  spStake, spUnlock,
  spUnstake,
  spUnstakeEarly,
} from '../utils/callHelpers'
import { fetchGravesUserDataAsync } from '../state/graves'
import { BIG_ZERO } from '../utils/bigNumber'

export const useStake = (spawningPoolContract: Contract, amount: BigNumber) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()

  const handleStake = useCallback(async () => {
    try {
      const tx = await spStake(spawningPoolContract, amount, account)
      // @ts-ignore
      dispatch(fetchGravesUserDataAsync(account))
      return tx
    } catch (e) {
      return false
    }
  }, [spawningPoolContract, amount, account, dispatch])

  return { onStake: handleStake }
}

export const useUnstake = (spawningPoolContract: Contract, amount: BigNumber) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()

  const handleUnstake = useCallback(async () => {
    try {
      const tx = await spUnstake(spawningPoolContract, amount, account)
      // @ts-ignore
      dispatch(fetchGravesUserDataAsync(account))
      return tx
    } catch (e) {
      return false
    }
  }, [spawningPoolContract, amount, account, dispatch])

  return { onUnstake: handleUnstake }
}

export const useUnstakeEarly = (spawningPoolContract: Contract, amount: BigNumber) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()

  const handleUnstakeEarly = useCallback(async () => {
    try {
      const tx = await spUnstakeEarly(spawningPoolContract, amount, account)
      // @ts-ignore
      dispatch(fetchGravesUserDataAsync(account))
      return tx
    } catch (e) {
      return false
    }
  }, [spawningPoolContract, amount, account, dispatch])

  return { onUnstakeEarly: handleUnstakeEarly }
}

export const useHarvest = (spawningPoolContract: Contract) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()

  const handleHarvest = useCallback(async () => {
    try {
      const tx = await spUnstake(spawningPoolContract, BIG_ZERO, account)
      // @ts-ignore
      dispatch(fetchGravesUserDataAsync(account))
      return tx
    } catch (e) {
      return false
    }
  }, [spawningPoolContract, account, dispatch])

  return { onHarvest: handleHarvest }
}

export const useUnlock = (spawningPoolContract: Contract, amount: BigNumber) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()

  const handleUnlock = useCallback(async () => {
    try {
      const tx = await spUnlock(spawningPoolContract, amount, account)
      // @ts-ignore
      dispatch(fetchGravesUserDataAsync(account))
      return tx
    } catch (e) {
      return false
    }
  }, [spawningPoolContract, amount, account, dispatch])

  return { onUnlock: handleUnlock }
}
