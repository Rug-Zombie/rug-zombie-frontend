import BigNumber from 'bignumber.js'
import erc20 from 'config/abi/erc20.json'
import drFrankenstein from 'config/abi/drFrankenstein.json'
import multicall from 'utils/multicall'
import { BIG_TEN } from 'utils/bigNumber'
import { getAddress, getDrFrankensteinAddress, getMasterChefAddress } from 'utils/addressHelpers'
import { FarmConfig, GraveConfig } from 'config/constants/types'
import { DEFAULT_TOKEN_DECIMAL } from 'config'

const fetchGraves = async (farmsToFetch: GraveConfig[]) => {
  const data = await Promise.all(
    farmsToFetch.map(async (graveConfig) => {
      const calls = [
        // Balance of zombie staking in grave
        {
          address: getAddress(graveConfig.stakingToken.address),
          name: 'balanceOf',
          params: [getDrFrankensteinAddress()],
        },
        {
          address: getDrFrankensteinAddress(),
          name: 'poolInfo',
          params: [graveConfig.pid],
        },
        {
          address: getDrFrankensteinAddress(),
          name: 'totalAllocPoint',
        },
      ]

      const [
        tokenAmount,
        info,
        totalAllocPoint
      ] = await multicall(erc20, calls)



      const allocPoint = new BigNumber(info.allocPoint._hex)
      const poolWeight = allocPoint.div(new BigNumber(totalAllocPoint))

      return {
        ...graveConfig,
        poolInfo: {
          ,

        }
        tokenAmount: tokenAmount.toJSON(),
        quoteTokenAmount: quoteTokenAmount.toJSON(),
        lpTotalSupply: new BigNumber(lpTotalSupply).toJSON(),
        lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
        tokenPriceVsQuote: quoteTokenAmount.div(tokenAmount).toJSON(),
        poolWeight: poolWeight.toJSON(),
        multiplier: `${allocPoint.div(100).toString()}X`,
      }
    }),
  )
  return data
}

export default fetchGraves
