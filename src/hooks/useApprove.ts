import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Contract } from 'web3-eth-contract'
import { useAppDispatch } from 'state'
import { fetchGravesUserDataAsync } from 'state/graves'
import { approve } from 'utils/callHelpers'
import { fetchSpawningPoolsUserDataAsync } from '../state/spawningPools'
import { fetchTombsUserDataAsync } from '../state/tombs'

export enum ApproveTarget {
  Graves,
  Tombs,
  SpawningPools
}

// Approve an address
const useApprove = (tokenContract: Contract, spenderAddress: string, approveTarget?: ApproveTarget) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(tokenContract, spenderAddress, account)
      if(approveTarget === ApproveTarget.SpawningPools) {
        dispatch(fetchSpawningPoolsUserDataAsync(account))
      } else if(approveTarget === ApproveTarget.Tombs) {
        dispatch(fetchTombsUserDataAsync(account))
      } else {
        dispatch(fetchGravesUserDataAsync(account))
      }
      return tx
    } catch (e) {
      return false
    }
  }, [tokenContract, spenderAddress, account, approveTarget, dispatch])

  return { onApprove: handleApprove }
}

export default useApprove
