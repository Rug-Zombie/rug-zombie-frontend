import BigNumber from 'bignumber.js'
import { BigNumber as EthersBigNumber } from 'ethers'
import { chunk } from 'lodash'

import drFrankenstein from 'config/abi/drFrankenstein.json'
import bep20Abi from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
import { getDrFrankensteinAddress } from 'utils/addressHelpers'
import { GraveConfig, WhalePoolConfig } from 'config/constants/types'
import { getId } from '../../utils'
import { Grave, WhalePool, WhalePoolInfo } from '../types'

const fetchGraves = async (whalepoolConfig: WhalePoolConfig): Promise<WhalePoolInfo> => {


  return {
    mintingFeeUSD: 0,
    isApproved: false,
    isStaked: false,
    isMintable: false,
    mintRequested: false,
    mintingTime: 0,
    mintOver: false,
    isNew: false,
    endDate: 0,
  }

}

export default fetchGraves
