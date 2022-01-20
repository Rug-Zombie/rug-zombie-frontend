import { useEffect } from 'react'
import { useAppDispatch } from '../state'
import useRefresh from './useRefresh'
// import { fetchGravesUserDataAsync } from '../state/graves'
import { setBlock } from '../state/block'
import { getWeb3NoAccount } from '../utils/web3'

const useFetchPublicData = () => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    // dispatch(fetchGravesUserDataAsync(""))
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

export default useFetchPublicData
