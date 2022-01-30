import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Contract } from 'web3-eth-contract'
import { ethers } from 'ethers'
import { useAppDispatch } from 'state'
import { updateUserAllowance, fetchFarmUserDataAsync, fetchGravesUserDataAsync } from 'state/actions'
import { approve } from 'utils/callHelpers'
import { useCake, useSousChef, useLottery } from './useContract'

// Approve an address
export const useApprove = (tokenContract: Contract, spenderAddress: string) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(tokenContract, spenderAddress, account)
      // @ts-ignore
      dispatch(fetchGravesUserDataAsync(account))
      return tx
    } catch (e) {
      return false
    }
  }, [tokenContract, spenderAddress, account, dispatch])

  return { onApprove: handleApprove }
}



// Approve a Pool
export const useSousApprove = (lpContract: Contract, sousId) => {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const sousChefContract = useSousChef(sousId)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, sousChefContract, account)
      // @ts-ignore
      dispatch(updateUserAllowance(sousId, account))
      return tx
    } catch (e) {
      return false
    }
  }, [account, dispatch, lpContract, sousChefContract, sousId])

  return { onApprove: handleApprove }
}

// Approve the lottery
export const useLotteryApprove = () => {
  const { account } = useWeb3React()
  const cakeContract = useCake()
  const lotteryContract = useLottery()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(cakeContract, lotteryContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, cakeContract, lotteryContract])

  return { onApprove: handleApprove }
}

// Approve an IFO
export const useIfoApprove = (tokenContract: Contract, spenderAddress: string) => {
  const { account } = useWeb3React()
  const onApprove = useCallback(async () => {
    const tx = await tokenContract.methods.approve(spenderAddress, ethers.constants.MaxUint256).send({ from: account })
    return tx
  }, [account, spenderAddress, tokenContract])

  return onApprove
}
