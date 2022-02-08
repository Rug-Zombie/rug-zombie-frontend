import BigNumber from 'bignumber.js'
import spawningPool from 'config/abi/spawningPool.json'
import pancakePair from 'config/abi/pancakePairAbi.json'
import multicall from 'utils/multicall'
import { getAddress } from 'utils/addressHelpers'
import { Dex, SpawningPoolConfig } from 'config/constants/types'
import { getApeswapFactoryContract, getPancakeFactoryContract, getZombieContract } from '../../utils/contractHelpers'
import { equalAddresses } from '../../utils'
import { getBalanceAmount } from '../../utils/formatBalance'
import { DEXS } from '../../config'

const fetchSpawningPools = async (spawningPoolToFetch: SpawningPoolConfig[]) => {
  const wbnb = {
    56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    97: '0xae13d989dac2f0debff460ac112a837c89baa7cd',
  }
  const data = await Promise.all(
    spawningPoolToFetch.map(async (spawningPoolConfig) => {
      let calls = [
        {
          address: getAddress(spawningPoolConfig.address),
          name: 'rewardPerBlock',
          params: [],
        },
        {
          address: getAddress(spawningPoolConfig.address),
          name: 'unlockFeeInBnb',
          params: [],
        },
        {
          address: getAddress(spawningPoolConfig.address),
          name: 'minimumStake',
          params: [],
        },
        {
          address: getAddress(spawningPoolConfig.address),
          name: 'minimumStakingTime',
          params: [],
        },
        {
          address: getAddress(spawningPoolConfig.address),
          name: 'nftRevivalTime',
          params: [],
        },
      ]

      const [
        rewardPerBlock,
        unlockFee,
        minimumStake,
        minimumStakingTime,
        nftMintTime,
      ] = await multicall(spawningPool, calls)

      let router
      switch (spawningPoolConfig.dex) {
        case Dex.PCS_V2:
          router = getPancakeFactoryContract()
          break
        case Dex.APESWAP:
          router = getApeswapFactoryContract()
          break
        default:
          router = getPancakeFactoryContract()
          break
      }

      const lpAddress = await router.methods.getPair(getAddress(wbnb), getAddress(spawningPoolConfig.rewardToken.address)).call()

      calls = [
        {
          address: lpAddress,
          name: 'getReserves',
          params: [],
        },
        {
          address: lpAddress,
          name: 'token0',
          params: [],
        },
      ]

      const totalAmount = await getZombieContract().methods.balanceOf(getAddress(spawningPoolConfig.address)).call()

      const [reserves, [token0]] = await multicall(pancakePair, calls)

      const bnbReserve = reserves[equalAddresses(token0, getAddress(wbnb)) ? 0 : 1]
      const rewardTokenReserve = reserves[equalAddresses(token0, getAddress(wbnb)) ? 1 : 0]
      const rewardTokenPriceBnb = getBalanceAmount(new BigNumber(bnbReserve._hex)).div(getBalanceAmount(rewardTokenReserve._hex, spawningPoolConfig.rewardToken.decimals))
      return {
        ...spawningPoolConfig,
        poolInfo: {
          rewardPerBlock: new BigNumber(rewardPerBlock),
          unlockFee: new BigNumber(unlockFee),
          minimumStake: new BigNumber(minimumStake),
          withdrawalCooldown: new BigNumber(minimumStakingTime),
          nftMintTime: new BigNumber(nftMintTime),
          totalAmount: new BigNumber(totalAmount),
          rewardTokenPriceBnb,
        },
      }
    }),
  )
  return data
}

export default fetchSpawningPools
