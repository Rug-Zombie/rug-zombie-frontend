import { ChainId, JSBI, Percent } from '@autoshark-finance/sdk'
import tokens from './tokens'
import { Token } from './types'

export { default as farmsConfig } from './farms'
export { default as poolsConfig } from './pools'
export { default as ifosConfig } from './ifo'

export const ROUTER_ADDRESS = '0xB0EeB0632bAB15F120735e5838908378936bd484'

export const ZERO_PERCENT = new Percent('0')
export const ONE_HUNDRED_PERCENT = new Percent('1')

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 50
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20
// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%
// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: any = {
  [ChainId.MAINNET]: [tokens.busd, tokens.cake, tokens.btcb],
  [ChainId.TESTNET]: [tokens.wbnb, tokens.cake, tokens.busd],
}
// used to ensure the user doesn't send so much BNB so they end up with <.01
export const MIN_BNB: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 BNB

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: any = {
  [ChainId.MAINNET]: [
    tokens.wbnb,
    tokens.cake,
    tokens.busd,
    tokens.usdt,
    tokens.btcb,
    tokens.ust,
    tokens.eth,
    tokens.usdc,
  ],
  [ChainId.TESTNET]: [tokens.wbnb, tokens.cake, tokens.busd],
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.MAINNET]: [
    [tokens.zmbe, tokens.wbnb],
    [tokens.busd, tokens.usdt],
    [tokens.dai, tokens.usdt],
  ],
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 * @example [AMPL.address]: [DAI, WETH[ChainId.MAINNET]]
 */
 export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.MAINNET]: {},
}

/**
 * Additional bases for specific tokens
 * @example { [WBTC.address]: [renBTC], [renBTC.address]: [WBTC] }
 */
 export const ADDITIONAL_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.MAINNET]: {},
}

export const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(JSBI.BigInt(50), JSBI.BigInt(10000))
