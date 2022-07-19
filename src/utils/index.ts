import { BASE_BSC_SCAN_URLS, DEXS } from '../config'
import { Address, Id } from '../config/constants/types'
import instabuys from '../config/constants/instabuys'
import tombs from '../config/constants/tombs'
import { graves } from '../config/constants'

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

export function instaBuyById(id: number) {
  return instabuys.find((i) => i.id === id)
}

export function formatAddress(address: string): string {
  return `${address.slice(0, 4)}...${address.slice(address.length - 4, address.length)}`
}

export function equalAddresses(addr1: string, addr2: string): boolean {
  return addr1.toLowerCase() === addr2.toLowerCase()
}

export function getDrFPoolName(pid: number): string {
  if (tombPids().includes(pid)) {
    return `${DEXS[tombs.find((t) => getId(t.pid) === pid).dex]}`
  }

  const grave = graves.find((g) => getId(g.pid) === pid)
  return grave && grave.name
}

export function tombPids(): number[] {
  return tombs.map((t) => getId(t.pid))
}

export const range = (start, end) => Array.from(Array(end - start + 1).keys()).map((x) => x + start)

export const getHighResImage = (nftAddress: Address): string => {
  return `https://api.oblivion.art/image-cache/${nftAddress[56].toLowerCase()}_1_high`
}

export const getLowResImage = (nftAddress: Address): string => {
  return `https://api.oblivion.art/image-cache/${nftAddress[56].toLowerCase()}_1_low`
}