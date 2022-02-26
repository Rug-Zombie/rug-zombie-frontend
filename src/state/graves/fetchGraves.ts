import BigNumber from 'bignumber.js'
import { BigNumber as EthersBigNumber } from 'ethers'
import { chunk } from 'lodash'

import drFrankenstein from 'config/abi/drFrankenstein.json'
import bep20Abi from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
import { getDrFrankensteinAddress } from 'utils/addressHelpers'
import { GraveConfig } from 'config/constants/types'
import { getId } from '../../utils'
import { Grave } from '../types'

const fetchGraves = async (gravesToFetch: GraveConfig[]): Promise<Grave[]> => {
  const drFrankensteinAddress = getDrFrankensteinAddress()
  const getCallsForGrave = ({ pid }) => {
    const graveId = getId(pid)

    return [
      { address: drFrankensteinAddress, name: 'poolInfo', params: [graveId] },
      { address: drFrankensteinAddress, name: 'unlockFeeInBnb', params: [graveId] },
      { address: drFrankensteinAddress, name: 'totalAllocPoint' },
    ]
  }

  const graveInfoSlices = await multicall(drFrankenstein, gravesToFetch.flatMap(getCallsForGrave))
  const graveInfos = chunk(graveInfoSlices, 3).map(([poolInfo, unlockFee, totalAllocPoint]) => ({
    poolInfo, unlockFee, totalAllocPoint,
  }) as { poolInfo: any, unlockFee: number, totalAllocPoint: number })

  const balanceCalls = graveInfos.map(({ poolInfo }) => ({
        address: poolInfo.lpToken,
        name: 'balanceOf',
        params: [drFrankensteinAddress],
      }))
  const balances: EthersBigNumber[][] = await multicall(bep20Abi, balanceCalls)

  return gravesToFetch.map((grave, i) => {
    const { poolInfo, unlockFee, totalAllocPoint } = graveInfos[i]
    const [tokenAmount] = balances[i]

    const allocPoint = new BigNumber(poolInfo.allocPoint._hex)
    const weight = allocPoint.div(new BigNumber(totalAllocPoint))

    return {
      ...grave,
      poolInfo: {
        unlockFee: new BigNumber(unlockFee),
        minimumStake: new BigNumber(poolInfo.minimumStake._hex),
        withdrawCooldown: new BigNumber(poolInfo.minimumStakingTime._hex),
        nftMintTime: new BigNumber(poolInfo.nftRevivalTime._hex),
        lpToken: poolInfo.lpToken,
        tokenAmount: new BigNumber(tokenAmount._hex),
        allocPoint,
        weight,
      },
    }
  })
}

export default fetchGraves
