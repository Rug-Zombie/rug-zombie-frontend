import BigNumber from 'bignumber.js'
import drFrankenstein from 'config/abi/drFrankenstein.json'
import multicall from 'utils/multicall'
import { getDrFrankensteinAddress } from 'utils/addressHelpers'
import { TombConfig } from 'config/constants/types'
import { getId } from '../../utils'
import { getBep20Contract } from '../../utils/contractHelpers'

const fetchTombs = async (tombsToFetch: TombConfig[]) => {
  const data = await Promise.all(
    tombsToFetch.map(async (tombConfig) => {
      const calls = [
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
        totalAllocPoint
      ] = await multicall(drFrankenstein, calls)
      const allocPoint = new BigNumber(info.allocPoint._hex)
      const weight = allocPoint.div(new BigNumber(totalAllocPoint))
      const tokenAmount = new BigNumber((await getBep20Contract(info.lpToken).methods.balanceOf(getDrFrankensteinAddress()).call()))
      return {
        ...tombConfig,
        poolInfo: {
          withdrawCooldown: new BigNumber(info.minimumStakingTime._hex),
          tokenAmount,
          allocPoint,
          weight,
        }
      }
    }),
  )
  return data
}

export default fetchTombs
