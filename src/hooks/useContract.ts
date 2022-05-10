import { useMemo } from 'react'
import useWeb3 from 'hooks/useWeb3'
import {
  getBep20Contract,
  getErc721Contract,
  getPredictionsContract,
  getZombieContract,
  getDrFrankensteinContract,
  getMausoleumContract,
  getSpawningPoolContract,
  getNftConverterContract,
  getNftOwnership,
  getZombieBalanceCheckerContract,
  getMulticallContract,
  getCatacombsContract,
  getInstaBuyContract,
  getTombOverlayContract,
  getRugRollContract,
  getNftSwapperContract,
  getZTokenSwapperContract,
  getSharkpoolContract,
  getDrBurnensteinContract,
  getRugMarketContract,
  getWhalePoolContract,
} from 'utils/contractHelpers'

/**
 * Helper hooks.ts to get specific contracts (by ABI)
 */

export const useERC20 = (address: string) => {
  const web3 = useWeb3()
  return useMemo(() => getBep20Contract(address, web3), [address, web3])
}

/**
 * @see https://docs.openzeppelin.com/contracts/3.x/api/token/erc721
 */
export const useERC721 = (address: string) => {
  const web3 = useWeb3()
  return useMemo(() => getErc721Contract(address, web3), [address, web3])
}

export const useZombie = () => {
  const web3 = useWeb3()
  return useMemo(() => getZombieContract(web3), [web3])
}

export const useMausoleum = (version?: string) => {
  const web3 = useWeb3()
  return useMemo(() => getMausoleumContract(version, web3), [version, web3])
}

export const useZombieBalanceChecker = () => {
  const web3 = useWeb3()
  return useMemo(() => getZombieBalanceCheckerContract(web3), [web3])
}

export const useDrFrankenstein = () => {
  const web3 = useWeb3()
  return useMemo(() => getDrFrankensteinContract(web3), [web3])
}

export const useSpawningPool = (address: string) => {
  const web3 = useWeb3()
  return useMemo(() => getSpawningPoolContract(address, web3), [address, web3])
}

export const useSharkpool = (id: number) => {
  const web3 = useWeb3()
  return useMemo(() => getSharkpoolContract(id, web3), [id, web3])
}

export const useNftConverter = () => {
  const web3 = useWeb3()
  return useMemo(() => getNftConverterContract(web3), [web3])
}

export const useMultiCall = () => {
  const web3 = useWeb3()
  return useMemo(() => getMulticallContract(web3), [web3])
}

export const useNftOwnership = () => {
  const web3 = useWeb3()
  return useMemo(() => getNftOwnership(web3), [web3])
}

export const usePredictionsContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getPredictionsContract(web3), [web3])
}

export const useCatacombsContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getCatacombsContract(web3), [web3])
}

export const useInstaBuyContract = (version) => {
  const web3 = useWeb3()
  return useMemo(() => getInstaBuyContract(version, web3), [version, web3])
}

export const useTombOverlay = () => {
  const web3 = useWeb3()
  return useMemo(() => getTombOverlayContract(web3), [web3])
}

export const useRugRollContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getRugRollContract(web3), [web3])
}

export const useNftSwapper = () => {
  const web3 = useWeb3()
  return useMemo(() => getNftSwapperContract(web3), [web3])
}

export const useZTokenSwapper = () => {
  const web3 = useWeb3()
  return useMemo(() => getZTokenSwapperContract(web3), [web3])
}

export const useDrBurnenstein = () => {
  const web3 = useWeb3()
  return useMemo(() => getDrBurnensteinContract(web3), [web3])
}

export const useRugMarket = () => {
  const web3 = useWeb3()
  return useMemo(() => getRugMarketContract(web3), [web3])
}

export const useWhalePoolContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getWhalePoolContract(web3), [web3])
}
