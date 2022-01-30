// Approve an address
import { Contract } from 'web3-eth-contract'
import { BigNumber } from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { useCallback } from 'react'
import { useAppDispatch } from '../state'
import { depositRug, stake, unlock, unstake, unstakeEarly } from '../utils/callHelpers'
import { fetchGravesUserDataAsync } from '../state/graves'
import { BIG_ZERO } from '../utils/bigNumber'

export const useStake = (drFrankensteinContract: Contract, pid: number, amount: BigNumber) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()

  const handleStake = useCallback(async () => {
    try {
      const tx = await stake(drFrankensteinContract, pid, amount, account)
      // @ts-ignore
      dispatch(fetchGravesUserDataAsync(account))
      return tx
    } catch (e) {
      return false
    }
  }, [drFrankensteinContract, pid, amount, account, dispatch])

  return { onStake: handleStake }
}

export const useUnstake = (drFrankensteinContract: Contract, pid: number, amount: BigNumber) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()

  const handleUnstake = useCallback(async () => {
    try {
      const tx = await unstake(drFrankensteinContract, pid, amount, account)
      // @ts-ignore
      dispatch(fetchGravesUserDataAsync(account))
      return tx
    } catch (e) {
      return false
    }
  }, [drFrankensteinContract, pid, amount, account, dispatch])

  return { onUnstake: handleUnstake }
}

export const useUnstakeEarly = (drFrankensteinContract: Contract, pid: number, amount: BigNumber) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()

  const handleUnstakeEarly = useCallback(async () => {
    try {
      const tx = await unstakeEarly(drFrankensteinContract, pid, amount, account)
      // @ts-ignore
      dispatch(fetchGravesUserDataAsync(account))
      return tx
    } catch (e) {
      return false
    }
  }, [drFrankensteinContract, pid, amount, account, dispatch])

  return { onUnstakeEarly: handleUnstakeEarly }
}

export const useHarvest = (drFrankensteinContract: Contract, pid: number) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()

  const handleHarvest = useCallback(async () => {
    try {
      const tx = await unstake(drFrankensteinContract, pid, BIG_ZERO, account)
      // @ts-ignore
      dispatch(fetchGravesUserDataAsync(account))
      return tx
    } catch (e) {
      return false
    }
  }, [drFrankensteinContract, pid, account, dispatch])

  return { onHarvest: handleHarvest }
}

export const useUnlock = (drFrankensteinContract: Contract, pid: number, amount: BigNumber) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()

  const handleUnlock = useCallback(async () => {
    try {
      const tx = await unlock(drFrankensteinContract, pid, amount, account)
      // @ts-ignore
      dispatch(fetchGravesUserDataAsync(account))
      return tx
    } catch (e) {
      return false
    }
  }, [drFrankensteinContract, pid, amount, account, dispatch])

  return { onUnlock: handleUnlock }
}

export const useDepositRug = (drFrankensteinContract: Contract, pid: number, amount: BigNumber) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()

  const handleDepositRug = useCallback(async () => {
    try {
      const tx = await depositRug(drFrankensteinContract, pid, amount, account)
      // @ts-ignore
      dispatch(fetchGravesUserDataAsync(account))
      return tx
    } catch (e) {
      return false
    }
  }, [drFrankensteinContract, pid, amount, account, dispatch])

  return { onDepositRug: handleDepositRug }
}
