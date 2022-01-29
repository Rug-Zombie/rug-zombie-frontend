import { useAppDispatch } from '../state'
import useRefresh from './useRefresh'
import { useEffect } from 'react'
import { fetchFarmUserDataAsync, fetchGravesUserDataAsync, setBlock } from '../state/actions'
import { getWeb3NoAccount } from '../utils/web3'

export const useFetchPublicData = () => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    // dispatch(fetchFarmUserDataAsync(""))
  }, [dispatch, slowRefresh])

  useEffect(() => {
    const web3 = getWeb3NoAccount()
    const interval = setInterval(async () => {
      const blockNumber = await web3.eth.getBlockNumber()
      dispatch(setBlock(blockNumber))
    }, 6000)

    return () => clearInterval(interval)
  }, [dispatch])
}