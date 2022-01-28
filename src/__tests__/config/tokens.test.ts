import map from 'lodash/map'
import omitBy from 'lodash/omitBy'
import erc20ABI from 'config/abi/erc20.json'
import tokens from 'config/constants/tokens'
import { Token } from 'config/constants/types'
import multicall from 'utils/multicall'

const symbolsExcludedFromAllTests = new Set([
  'BNB', 'Zombie (No Relation)', '',
]);

const symbolsExcludedFromSymbolTest = new Set([
  'FINS-BNB LP', 'JAWS-BNB LP',
]);

const keysExcludedFromKeyTest = new Set([
  'basicZmbe', 'finsbnb', 'jawsbnb', 'horde', 'nuggetGoldbarApeLp', 'l1ghtv2',
  'squidgame', 'squidstake',
]);

// remove BNB because it's not a Bep20 token
const tokensToTest = omitBy(tokens, (token) => (
  symbolsExcludedFromAllTests.has(token.symbol)));

const toComparableSymbol = (s: string) => (
  s.replace(/[\s-_()$]/g, '')
  .toLowerCase()
  .replace('rzgnt', ''));

describe('Config tokens', () => {
  it.each(map(tokensToTest, (token, key) => [key, token]))(
    'Token %s has the correct key, symbol, and decimal',
    async (key, token: Token) => {
      const [[symbol], [decimals]] = await multicall(erc20ABI, [
        {
          address: token.address[56],
          name: 'symbol',
        },
        {
          address: token.address[56],
          name: 'decimals',
        },
      ])

      if (!keysExcludedFromKeyTest.has(key)) {
        expect(toComparableSymbol(key))
          .toBe(toComparableSymbol(token.symbol))
      }

      if (!symbolsExcludedFromSymbolTest.has(token.symbol)) {
        expect(toComparableSymbol(token.symbol))
          .toBe(toComparableSymbol(symbol))
      }

      expect(token.decimals).toBe(parseInt(decimals, 10))
    },
  )
})
