import BigNumber from 'bignumber.js'
import drFrankenstein from 'config/abi/drFrankenstein.json'
import lpPair from 'config/abi/pancakePairAbi.json'
import multicall from 'utils/multicall'
import { getAddress, getDrFrankensteinAddress } from 'utils/addressHelpers'
import { TombConfig } from 'config/constants/types'
import { getId } from '../../utils'
import { getBep20Contract } from '../../utils/contractHelpers'

const fetchTombs = async (tombsToFetch: TombConfig[]) => {
  const wbnb = {
    56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    97: '0xae13d989dac2f0debff460ac112a837c89baa7cd',
  }

  const data = await Promise.all(
    tombsToFetch.map(async (tombConfig) => {
        let calls = [
          {
            address: getAddress(tombConfig.lpAddress),
            name: 'getReserves',
            params: [],
          },
          {
            address: getAddress(tombConfig.lpAddress),
            name: 'totalSupply',
            params: [],
          },
          {
            address: getAddress(tombConfig.lpAddress),
            name: 'token0',
          },
        ]

        const [
          reserves,
          totalSupply,
          token0,
        ] = await multicall(lpPair, calls)

        calls = [
          {
            address: getDrFrankensteinAddress(),
            name: 'poolInfo',
            params: [getId(tombConfig.pid)],
          },
          {
            address: getDrFrankensteinAddress(),
            name: 'totalAllocPoint',
          },
        ]

        const [
          info,
          totalAllocPoint,
        ] = await multicall(drFrankenstein, calls)

        const bnbReserve = reserves[token0 === getAddress(wbnb) ? 0 : 1]
        const tokenReserve = reserves[token0 === getAddress(wbnb) ? 1 : 0]
        const tokenPriceBnb = new BigNumber(bnbReserve._hex).div(tokenReserve._hex)
        const lpPriceBnb = tokenPriceBnb.times(tokenReserve._hex).plus(bnbReserve._hex).div(totalSupply)

        const allocPoint = new BigNumber(info.allocPoint._hex)
        const weight = allocPoint.div(new BigNumber(totalAllocPoint))
        const tokenAmount = new BigNumber((await getBep20Contract(info.lpToken).methods.balanceOf(getDrFrankensteinAddress()).call()))
        return {
          ...tombConfig,
          poolInfo: {
            lpReserves: [new BigNumber(reserves[0]._hex), new BigNumber(reserves[1]._hex)],
            lpTotalSupply: new BigNumber(totalSupply._hex),
            withdrawCooldown: new BigNumber(info.minimumStakingTime._hex),
            lpPriceBnb,
            tokenAmount,
            allocPoint,
            weight,
          },
        }
      },
    ),
  )
  return data
}

export default fetchTombs
