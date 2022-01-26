import graves from 'redux/graves';
import { getBep20Contract } from 'utils/contractHelpers';

const gravesToTest = graves.filter((grave) => grave.pid[56] !== 0);

describe('Config graves', () => {
  it.each(gravesToTest.map((grave) => grave.pid[56]))(
    'Grave #%d has an unique pid', (pid) => {
      const duplicates = graves.filter((grave) => pid === grave.pid[56]);
      expect(duplicates).toHaveLength(1);
    },
  );
  it.each(gravesToTest.map((grave) => [grave.pid[56], grave.stakingToken]))(
    'Grave #%d has an unique address', (_, stakingToken) => {
      const duplicates = graves.filter((f) => stakingToken === f.stakingToken);
      expect(duplicates).toHaveLength(1);
    },
  );
  it.each(gravesToTest)('Grave %p has the correct rugged token addresses',
    async (grave) => {
      const { stakingToken } = grave;
      const stakingTokenContract = getBep20Contract(stakingToken);

      expect(stakingToken.toLowerCase())
        .toBe(stakingTokenContract.options.address.toLowerCase());
    },
  );
});
