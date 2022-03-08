import BigNumber from 'bignumber.js'
import { useSelector } from 'react-redux'
import { PCS_ZMBE_BNB_TOMB_PID } from '../../config/constants/tombs'
import { getId } from '../../utils'
import { BIG_ZERO } from '../../utils/bigNumber'
import { useGetBnbPriceUsd } from '../prices/hooks'
import { State, Tomb } from '../types'

export const useGetTombs = () => {
  return useSelector((state: State) => state.tombs)
}

export const useGetTombByPid = (pid: number): Tomb => useGetTombs().data.find((tomb) => getId(tomb.pid) === pid)

export const useGetZombieBnbTomb = (): Tomb => useGetTombByPid(getId(PCS_ZMBE_BNB_TOMB_PID))
export const useGetZombieBnbLpPriceBnb = (): BigNumber => useGetZombieBnbTomb().poolInfo.lpPriceBnb
export const useGetZombiePerZombieBnbLp = (): BigNumber => {
  const {
    poolInfo: { lpReserves, lpTotalSupply },
  } = useGetZombieBnbTomb()
  return lpReserves[0].div(lpTotalSupply)
}
export const useGetTombsTvlBnb = (): BigNumber =>
  useGetTombs().data.reduce((sum, tomb) => {
    const {
      poolInfo: { lpPriceBnb, tokenAmount },
    } = tomb
    return sum.plus(tokenAmount.times(lpPriceBnb))
  }, BIG_ZERO)
export const useGetTombsTvlUsd = (): BigNumber => useGetTombsTvlBnb().times(useGetBnbPriceUsd())

// User
export const useGetUserStakedTombs = (): Tomb[] =>
  useGetTombs().data.filter(({ userInfo: { amount } }) => !amount.isZero())
