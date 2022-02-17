import map from 'lodash/map'
import omitBy from 'lodash/omitBy'
import erc20ABI from 'config/abi/erc20.json'
import tokens from 'config/constants/tokens'
import { Token } from 'config/constants/types'
import multicall from 'utils/multicall'
import { chunk } from 'lodash'

const symbolsExcludedFromAllTests = new Set([
  'BNB', 'Zombie (No Relation)', '',
])

const symbolsExcludedFromSymbolTest = new Set([
  'FINS-BNB LP', 'JAWS-BNB LP',
])

const keysExcludedFromKeyTest = new Set([
  'basicZmbe', 'finsbnb', 'jawsbnb', 'horde', 'nuggetGoldbarApeLp', 'l1ghtv2',
  'squidgame', 'squidstake',
])

const tokensToTest = omitBy(tokens, (token) => (
  symbolsExcludedFromAllTests.has(token.symbol)));

const toComparableSymbol = (s: string) => (
  s.replace(/[\s-_()$]/g, '')
  .toLowerCase()
  .replace('rzgnt', ''));

describe('Config tokens',  () => {
  const contractInfoByToken = new Map()

  beforeAll(async () => {
    const tokenAddressesToTest = Object.values(tokensToTest)
        .map(({ address }) => address[56])
    const results: Array<Array<string | number>> = await multicall(
        erc20ABI,
        tokenAddressesToTest
            .flatMap((address) => [
              { address, name: 'symbol' },
              { address, name: 'decimals' },
            ]))
    chunk(results, 2).forEach(([[symbol], [decimals]], i) => (
        contractInfoByToken.set(tokenAddressesToTest[i], { symbol, decimals })))
  })

  it.each(map(tokensToTest, (token, key) => [key, token]))(
    'Token %s has the correct key, symbol, and decimal', (key, token: Token) => {
      const { symbol, decimals } = contractInfoByToken.get(token.address[56])

      if (!keysExcludedFromKeyTest.has(key)) {
        expect(toComparableSymbol(key))
            .toBe(toComparableSymbol(token.symbol))
      }

      if (!symbolsExcludedFromSymbolTest.has(token.symbol)) {
        expect(toComparableSymbol(token.symbol.toLowerCase()))
            .toBe(toComparableSymbol(symbol.toLowerCase()))
      }

      expect(token.decimals).toBe(parseInt(decimals, 10))
    },
  )
})
