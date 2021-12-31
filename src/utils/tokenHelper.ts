import { Token } from '../config/constants/types'
import tokens from '../config/constants/tokens'
import { getAddress } from './addressHelpers'

// eslint-disable-next-line import/prefer-default-export
export const tokenByAddress = (address: string): Token => {
  const keys = Object.keys(tokens)
  const values = Object.values(tokens)
  const keyIndex = values.findIndex(v => getAddress(v.address).toLowerCase() === address.toLowerCase())
  return tokens[keys[keyIndex]]
}