import BigNumber from 'bignumber.js'
import { BLOCKS_PER_YEAR, ZMBE_PER_BLOCK } from 'config'

/**
 * Get the APR value in %
 * @param stakingTokenPrice Token price in the same quote currency
 * @param rewardTokenPrice Token price in the same quote currency
 * @param totalStaked Total amount of stakingToken in the pool
 * @param tokenPerBlock Amount of new cake allocated to the pool for each new block
 * @returns Null if the APR is NaN or infinite.
 */
export const getSpawningPoolApr = (
  stakingTokenPrice: number | BigNumber,
  rewardTokenPrice: number | BigNumber,
  totalStaked: number | BigNumber,
  tokenPerBlock: number | BigNumber,
): number => {
  const totalRewardPricePerYear = new BigNumber(rewardTokenPrice).times(tokenPerBlock).times(BLOCKS_PER_YEAR)
  const totalStakingTokenInPool = new BigNumber(stakingTokenPrice).times(totalStaked)
  const apr = totalRewardPricePerYear.div(totalStakingTokenInPool)
  return apr.isNaN() || !apr.isFinite() ? null : apr.toNumber()
}

export const getGraveTombApr = (
  poolWeight: BigNumber,
  zmbePriceUsd: BigNumber,
  poolLiquidityUsd: BigNumber,
): number => {
  const yearlyZmbeRewardAllocation = ZMBE_PER_BLOCK.times(BLOCKS_PER_YEAR).times(poolWeight)
  const apr = yearlyZmbeRewardAllocation.times(zmbePriceUsd).div(poolLiquidityUsd)
  return apr.isNaN() || !apr.isFinite() ? null : apr.toNumber()
}

export default null
