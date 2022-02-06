import { useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { useSelector } from 'react-redux'
import { orderBy } from 'lodash'
import { getAddress } from 'utils/addressHelpers'
import axios from 'axios'
import { State } from './types'
import { getContract, getPancakePair } from '../utils/contractHelpers'
import pancakeFactoryAbi from '../config/abi/pancakeFactoryAbi.json'
import tokens from '../config/constants/tokens'
import contracts from '../config/constants/contracts'

export const getBnbPriceinBusd = () => {
  return axios.get('https://api.binance.com/api/v3/avgPrice?symbol=BNBBUSD')
}

export const fetchZmbeBnbAddress = (): Promise<string> => {
  return getContract(pancakeFactoryAbi, getAddress(contracts.pancakeFactory)).methods.getPair(getAddress(tokens.zmbe.address), getAddress(tokens.wbnb.address)).call()
}

export const fetchLpReserves = (address): Promise<any> => {
  return getPancakePair(address).methods.getReserves().call()
}

// Block
export const useBlock = () => {
  return useSelector((state: State) => state.block)
}

export const useInitialBlock = () => {
  return useSelector((state: State) => state.block.initialBlock)
}

// Mausoleum
export const useIsHistoryPaneOpen = () => {
  return useSelector((state: State) => state.predictions.isHistoryPaneOpen)
}

export const useIsChartPaneOpen = () => {
  return useSelector((state: State) => state.predictions.isChartPaneOpen)
}

export const useGetRounds = () => {
  return useSelector((state: State) => state.predictions.rounds)
}

export const useGetSortedRounds = () => {
  const roundData = useGetRounds()
  return orderBy(Object.values(roundData), ['epoch'], ['asc'])
}

export const useGetCurrentEpoch = () => {
  return useSelector((state: State) => state.predictions.currentEpoch)
}

export const useGetIntervalBlocks = () => {
  return useSelector((state: State) => state.predictions.intervalBlocks)
}

export const useGetBufferBlocks = () => {
  return useSelector((state: State) => state.predictions.bufferBlocks)
}

export const useGetGraves = () => {
  return useSelector((state: State) => state.graves)
}

export const useGetTombs = () => {
  return useSelector((state: State) => state.tombs)
}

export const useGetSpawningPools = () => {
  return useSelector((state: State) => state.spawningPools)
}

export const useGetUserActivities = () => {
  return useSelector((state: State) => state.userActivity)
}



export {
  useGetNfts,
  useGetNftById,
  useGetNftTotalSupply,
} from './nfts/hooks'

export const useGetTotalIntervalBlocks = () => {
  const intervalBlocks = useGetIntervalBlocks()
  const bufferBlocks = useGetBufferBlocks()
  return intervalBlocks + bufferBlocks
}

export const useGetRound = (id: string) => {
  const rounds = useGetRounds()
  return rounds[id]
}

export const useGetCurrentRound = () => {
  const currentEpoch = useGetCurrentEpoch()
  const rounds = useGetSortedRounds()
  return rounds.find((round) => round.epoch === currentEpoch)
}

export const useGetPredictionsStatus = () => {
  return useSelector((state: State) => state.predictions.status)
}

export const useGetHistoryFilter = () => {
  return useSelector((state: State) => state.predictions.historyFilter)
}

export const useGetCurrentRoundBlockNumber = () => {
  return useSelector((state: State) => state.predictions.currentRoundStartBlockNumber)
}

export const useGetMinBetAmount = () => {
  const minBetAmount = useSelector((state: State) => state.predictions.minBetAmount)
  return useMemo(() => new BigNumber(minBetAmount), [minBetAmount])
}

export const useGetIsFetchingHistory = () => {
  return useSelector((state: State) => state.predictions.isFetchingHistory)
}

export const useGetHistory = () => {
  return useSelector((state: State) => state.predictions.history)
}

export const useGetHistoryByAccount = (account: string) => {
  const bets = useGetHistory()
  return bets ? bets[account] : []
}

export const useGetBetByRoundId = (account: string, roundId: string) => {
  const bets = useSelector((state: State) => state.predictions.bets)

  if (!bets[account]) {
    return null
  }

  if (!bets[account][roundId]) {
    return null
  }

  return bets[account][roundId]
}
