// Approve an address
import { Contract } from 'web3-eth-contract'
import { BigNumber } from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { useCallback } from 'react'
import { useAppDispatch } from '../state'
import {
  whalePoolFinishMinting,
  whalePoolStake,
  whalePoolStartMinting, whalePoolUnstake
} from '../utils/callHelpers'
import { fetchWhalePoolPublicDataAsync, fetchWhalePoolUserDataAsync } from "../state/whalePools"

export const useStake = (whalePoolContract: Contract, tokenId: number) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()

  const handleStake = useCallback(async () => {
    try {
      const tx = await whalePoolStake(whalePoolContract, tokenId, account)
      dispatch(fetchWhalePoolUserDataAsync(account))
      dispatch(fetchWhalePoolPublicDataAsync())
      return tx
    } catch (e) {
      return false
    }
  }, [whalePoolContract, tokenId, account, dispatch])

  return { onStake: handleStake }
}

export const useUnstake = (whalePoolContract: Contract) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()

  const handleUnstake = useCallback(async () => {
    try {
      const tx = await whalePoolUnstake(whalePoolContract, account)
      dispatch(fetchWhalePoolUserDataAsync(account))
      dispatch(fetchWhalePoolPublicDataAsync())
      return tx
    } catch (e) {
      return false
    }
  }, [whalePoolContract, account, dispatch])

  return { onUnstake: handleUnstake }
}

export const useStartMinting = (whalePoolContract: Contract, fee: BigNumber) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()

  const handleStartMinting = useCallback(async () => {
    try {
      const tx = await whalePoolStartMinting(whalePoolContract, fee.toString(), account)
      dispatch(fetchWhalePoolUserDataAsync(account))
      return tx
    } catch (e) {
      return false
    }
  }, [whalePoolContract, fee, account, dispatch])

  return { onStartMinting: handleStartMinting }
}

export const useFinishMinting = (whalePoolContract: Contract) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()

  const handleFinishMinting = useCallback(async () => {
    try {
      const tx = await whalePoolFinishMinting(whalePoolContract, account)
      dispatch(fetchWhalePoolUserDataAsync(account))
      return tx
    } catch (e) {
      return false
    }
  }, [whalePoolContract, account, dispatch])

  return { onFinishMinting: handleFinishMinting }
}
