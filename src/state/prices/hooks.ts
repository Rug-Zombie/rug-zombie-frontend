import { useSelector } from 'react-redux'
import BigNumber from 'bignumber.js'
import { BIG_ZERO } from '../../utils/bigNumber'
import { PriceState, State, TokenPrices } from '../types'
import { getWbnbAddress, getZombieAddress } from '../../utils/addressHelpers'

export const useGetPrices = (): PriceState => useSelector((state: State) => state.prices)

export const useGetPricesByTokenAddress = (address: string): TokenPrices => useGetPrices().prices[address.toLowerCase()]

export const useGetUsdPriceByTokenAddress = (address: string): BigNumber => {
  const prices = useGetPricesByTokenAddress(address)
  return prices ? new BigNumber(prices.priceUsd) : BIG_ZERO
}

export const useGetBnbPriceByTokenAddress = (address: string): BigNumber => {
  const prices = useGetPricesByTokenAddress(address)
  return prices ? new BigNumber(prices.priceBnb) : BIG_ZERO
}

// Using regular numbers for USD prices for now
export const useGetBnbPriceUsd = (): number => useGetUsdPriceByTokenAddress(getWbnbAddress()).toNumber()
export const useGetZombiePriceBnb = (): BigNumber => new BigNumber(useGetBnbPriceByTokenAddress(getZombieAddress()))
export const useGetZombiePriceUsd = (): number => useGetUsdPriceByTokenAddress(getZombieAddress()).toNumber()
