import BigNumber from 'bignumber.js'
import { BIG_TEN } from './bigNumber'

export const DEFAULT_DECIMAL_COUNT = 18

/**
 * Take a formatted amount, e.g. 15 BNB and convert it to full decimal value, e.g. 15000000000000000
 */
export const getDecimalAmount = (amount: BigNumber, decimals = DEFAULT_DECIMAL_COUNT): BigNumber => {
  return new BigNumber(amount).times(BIG_TEN.pow(decimals))
}

export const getBalanceAmount = (amount: BigNumber, decimals = DEFAULT_DECIMAL_COUNT): BigNumber => {
  return new BigNumber(amount).dividedBy(BIG_TEN.pow(decimals))
}

/**
 * This function is not really necessary but is used throughout the site.
 */
export const getBalanceNumber = (balance: BigNumber, decimals = DEFAULT_DECIMAL_COUNT): number => {
  return getBalanceAmount(balance, decimals).toNumber()
}

export const getFullDisplayBalance = (
  balance: BigNumber,
  decimals = DEFAULT_DECIMAL_COUNT,
  decimalsToAppear?: number,
): string => {
  return getBalanceAmount(balance, decimals).toFixed(decimalsToAppear, BigNumber.ROUND_FLOOR)
}

export const formatNumber = (number: number, minPrecision = 2, maxPrecision = 2): string => {
  const options = {
    minimumFractionDigits: minPrecision,
    maximumFractionDigits: maxPrecision,
  }
  return number.toLocaleString(undefined, options)
}
