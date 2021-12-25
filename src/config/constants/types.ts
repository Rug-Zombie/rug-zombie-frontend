export interface Address {
  97?: string
  56: string
}

export interface Id {
  97?: number
  56: number
}

export interface Token {
  symbol: string
  address?: Address
  decimals?: number
  projectLink?: string
  tokenLogo?: string
}

export enum PoolIds {
  poolBasic = 'poolBasic',
  poolUnlimited = 'poolUnlimited',
}

interface IfoPoolInfo {
  saleAmount: string
  raiseAmount: string
  cakeToBurn: string
  distributionRatio: number // Range [0-1]
}

export interface Ifo {
  id: string
  isActive: boolean
  address: string
  name: string
  currency: Token
  token: Token
  releaseBlockNumber: number
  articleUrl: string
  campaignId: string
  tokenOfferingPrice: number
  isV1: boolean
  [PoolIds.poolBasic]?: IfoPoolInfo
  [PoolIds.poolUnlimited]: IfoPoolInfo
}

export enum PoolCategory {
  'COMMUNITY' = 'Community',
  'CORE' = 'Core',
  'BINANCE' = 'Binance', // Graves using native BNB behave differently than pools using a token
  'AUTO' = 'Auto',
}

export interface FarmConfig {
  pid: number
  lpSymbol: string
  lpAddresses: Address
  token: Token
  quoteToken: Token
  multiplier?: string
  isCommunity?: boolean
  dual?: {
    rewardPerBlock: number
    earnLabel: string
    endBlock: number
  }
}

export enum Dex {
  ZOMBIE_SWAP,
  PCS_V1,
  PCS_V2,
  AUTOSHARK,
  APESWAP
}

export enum UserActivityType {
  DrFDeposit,
  DrFWithdraw,
  DrFWithdrawEarly,
  DrFHarvest,
  DrFMintNft,
}

export interface GraveConfig {
  pid: Id,
  name: string,
  nftId: number,
  nft?: number,
  depositNftId?: number,
  isNew?: boolean,
  isClosed?: boolean,
  endDate?: number,
  startingDate?: number,
  nftConverterPid?: number, // remove move to own type
  graveNftToken?: string,   // remove move to own type
  additionalDetails?: any[],
  rug: Token,
  rugDex?: Dex,
  liquidityDetails?: string,
  isRetired?: boolean
}

export interface TombConfig {
  id: number,
  pid: Id,
  overlayId?: Id,
  token1: Token,
  token2: Token,
  dex: Dex,
  lpAddress: Address,
  notNativeDex?: boolean,
  isNew?: boolean,
}

export interface SpawningPoolConfig {
  id: number,
  name: string,
  address: Address,
  project: any,
  endBlock: number,
  endDate: number,
  isNew?: boolean,
  rewardToken: Token,
  dex: Dex,
  nftId: number,
  color?: string,
}

export interface PoolConfig {
  sousId: number
  earningToken: Token
  stakingToken: Token
  stakingLimit?: number
  contractAddress: Address
  poolCategory: PoolCategory
  tokenPerBlock: string
  sortOrder?: number
  harvest?: boolean
  isFinished?: boolean
}

export interface Artist {
  name: string,
  twitter?: string,
  instagram?: string,
}

export type PageMeta = {
  title: string
  description?: string
  image?: string
}
