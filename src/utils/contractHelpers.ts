import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import web3NoAccount from 'utils/web3'

// Addresses
import {
  getPredictionsAddress,
  getZombieAddress,
  getDrFrankensteinAddress,
  getMausoleumAddress,
  getRugMarketAddress,
  getNftConverterAddress,
  getMausoleumV2Address,
  getNftOwnershipAddress,
  getZombieBalanceCheckerAddress,
  getMulticallAddress,
  getCatacombsAddress,
  getInstaBuyAddress,
  getTombOverlayAddress,
  getRugRollAddress,
  getSharkPoolAddress,
  getNftSwapperAddress,
  getZTokenSwapperAddress,
  getDrBurnensteinAddress,
  getPancakeFactoryAddress,
  getApeswapFactoryAddress,
} from 'utils/addressHelpers'

// ABI
import bep20Abi from 'config/abi/erc20.json'
import erc721Abi from 'config/abi/erc721.json'
import lpTokenAbi from 'config/abi/lpToken.json'
import predictionsAbi from 'config/abi/predictions.json'
import pancakePairAbi from 'config/abi/pancakePairAbi.json'
import drFrankensteinAbi from 'config/abi/drFrankenstein.json'
import mausoleumAbi from 'config/abi/mausoleum.json'
import mausoleumV3Abi from 'config/abi/mausoleumV3.json'
import spawningPoolAbi from 'config/abi/spawningPool.json'
import nftConverterAbi from 'config/abi/nftGraveTokenConverter.json'
import nftOwnershipAbi from 'config/abi/nftOwnership.json'
import zombieBalanceCheckerAbi from 'config/abi/zombieBalanceChecker.json'
import catacombsAbi from 'config/abi/catacombs.json'
import MultiCallAbi from 'config/abi/Multicall.json'
import instaBuyAbi from 'config/abi/instaBuy.json'
import instaBuyV2Abi from 'config/abi/instaBuyV2.json'
import tombOverlayAbi from 'config/abi/tombOverlay.json'
import rugRollAbi from 'config/abi/rugRollAbi.json'
import nftSwapperAbi from 'config/abi/nftSwapper.json'
import ztokenSwapperAbi from 'config/abi/ztokenSwapper.json'
import sharkpoolAbi from 'config/abi/autosharkPool.json'
import drBurnensteinAbi from 'config/abi/drBurnenstein.json'
import pancakeFactory from 'config/abi/pancakeFactoryAbi.json'
import rugMarketAbi from 'config/abi/rugMarket.json'

export const getContract = (abi: any, address: string, web3?: Web3) => {
  const _web3 = web3 ?? web3NoAccount
  return new _web3.eth.Contract((abi as unknown) as AbiItem, address)
}

export const getBep20Contract = (address: string, web3?: Web3) => {
  return getContract(bep20Abi, address, web3)
}

export const getPancakePair = (address: string, web3?: Web3) => {
  return getContract(pancakePairAbi, address, web3)
}

export const getErc721Contract = (address: string, web3?: Web3) => {
  return getContract(erc721Abi, address, web3)
}
export const getLpContract = (address: string, web3?: Web3) => {
  return getContract(lpTokenAbi, address, web3)
}
export const getZombieContract = (web3?: Web3) => {
  return getContract(bep20Abi, getZombieAddress(), web3)
}
export const getNftOwnership = (web3?: Web3) => {
  return getContract(nftOwnershipAbi, getNftOwnershipAddress(), web3)
}
export const getZombieBalanceCheckerContract = (web3?: Web3) => {
  return getContract(zombieBalanceCheckerAbi, getZombieBalanceCheckerAddress(), web3)
}
export const getDrFrankensteinContract = (web3?: Web3) => {
  return getContract(drFrankensteinAbi, getDrFrankensteinAddress(), web3)
}
export const getMausoleumContract = (version: string, web3?: Web3) => {
  return getContract(version === 'v3' ? mausoleumV3Abi : mausoleumAbi, getMausoleumAddress(version), web3)
}
export const getMausoleumV2Contract = (web3?: Web3) => {
  return getContract(mausoleumAbi, getMausoleumV2Address(), web3)
}
export const getSpawningPoolContract = (address: string, web3?: Web3) => {
  return getContract(spawningPoolAbi, address, web3)
}
export const getSharkpoolContract = (id: number, web3?: Web3) => {
  return getContract(sharkpoolAbi, getSharkPoolAddress(id), web3)
}
export const getNftConverterContract = (web3?: Web3) => {
  return getContract(nftConverterAbi, getNftConverterAddress(), web3)
}
export const getPredictionsContract = (web3?: Web3) => {
  return getContract(predictionsAbi, getPredictionsAddress(), web3)
}
export const getCatacombsContract = (web3?: Web3) => {
  return getContract(catacombsAbi, getCatacombsAddress(), web3)
}

export const getMulticallContract = (web3?: Web3) => {
  return getContract(MultiCallAbi, getMulticallAddress(), web3)
}

export const getInstaBuyContract = (version: string, web3?: Web3) => {
  return getContract(version === 'v2' ? instaBuyV2Abi : instaBuyAbi, getInstaBuyAddress(version), web3)
}

export const getTombOverlayContract = (web3?: Web3) => {
  return getContract(tombOverlayAbi, getTombOverlayAddress(), web3)
}

export const getRugRollContract = (web3?: Web3) => {
  return getContract(rugRollAbi, getRugRollAddress(), web3)
}

export const getNftSwapperContract = (web3?: Web3) => {
  return getContract(nftSwapperAbi, getNftSwapperAddress(), web3)
}

export const getZTokenSwapperContract = (web3?: Web3) => {
  return getContract(ztokenSwapperAbi, getZTokenSwapperAddress(), web3)
}

export const getDrBurnensteinContract = (web3?: Web3) => {
  return getContract(drBurnensteinAbi, getDrBurnensteinAddress(), web3)
}

export const getPancakeFactoryContract = (web3?: Web3) => {
  return getContract(pancakeFactory, getPancakeFactoryAddress(), web3)
}

export const getApeswapFactoryContract = (web3?: Web3) => {
  return getContract(pancakeFactory, getApeswapFactoryAddress(), web3)
}

export const getRugMarketContract = (web3?: Web3) => {
  return getContract(rugMarketAbi, getRugMarketAddress(), web3)
}
