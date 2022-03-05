import BigNumber from 'bignumber.js'
import { getGraveTombApr, getSpawningPoolApr } from 'utils/apr'
import { BIG_TEN, BIG_ZERO } from 'utils/bigNumber'

describe('getSpawningPoolApr', () => {
  it(`returns null when parameters are missing`, () => {
    const apr = getSpawningPoolApr(null, null, null, null)
    expect(apr).toBeNull()
  })
  it(`returns null when APR is infinite`, () => {
    const apr = getSpawningPoolApr(0, 0, 0, 0)
    expect(apr).toBeNull()
  })
  it(`get the correct pool APR`, () => {
    const apr = getSpawningPoolApr(10, 1, 100000, 1)
    expect(apr).toEqual(10.512)
  })
})

describe('getGraveTombApr', () => {
  it(`returns null when parameters are missing`, () => {
    const apr = getGraveTombApr(null, null, null)
    expect(apr).toBeNull()
  })
  it(`returns null when APR is infinite`, () => {
    const apr = getGraveTombApr(BIG_ZERO, BIG_ZERO, BIG_ZERO)
    expect(apr).toBeNull()
  })
  it(`get the correct pool APR`, () => {
    const apr = getGraveTombApr(BIG_TEN, new BigNumber(1), new BigNumber(100000))
    expect(apr).toEqual(10512)
  })
})
