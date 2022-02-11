import BigNumber from 'bignumber.js'

import {
  DEFAULT_DECIMAL_COUNT,
  getBalanceAmount,
  getBalanceNumber,
  getDecimalAmount,
  getFullDisplayBalance,
  formatNumber,
} from 'utils/formatBalance'

describe('getBalance[Amount|Number]', () => {
  const testGetBalanceAmountAndNumber = (input: BigNumber, expected: BigNumber) => {
    const balanceAmount = getBalanceAmount(input)
    const balanceNumber = getBalanceNumber(input)

    expect(balanceAmount).toEqual(expected)
    expect(balanceNumber).toEqual(expected.toNumber())
  }

  it('should move decimal place right by default decimal count', () => {
    testGetBalanceAmountAndNumber(new BigNumber(15e18), new BigNumber(15))
  })
  it('should move number with decimal\'s place right by number right by  default decimal count', () => {
    testGetBalanceAmountAndNumber(new BigNumber(15.123456e18), new BigNumber(15.123456))
  })
  it('should move fractional number\'s decimal right by default decimal count', () => {
    testGetBalanceAmountAndNumber(new BigNumber(15.123456e13), new BigNumber(0.00015123456))
  })
})

describe('getDecimalAmount', () => {
  it('should zero-pad whole number to default decimal count', () => {
    const inputAmount = new BigNumber(12)
    const decimalAmount = getDecimalAmount(inputAmount)

    expect(decimalAmount).toEqual(new BigNumber(12e18))
  })
  it('should zero-pad number with decimal to default decimal count', () => {
    const inputAmount = new BigNumber(12.123)
    const decimalAmount =  getDecimalAmount(inputAmount)

    expect(decimalAmount).toEqual(new BigNumber(12.123e18))
  })
  it('should zero-pad fractional number to default decimal count', () => {
    const inputAmount = new BigNumber(0.0012123)
    const decimalAmount =  getDecimalAmount(inputAmount)

    expect(decimalAmount).toEqual(new BigNumber(12.123e14))
  })
})

describe('getFullDisplayBalance', () => {
  it('should shift decimal left by default decimal count', () => {
    const inputAmount = new BigNumber(2.05e18)
    const displayBalance = getFullDisplayBalance(inputAmount)

    expect(displayBalance).toEqual('2.05')
  })
  it('should trim to desired decimal count', () => {
    const inputAmount = new BigNumber(2.0532132e18)
    const displayBalance = getFullDisplayBalance(inputAmount, DEFAULT_DECIMAL_COUNT, 3)

    expect(displayBalance).toEqual('2.053')
  })
  it('should trim to desired decimal count (floor)', () => {
    const inputAmount = new BigNumber(2.0532137e18)
    const displayBalance = getFullDisplayBalance(inputAmount, 18, 6)

    expect(displayBalance).toEqual('2.053213')
  })
})

describe('formatNumber', () => {
  const testFormatNumber = (input, expected) => {
    const formatted = formatNumber(input)
    expect(formatted).toEqual(expected)
  }
  it('should zero-pad low-precision (default)', () => {
    testFormatNumber(2, '2.00')
  })
  it('should trim high-precision (default)', () => {
    testFormatNumber(2.123, '2.12')
  })
  it('should leave target-precision untouched (default)', () => {
    testFormatNumber(2.12, '2.12')
  })
})
