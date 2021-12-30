import { BIG_ZERO } from '../utils/bigNumber'
import * as types from './actionTypes'
import tombs from './tombs'
import graves from './graves'
import nfts from './nfts'
import spawningPools from './spawningPools'
import sharkPools from './sharkPools'
import auctions from './auctions'
import burnGraves from './burnGraves'
import { getId } from '../utils'
import tombOverlays from './tombOverlays'
import barracks from './barracks'
import rugMarketListings from "./rugMarketListings";
import {RugMarketListing} from "./types";

const defaultState = {
  account: '',
  tombs,
  tombOverlays,
  graves,
  burnGraves,
  nfts,
  barracks,
  spawningPools,
  sharkPools,
  bnbPriceUsd: 0,
  auctions,
  bnbBalance: BIG_ZERO,
  rugMarketListings,
  zombie: {
    allowance: BIG_ZERO,
    totalSupply: BIG_ZERO,
    balance: BIG_ZERO,
    priceBnb: BIG_ZERO,
  },
  drFrankenstein: {
    zombieBalance: BIG_ZERO,
    totalAllocPoint: BIG_ZERO
  },
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case types.UPDATE_ACCOUNT:
      return {
        ...state,
        account: action.payload.account,
      }
    case types.UPDATE_ZOMBIE_ALLOWANCE:
      return {
        ...state,
        zombie: { ...state.zombie, allowance: action.payload.allowance },
      }
    case types.UPDATE_ZOMBIE_TOTAL_SUPPLY:
      return {
        ...state,
        zombie: { ...state.zombie, totalSupply: action.payload.totalSupply },
      }
    case types.UPDATE_ZOMBIE_BALANCE:
      return {
        ...state,
        zombie: { ...state.zombie, balance: action.payload.balance },
      }
    case types.UPDATE_ZOMBIE_PRICE_BNB:
      return {
        ...state,
        zombie: { ...state.zombie, priceBnb: action.payload.zombiePriceBnb },
      }
    case types.UPDATE_BNB_PRICE_USD:
      return {
        ...state,
        bnbPriceUsd: action.payload.bnbPriceUsd,
      }
    case types.UPDATE_GRAVE_POOL_INFO:
      return {
        ...state,
        graves: state.graves.map(grave => getId(grave.pid) === action.payload.pid ? { ...grave, poolInfo: { ...grave.poolInfo, ...action.payload.poolInfo } } : grave),
      }
    case types.UPDATE_GRAVE_USER_INFO:
      return {
        ...state,
        graves: state.graves.map(grave => getId(grave.pid) === action.payload.pid ? { ...grave, userInfo: { ...grave.userInfo, ...action.payload.userInfo } } : grave),
      }
    case types.UPDATE_TOMB_USER_INFO:
      return {
        ...state,
        tombs: state.tombs.map(tomb => getId(tomb.pid) === action.payload.pid ? { ...tomb, userInfo: { ...tomb.userInfo, ...action.payload.userInfo } } : tomb),
      }
    case types.UPDATE_TOMB_POOL_INFO:
      return {
        ...state,
        tombs: state.tombs.map(tomb => getId(tomb.pid) === action.payload.pid ? { ...tomb, poolInfo: { ...tomb.poolInfo, ...action.payload.poolInfo } } : tomb),
      }
    case types.UPDATE_SPAWNING_POOL_INFO:
      return {
        ...state,
        spawningPools: state.spawningPools.map(spawningPool => spawningPool.id === action.payload.id ? { ...spawningPool, poolInfo: { ...spawningPool.poolInfo, ...action.payload.poolInfo } } : spawningPool),
      }
    case types.UPDATE_SPAWNING_POOL_USER_INFO:
      return {
        ...state,
        spawningPools: state.spawningPools.map(spawningPool => spawningPool.id === action.payload.id ? { ...spawningPool, userInfo: { ...spawningPool.userInfo, ...action.payload.userInfo } } : spawningPool),
      }
    case types.UPDATE_DR_FRANKENSTEIN_ZOMBIE_BALANCE:
      return {
        ...state,
        drFrankenstein: { ...state.drFrankenstein, zombieBalance: action.payload.zombieBalance },
      }
    case types.UPDATE_DR_FRANKENSTEIN_TOTAL_ALLOC_POINT:
      return {
        ...state,
        drFrankenstein: { ...state.drFrankenstein, totalAllocPoint: action.payload.totalAllocPoint },
      }
    case types.UPDATE_NFT_TOTAL_SUPPLY:
      return {
        ...state,
        nfts: state.nfts.map(nft => nft.id === action.payload.id ? { ...nft, totalSupply: action.payload.totalSupply } : nft)
      }
    case types.UPDATE_AUCTION_INFO:
      return {
        ...state,
        auctions: state.auctions.map(auction => auction.id === action.payload.id ? { ...auction, auctionInfo: { ...auction.auctionInfo, ...action.payload.auctionInfo } } : auction)
      }
    case types.UPDATE_AUCTION_USER_INFO:
      return {
        ...state,
        auctions: state.auctions.map(auction => auction.id === action.payload.id ? { ...auction, userInfo: { ...auction.userInfo, ...action.payload.userInfo } } : auction)
      }
    case types.UPDATE_NFT_USER_INFO:
      return {
        ...state,
        nfts: state.nfts.map(nft => nft.id === action.payload.id ? { ...nft, userInfo: { ...nft.userInfo, ...action.payload.userInfo } } : nft)
      }
    case types.UPDATE_BNB_BALANCE:
      return {
        ...state,
        bnbBalance: action.payload.bnbBalance
      }
    case types.UPDATE_TOMB_OVERLAY_POOL_INFO:
      return {
        ...state,
        tombOverlays: state.tombOverlays.map(tombOverlay => getId(tombOverlay.pid) === action.payload.pid ? { ...tombOverlay, poolInfo: { ...tombOverlay.poolInfo, ...action.payload.poolInfo } } : tombOverlay),
      }  
    case types.UPDATE_TOMB_OVERLAY_USER_INFO:
      return {
        ...state,
        tombOverlays: state.tombOverlays.map(tombOverlay => getId(tombOverlay.pid) === action.payload.pid ? { ...tombOverlay, userInfo: { ...tombOverlay.userInfo, ...action.payload.userInfo } } : tombOverlay),
      }  
    case types.UPDATE_SHARKPOOL_INFO:
      return {
        ...state,
        sharkPools: state.sharkPools.map(sharkPool => sharkPool.id === action.payload.id ? { ...sharkPool, poolInfo: { ...sharkPool.poolInfo, ...action.payload.poolInfo } } : sharkPool),
      }
    case types.UPDATE_SHARKPOOL_USER_INFO:
      return {
        ...state,
        sharkPools: state.sharkPools.map(sharkPool => sharkPool.id === action.payload.id ? { ...sharkPool, userInfo: { ...sharkPool.userInfo, ...action.payload.userInfo } } : sharkPool),
      }
    case types.UPDATE_BARRACK_INFO:
      return {
        ...state,
        barracks: state.barracks.map(barrack => barrack.id === action.payload.id ? { ...barrack, barrackInfo: { ...barrack.barrackInfo, ...action.payload.barrackInfo } } : barrack),
      }
    case types.UPDATE_BARRACK_USER_INFO:
      return {
        ...state,
        barracks: state.barracks.map(barrack => barrack.id === action.payload.id ? { ...barrack, barrackUserInfo: { ...barrack.barrackUserInfo, ...action.payload.barrackUserInfo } } : barrack),
      }
    case types.ADD_RUG_MARKET_LISTING:
      return {
        ...state,
        rugMarketListings: pushListingIfNotExists(action.payload.listing),
      }
    case types.UPDATE_RUG_MARKET_LISTING:
      return {
        ...state,
        rugMarketListings: pushListingIfNotExists(action.payload.listing),
      }
    case types.MARK_RUG_MARKET_LISTING_SOLD:
      return {
        ...state,
        rugMarketListings: markRugMarketListingSold(action.payload.listingId),
      }
    case types.CANCEL_RUG_MARKET_LISTING:
      return {
        ...state,
        rugMarketListings: cancelRugMarketListing(action.payload.listingId),
      }

    case types.UPDATE_BURNGRAVE_POOL_INFO:
      return {
        ...state,
        burnGraves: state.burnGraves.map(burnGrave => getId(burnGrave.id) === action.payload.id ? { ...burnGrave, poolInfo: { ...burnGrave.poolInfo, ...action.payload.poolInfo } } : burnGrave),
      }

    case types.UPDATE_BURNGRAVE_USER_INFO:
      return {
        ...state,
        burnGraves: state.burnGraves.map(burnGrave => getId(burnGrave.id) === action.payload.id ? { ...burnGrave, userInfo: { ...burnGrave.userInfo, ...action.payload.userInfo } } : burnGrave),
      }

    default:
      return state
  }
}

function cancelRugMarketListing(listingId): RugMarketListing[] {
  const index = rugMarketListings.findIndex(listing => listing.id === listingId);
  const listings = rugMarketListings;
  // @ts-ignore
  listings[index].state = '2';
  return listings
}

function markRugMarketListingSold(listingId): RugMarketListing[] {
  const index = rugMarketListings.findIndex(listing => listing.id === listingId);
  const listings = rugMarketListings;
  // @ts-ignore
  listings[index].state = '1';
  return listings
}

function pushListingIfNotExists(newListing): RugMarketListing[] {
  const index = rugMarketListings.findIndex(listing => listing.id === newListing.id);
  const listings = rugMarketListings;
  if (index === -1) {
    listings.push(newListing)
  }
  return listings
}