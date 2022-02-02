import { BASE_BSC_SCAN_URLS } from '../config'
import { Address, Id } from '../config/constants/types'
import instabuys from '../config/constants/instabuys'

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

  return id[chainId] || id[chainId] === 0 ? id[chainId] : id[mainNetChainId]
}

export function instaBuyById (id: number) {
  return instabuys.find(i => i.id === id)
}

export function formatAddress (address: string): string {
  return `${address.slice(0, 4)}...${address.slice(address.length - 4, address.length)}`
}

export function equalAddresses(addr1: string, addr2: string): boolean {
  return addr1.toLowerCase() === addr2.toLowerCase()
}