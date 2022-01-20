import spawningPools from 'redux/spawningPools'
import { getSpawningPoolContract } from 'utils/contractHelpers'

describe('Config spawning pools', () => {
  it.each(spawningPools.map((spawningPool) => spawningPool.id))(
    'Spawning pool #%d has an unique id',
    (sousId) => {
      const duplicates = spawningPools.filter((p) => sousId === p.id);

      expect(duplicates).toHaveLength(1)
    },
  )
  it.each(spawningPools.map((spawningPool) => [spawningPool.id, spawningPool.address]))(
    'Spawning pool #%d has an unique contract address',
    (_, contractAddress) => {
      const duplicates = spawningPools.filter((p) => contractAddress[56] === p.address[56]);

      expect(duplicates).toHaveLength(1)
    },
  )
  it.each(spawningPools.filter((spawningPool) => spawningPool.rewardToken.symbol !== 'BNB'))(
    'Spawning pool %p has the correct earning token',
    async (spawningPool) => {
      const contract = getSpawningPoolContract(spawningPool.id);
      const rewardTokenAddress = await contract.methods.rewardToken().call();

      expect(rewardTokenAddress.toLowerCase()).toBe(spawningPool.rewardToken.address[56].toLowerCase())
    },
  )
})
