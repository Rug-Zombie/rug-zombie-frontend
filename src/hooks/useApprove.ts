import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Contract } from 'web3-eth-contract'
import { useAppDispatch } from 'state'
import { fetchGravesUserDataAsync } from 'state/graves'
import { approve } from 'utils/callHelpers'
import { fetchSpawningPoolUserInfo } from '../state/spawningPools/fetchSpawningPoolUser'
import { fetchSpawningPoolsUserDataAsync } from '../state/spawningPools'

// Approve an address
const useApprove = (tokenContract: Contract, spenderAddress: string, isSpawningPool?: boolean) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(tokenContract, spenderAddress, account)
      // @ts-ignore
      if(isSpawningPool) {
        dispatch(fetchSpawningPoolsUserDataAsync(account))
      } else {
        dispatch(fetchGravesUserDataAsync(account))
      }
      return tx
    } catch (e) {
      return false
    }
  }, [tokenContract, spenderAddress, account, isSpawningPool, dispatch])

  return { onApprove: handleApprove }
}

export default useApprove
