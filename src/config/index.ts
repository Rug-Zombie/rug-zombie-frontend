import BigNumber from 'bignumber.js/bignumber'
import { BIG_TEN } from 'utils/bigNumber'
import { Dex } from './constants/types'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

/**
 * Time per BSC block in seconds.
 */
export const BSC_BLOCK_TIME = 3

/**
 * ZMBE tokens minted per block,
 */
export const ZMBE_PER_BLOCK = new BigNumber(10)

/**
 * BSC blocks emitted per year.
 */
export const BLOCKS_PER_YEAR = new BigNumber((60 / BSC_BLOCK_TIME) * 60 * 24 * 365) // 10512000

/**
 * Base URL for PancakeSwap.
 */
export const BASE_EXCHANGE_URL = 'https://pancakeswap.finance'
export const BASE_V1_EXCHANGE_URL = 'https://v1exchange.pancakeswap.finance'
export const BASE_ADD_LIQUIDITY_URL = `${BASE_EXCHANGE_URL}/add`

/**
 * Base URL for ApeSwap.
 */
export const APESWAP_EXCHANGE_URL = 'https://app.apeswap.finance'
export const APESWAP_ADD_LIQUIDITY_URL = `${APESWAP_EXCHANGE_URL}/add`
export const APESWAP_LIQUIDITY_POOL_URL = `${APESWAP_EXCHANGE_URL}/#/pool`

/**
 * Base URL for AutoShark.
 */
export const AUTOSHARK_EXCHANGE_URL = 'https://autoshark.finance'
export const AUTOSHARK_ADD_LIQUIDITY_URL = `${AUTOSHARK_EXCHANGE_URL}/add`

export const BASE_BSC_SCAN_URL = 'https://bscscan.com'
export const LOTTERY_MAX_NUMBER_OF_TICKETS = 50
export const LOTTERY_TICKET_PRICE = 1
export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18)
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
export const DEXS = ['ZombieSwap', 'Pancakeswap V1', 'Pancakeswap', 'Autoshark', 'Apeswap']
export const NATIVE_DEX = Dex.PCS_V2
export const BASE_BSC_SCAN_URLS = {
  56: 'https://bscscan.com',
  97: 'https://testnet.bscscan.com',
}