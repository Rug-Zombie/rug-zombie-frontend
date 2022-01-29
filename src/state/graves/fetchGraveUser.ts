import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import drFrankenstein from 'config/abi/drFrankenstein.json'
import masterchefABI from 'config/abi/masterchef.json'
import multicall from 'utils/multicall'
import { getAddress, getDrFrankensteinAddress, getMasterChefAddress } from 'utils/addressHelpers'
import { FarmConfig, GraveConfig } from 'config/constants/types'
import { getId } from '../../utils'

export const fetchFarmUserAllowances = async (account: string, farmsToFetch: FarmConfig[]) => {
  const masterChefAddress = getMasterChefAddress()

  const calls = farmsToFetch.map((farm) => {
    const lpContractAddress = getAddress(farm.lpAddresses)
    return { address: lpContractAddress, name: 'allowance', params: [account, masterChefAddress] }
  })

  const rawLpAllowances = await multicall(erc20ABI, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toJSON()
  })
  return parsedLpAllowances
}

export const fetchGraveUserInfo = async (account: string, gravesToFetch: GraveConfig[]) => {
  const drFrankensteinAddress = getDrFrankensteinAddress()

  const calls = gravesToFetch.map((grave) => {
    return {
      address: drFrankensteinAddress,
      name: 'userInfo',
      params: [getId(grave.pid), account],
    }
  })

  return multicall(drFrankenstein, calls)
}

export const fetchGraveUserStakedBalances = async (account: string, farmsToFetch: FarmConfig[]) => {
  const masterChefAddress = getMasterChefAddress()

  const calls = farmsToFetch.map((farm) => {
    return {
      address: masterChefAddress,
      name: 'userInfo',
      params: [farm.pid, account],
    }
  })

  const rawStakedBalances = await multicall(masterchefABI, calls)
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toJSON()
  })
  return parsedStakedBalances
}

export const fetchGraveUserEarnings = async (account: string, gravesToFetch: GraveConfig[]) => {
  const drFrankensteinAddress = getDrFrankensteinAddress()

  const calls = gravesToFetch.map((grave) => {
    return {
      address: drFrankensteinAddress,
      name: 'pendingZombie',
      params: [getId(grave.pid), account],
    }
  })

  const rawEarnings = await multicall(drFrankenstein, calls)
  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings).toJSON()
  })
  return parsedEarnings
}
