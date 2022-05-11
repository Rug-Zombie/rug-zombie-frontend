import {getZombieAddress, getZombieAddressForPrices} from '../../utils/addressHelpers'
import { TokenPrices } from '../types'

export interface PriceApiResultInfo {
  name: string
  symbol: string
  price: string
  // eslint-disable-next-line camelcase
  price_BNB: string
}

export interface PriceApiResponse {
  /* eslint-disable camelcase */
  updated_at: string
  data: PriceApiResultInfo
}

export interface PluralPriceApiResponse {
  /* eslint-disable camelcase */
  updated_at: string
  data: { [key: string]: PriceApiResultInfo }
}

const infoToTokenPrices = ({ price, price_BNB }: PriceApiResultInfo): TokenPrices => ({
  priceUsd: parseFloat(price),
  priceBnb: parseFloat(price_BNB),
})

const fetchPrices = async () => {
  const zombieAddress = getZombieAddressForPrices()
  const [topTokensResponse, zombieResponse] = await Promise.all([
    fetch('https://api.pancakeswap.info/api/v2/tokens'),
    fetch(`https://api.pancakeswap.info/api/v2/tokens/${zombieAddress}`),
  ])

  const data = (await topTokensResponse.json()) as PluralPriceApiResponse
  const zombieData = (await zombieResponse.json()) as PriceApiResponse

  const prices = Object.entries(data.data).reduce(
    (accum, [token, info]) => ({
      ...accum,
      [token.toLowerCase()]: infoToTokenPrices(info),
    }),
    {},
  )
  prices[zombieAddress.toLowerCase()] = infoToTokenPrices(zombieData.data)

  // Return normalized token names
  return {
    updatedAt: data.updated_at,
    // eslint-disable-next-line camelcase
    prices,
  }
}

export default fetchPrices
