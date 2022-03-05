import tombs from 'config/constants/tombs'
import { getBep20Contract, getLpContract } from 'utils/contractHelpers'

const tombsToTest = tombs.filter((tomb) => tomb.id !== 0)

describe('Config tombs', () => {
  it.each(tombs.map((tomb) => tomb.id))('tomb #%d has an unique id', (id) => {
    const duplicates = tombs.filter((tomb) => id === tomb.id)
    expect(duplicates).toHaveLength(1)
  })
  it.each(tombs.map((tomb) => [tomb.lpAddress]))('tomb #%d has an unique address', (lpAddresses) => {
    const duplicates = tombs.filter((tomb) => lpAddresses[56] === tomb.lpAddress[56])
    expect(duplicates).toHaveLength(1)
  })
  it.each(tombsToTest)('tomb %p has the correct token addresses', async (tomb) => {
    const tokenAddress = tomb.token1.address[56]
    const quoteTokenAddress = tomb.token2.address[56]
    const lpContract = getLpContract(tomb.lpAddress[56])

    const token0Address = (await lpContract.methods.token0().call()).toLowerCase()
    const token1Address = (await lpContract.methods.token1().call()).toLowerCase()

    expect(
      token0Address === tokenAddress.toLowerCase() || token0Address === quoteTokenAddress.toLowerCase(),
    ).toBeTruthy()
    expect(
      token1Address === tokenAddress.toLowerCase() || token1Address === quoteTokenAddress.toLowerCase(),
    ).toBeTruthy()
  })
  it.each(tombsToTest)('tomb %p has non 0 tokens amount', async (tomb) => {
    const tokenContract = getBep20Contract(tomb.token1.address[56])
    const quoteTokenContract = getBep20Contract(tomb.token2.address[56])

    const tokenAmount = await tokenContract.methods.balanceOf(tomb.lpAddress[56]).call()
    const quoteTokenAmount = await quoteTokenContract.methods.balanceOf(tomb.lpAddress[56]).call()

    expect(parseInt(tokenAmount, 10)).toBeGreaterThan(0)
    expect(parseInt(quoteTokenAmount, 10)).toBeGreaterThan(0)
  })
})
