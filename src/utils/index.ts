import { BASE_BSC_SCAN_URLS } from '../config'
import { Id } from '../config/constants/types'
import instabuys from '../config/constants/instabuys'
import { getAddress } from '@ethersproject/address'
import { BigNumber } from '@ethersproject/bignumber'
import { ChainId, JSBI, Percent, Token, Currency, ETHER } from '@autoshark-finance/sdk'
import { TokenAddressMap } from '../state/lists/hooks'
import { AddressZero } from '@ethersproject/constants'
import { Contract } from '@ethersproject/contracts'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { ROUTER_ADDRESS } from '../config/constants'
import { abi as IUniswapV2Router02ABI } from '@uniswap/v2-periphery/build/IUniswapV2Router02.json'

// eslint-disable-next-line import/prefer-default-export
export function getBscScanLink(
  data: string | number,
  type: 'transaction' | 'token' | 'address' | 'block' | 'countdown',
): string {
  switch (type) {
    case 'transaction': {
      return `${BASE_BSC_SCAN_URLS[56]}/tx/${data}`
    }
    case 'token': {
      return `${BASE_BSC_SCAN_URLS[56]}/token/${data}`
    }
    case 'block': {
      return `${BASE_BSC_SCAN_URLS[56]}/block/${data}`
    }
    case 'countdown': {
      return `${BASE_BSC_SCAN_URLS[56]}/block/countdown/${data}`
    }
    default: {
      return `${BASE_BSC_SCAN_URLS[56]}/address/${data}`
    }
  }
}

export function getId(id: Id): number {
  const mainNetChainId = 56
  const chainId = process.env.REACT_APP_CHAIN_ID
  return id[chainId] ? id[chainId] : id[mainNetChainId]
}

export function instaBuyById (id: number) {
  return instabuys.find(i => i.id === id)
}

// add 10%
export function calculateGasMargin(value: BigNumber): BigNumber {
  return value.mul(BigNumber.from(10000).add(BigNumber.from(1000))).div(BigNumber.from(10000))
}

// converts a basis points value to a sdk percent
export function basisPointsToPercent(num: number): Percent {
  return new Percent(JSBI.BigInt(num), JSBI.BigInt(10000))
}

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

export function isTokenOnList(defaultTokens: TokenAddressMap, currency?: Currency): boolean {
  if (currency === ETHER) return true
  return Boolean(currency instanceof Token && defaultTokens[currency.chainId]?.[currency.address])
}

// account is not optional
export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library
}

// account is optional
export function getContract(address: string, ABI: any, library: Web3Provider, account?: string): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account) as any)
}

// account is optional
export function getRouterContract(_: number, library: Web3Provider, account?: string): Contract {
  return getContract(ROUTER_ADDRESS, IUniswapV2Router02ABI, library, account)
}