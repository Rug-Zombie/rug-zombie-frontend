import graves from 'config/constants/graves';
import { getBep20Contract } from 'utils/contractHelpers';
import tokens from '../../config/constants/tokens'

const gravesToTest = graves.filter((grave) => grave.pid[56] !== 0);

const expectedDuplicateRugGravesByRuggedTokenAddress = new Map([
    [ tokens.basicZmbe.address[56], new Set([23, 27]) ],
    [ tokens.cx.address[56], new Set([47, 46]) ],
    [ tokens.pokecoin.address[56], new Set([34, 30]) ],
    [ tokens.fairmoon.address[56], new Set([4, 5, 6]) ]
])

describe('Config graves', () => {
  it.each(gravesToTest.map((grave) => grave.pid[56]))(
    'Grave #%d has an unique pid', (pid) => {
      const duplicates = graves.filter((grave) => pid === grave.pid[56]);
      expect(duplicates).toHaveLength(1);
    },
  )
  it.each(gravesToTest.map((grave) => [grave.pid[56], grave.rug]))(
    'Grave #%d has an unique rugged token address', (_, ruggedToken) => {
      const duplicates = graves.filter((f) => ruggedToken === f.rug);

      // @ts-ignore
        const pidsPermittedToHaveSameRuggedToken = ('address' in ruggedToken)
          && expectedDuplicateRugGravesByRuggedTokenAddress.get(ruggedToken.address[56])
      if (!pidsPermittedToHaveSameRuggedToken) {
        expect(duplicates).toHaveLength(1);
      } else {
        duplicates.map(({pid}) => pid[56])
            .forEach((pid) => expect(pidsPermittedToHaveSameRuggedToken).toContain(pid))
      }
    },
  )
  it.each(gravesToTest)('Grave %p has the correct rugged token addresses',
    async (grave) => {
      const { rug } = grave;
      const rugAddress = rug.address[56]
      const stakingTokenContract = getBep20Contract(rugAddress);

      expect(rugAddress.toLowerCase())
        .toBe(stakingTokenContract.options.address.toLowerCase());
    },
  )
})
