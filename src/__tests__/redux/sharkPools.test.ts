import sharkPools from 'redux/sharkPools';

describe('Config sharkPools', () => {
  it.each(sharkPools.map((sharkPool) => sharkPool.id))(
    'SharkPool #%d has a unique identifier',
    (id) => {
      const sharkPoolsWithId = sharkPools
        .filter((sharkPool) => sharkPool.id === id);
      expect(sharkPoolsWithId).toHaveLength(1);
    },
  );
  it.each(sharkPools.map((sharkPool) => sharkPool.address[56]))(
    'SharkPool #%s has a unique address',
    (address) => {
      const sharkPoolsWithAddress = sharkPools
        .filter((sharkPool) => sharkPool.address[56] === address);
      expect(sharkPoolsWithAddress).toHaveLength(1);
    },
  );
});
