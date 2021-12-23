import { BigNumber } from 'bignumber.js'
import axios from 'axios'
import store from './store'
import { Grave, Tomb, SpawningPool, UserInfo, Auction, TombOverlay, SharkPool, BurnGrave, Barrack, RugMarketListing} from './types'
import { BIG_ZERO } from '../utils/bigNumber'
import { getBalanceAmount } from '../utils/formatBalance'
import { getId } from '../utils'
import { Id } from '../config/constants/types'
import * as actions from './actions'

export const account = (): string => {
  return store.getState().account
}

export const zombieAllowance = (): BigNumber => {
  return store.getState().zombie.allowance
}

export const zombieBalance = (): BigNumber => {
  return store.getState().zombie.balance
}

export const bnbBalance = (): BigNumber => {
  return store.getState().bnbBalance
}

export const zombieTotalSupply = (): BigNumber => {
  return store.getState().zombie.totalSupply
}

export const zombiePriceBnb = (): BigNumber => {
  return store.getState().zombie.priceBnb
}

export const bnbPriceUsd = (): number => {
  return store.getState().bnbPriceUsd
}

export const zombiePriceUsd = (): number => {
  return (zombiePriceBnb().times(bnbPriceUsd())).toNumber()
}

export const drFrankensteinZombieBalance = (): BigNumber => {
  return store.getState().drFrankenstein.zombieBalance
}

export const totalAllocPoint = (): BigNumber => {
  return store.getState().drFrankenstein.totalAllocPoint
}

export const tombByPid = (pid: number): Tomb => {
  return store.getState().tombs.find(t => getId(t.pid) === pid)
}

export const coingeckoPrice = (id: string) => {
  return axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`)
}

export const zmbeBnbTomb = (): Tomb => {
  const pancakeZmbeBnbTombPid: Id = {
    56: 11,
    97: 2
  }
  return tombByPid(getId(pancakeZmbeBnbTombPid))
}

export const graveByPid = (pid: number): Grave => {
  return store.getState().graves.find(g => getId(g.pid) === pid)
}

export const graves = (): Grave[] => {
  return store.getState().graves
}

export const graveUserInfo = (pid: number): UserInfo => {
  return store.getState().graves[pid].userInfo
}

export const spawningPools = (): SpawningPool[] => {
  return store.getState().spawningPools
}

export const sharkPools = (): SharkPool[] => {
  return store.getState().sharkPools;
}

export const barracks = (): Barrack[] => {
  return store.getState().barracks;
}

export const spawningPoolById = (id: number): SpawningPool => {
  return store.getState().spawningPools.find(p => p.id === id)
}

export const sharkPoolById = (id: number): SharkPool => {
  return store.getState().sharkPools.find(a => a.id === id);
}

export const barrackById = (id: number): Barrack => {
  return store.getState().barracks.find(b => b.id === id);
}

export const grave = (pid: number): Grave => {
  return store.getState().graves.find(g => getId(g.pid) === pid)
}

export const tombs = (): Tomb[] => {
  return store.getState().tombs
}

export const auctions = (): Auction[] => {
  return store.getState().auctions
}

export const auctionById = (id: number): Auction => {
  return auctions().find(a => a.id === id)
}

export const nfts = () => {
  return store.getState().nfts
}

export const nftByName = (name: string) => {
  return nfts().find(n => n.name === name)
}

export const nftById = (id: number) => {
  return nfts().find(n => n.id === id)
}

export const nftTotalSupply = (): BigNumber => {
  let totalSupply = BIG_ZERO
  nfts().forEach(nft => {
    totalSupply = totalSupply.plus(nft.totalSupply)
  })
  return totalSupply
}

// store lpreserves
export const zmbeBnbLpPriceBnb = () => {
  const { poolInfo: { reserves, lpTotalSupply }} = zmbeBnbTomb()
  const reservesBnb = [new BigNumber(reserves[0]).times(zombiePriceBnb()), getBalanceAmount(reserves[1])]
  const bnbLpTokenPrice = reservesBnb[0].plus(reservesBnb[1]).div(lpTotalSupply)
  return bnbLpTokenPrice
}

export const zmbeBnbLpPriceUsd = () => {
  return zmbeBnbLpPriceBnb().times(bnbPriceUsd())
}

export const zmbePerZmbeBnbLp = () => {
  const { poolInfo: {reserves, lpTotalSupply } } = zmbeBnbTomb()
  return reserves[0].div(lpTotalSupply)
}

export const tombOverlays = (): TombOverlay[] => {
  return store.getState().tombOverlays;
}

export const tombOverlayByPoolId = (poolId: number): TombOverlay => {
  return store.getState().tombOverlays.find(t => getId(t.pid) === poolId)
}

export const burnGraves = (): BurnGrave[] => {
  return store.getState().burnGraves
}

export const burnGraveById = (id: number): BurnGrave => {
  return store.getState().burnGraves.find(a => getId(a.id) === id);
}

export const rugMarketListings = (filter, wallet): RugMarketListing[] => {
  switch (filter) {
    case 0:
      return store.getState().rugMarketListings.filter(listing => listing.state === "0" && listing.owner !== wallet);
      break
    case 1:
      return store.getState().rugMarketListings.filter(listing => listing.owner === wallet);
      break
    case 2:
      return store.getState().rugMarketListings.filter(listing => listing.state === "1");
      break
    default:
      return store.getState().rugMarketListings
  }
}

export const rugMarketListingById = (id: number): RugMarketListing => {
  return store.getState().rugMarketListings.find(listing => listing.id === id);
}

export const markRugMarketListingSold = (id: number) => {
  store.dispatch(actions.markRugMarketListingSold(id))
}

export const cancelRugMarketListing = (id: number) => {
  store.dispatch(actions.cancelRugMarketListing(id))
}