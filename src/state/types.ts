import BigNumber from 'bignumber.js'

import { Address, Artist, GraveConfig, SpawningPoolConfig, TombConfig, UserActivityType } from 'config/constants/types'

export type TranslatableText =
  | string
  | {
      key: string
      data?: {
        [key: string]: string | number
      }
    }

export interface GraveUserInfo {
  paidUnlockFee: boolean
  rugDeposited: BigNumber
  rugAllowance: BigNumber
  rugBalance: BigNumber
  zombieAllowance: BigNumber
  zombieBalance: BigNumber
  tokenWithdrawalDate: BigNumber
  nftMintDate: BigNumber
  amount: BigNumber
  pendingZombie: BigNumber
}

export interface GravePoolInfo {
  lpToken: string
  allocPoint: BigNumber
  weight: BigNumber
  unlockFee: BigNumber
  minimumStake: BigNumber
  tokenAmount: BigNumber
  withdrawCooldown: BigNumber
  nftMintTime: BigNumber
}

export interface Grave extends GraveConfig {
  userInfo?: GraveUserInfo
  poolInfo: GravePoolInfo
}

export interface WhalePool {
  nftId: 39 // nft id for whale nfts
  stakedNftId: number
  mintingFeeUSD: number
  isApproved: boolean
  isStaked: boolean
  isMintable: boolean
  mintRequested: boolean
  mintingTime: number
  mintOver: boolean
  isNew: boolean
  endDate: number
}

export interface TombUserInfo {
  tokenWithdrawalDate: BigNumber
  nftMintTime: BigNumber
  amount: BigNumber
  pendingZombie: BigNumber
  lpBalance: BigNumber
  lpAllowance: BigNumber
  randomNumber: BigNumber
  isMinting: boolean
}

export interface TombPoolInfo {
  allocPoint: BigNumber
  weight: BigNumber
  tokenAmount: BigNumber
  withdrawCooldown: BigNumber
  nftMintTime: BigNumber
  mintingFee: BigNumber
  lpPriceBnb: BigNumber
  lpReserves: [BigNumber, BigNumber]
  lpTotalSupply: BigNumber
}

export interface Tomb extends TombConfig {
  userInfo?: TombUserInfo
  poolInfo: TombPoolInfo
}

export interface SpawningPoolInfo {
  rewardPerBlock: BigNumber
  unlockFee: BigNumber
  minimumStake: BigNumber
  totalAmount: BigNumber
  withdrawCooldown: BigNumber
  nftMintTime: BigNumber
  rewardTokenPriceBnb: BigNumber
}

export interface SpawningPoolUserInfo {
  paidUnlockFee: boolean
  tokenWithdrawalDate: BigNumber
  nftMintDate: BigNumber
  amount: BigNumber
  pendingReward: BigNumber
  zombieAllowance: BigNumber
  zombieBalance: BigNumber
}

export interface SpawningPool extends SpawningPoolConfig {
  userInfo?: SpawningPoolUserInfo
  poolInfo: SpawningPoolInfo
}

export interface UserActivity {
  type: UserActivityType
  timestamp: number
  data: Record<string, any>
}

// Slices states

export interface GravesState {
  data: Grave[]
  userDataLoaded: boolean
}

export interface TombsState {
  data: Tomb[]
  userDataLoaded: boolean
}

export interface SpawningPoolState {
  data: SpawningPool[]
  userDataLoaded: boolean
}

export interface UserActivityState {
  data: UserActivity[]
  userDataLoaded: boolean
}

export interface GraveState {
  data: Grave[]
  userDataLoaded: boolean
}

export interface TokenPrices {
  priceUsd: number
  priceBnb: number
}

export interface TokenPriceMap {
  [key: string]: TokenPrices
}

export interface PriceApiThunk {
  updatedAt: string
  prices: TokenPriceMap
}

export interface PriceState {
  lastUpdated: string
  prices: { [key: string]: TokenPrices }
}

// Block

export interface BlockState {
  currentBlock: number
  initialBlock: number
}

// Graveyard

export interface NftUserInfo {
  ownedIds: number[]
}

export interface Nft {
  id: number
  name: string
  description: string
  symbol: string
  address: Address
  totalSupply: BigNumber
  path: string
  type: string
  rarity: string
  artist?: Artist
  userInfo: NftUserInfo
}

export interface NftState {
  data: Nft[]
  userDataLoaded: boolean
}

// Mausoleum

export enum BetPosition {
  BULL = 'Bull',
  BEAR = 'Bear',
  HOUSE = 'House',
}

export enum PredictionStatus {
  INITIAL = 'initial',
  LIVE = 'live',
  PAUSED = 'paused',
  ERROR = 'error',
}

export interface Round {
  id: string
  epoch: number
  failed?: boolean
  startBlock: number
  startAt: number
  lockAt: number
  lockBlock: number
  lockPrice: number
  endBlock: number
  closePrice: number
  totalBets: number
  totalAmount: number
  bullBets: number
  bearBets: number
  bearAmount: number
  bullAmount: number
  position: BetPosition
  bets?: Bet[]
}

export interface Market {
  id: string
  paused: boolean
  epoch: number
}

export interface Bet {
  id: string
  hash: string
  amount: number
  position: BetPosition
  claimed: boolean
  user: PredictionUser
  round: Round
}

export interface PredictionUser {
  id: string
  address: string
  block: number
  totalBets: number
  totalBNB: number
}

export interface RoundData {
  [key: string]: Round
}

export interface HistoryData {
  [key: string]: Bet[]
}

export interface BetData {
  [key: string]: {
    [key: string]: Partial<Bet>
  }
}

export enum HistoryFilter {
  ALL = 'all',
  COLLECTED = 'collected',
  UNCOLLECTED = 'uncollected',
}

export interface PredictionsState {
  status: PredictionStatus
  isLoading: boolean
  isHistoryPaneOpen: boolean
  isChartPaneOpen: boolean
  isFetchingHistory: boolean
  historyFilter: HistoryFilter
  currentEpoch: number
  currentRoundStartBlockNumber: number
  intervalBlocks: number
  bufferBlocks: number
  minBetAmount: string
  rounds: RoundData
  history: HistoryData
  bets: BetData
}

// Global state

export interface State {
  block: BlockState
  prices: PriceState
  graves: GraveState
  tombs: TombsState
  spawningPools: SpawningPoolState
  userActivity: UserActivityState
  predictions: PredictionsState
  nfts: NftState
}
