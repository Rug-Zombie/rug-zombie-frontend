import { BigNumber } from 'bignumber.js'
import { BIG_ZERO } from '../utils/bigNumber'
import { TombOverlay } from './types'

export const DEFAULT_USER_INFO = {
    nextNftMintDate: 0,
    isMinting: false,
    randomNumber: 0,
    nftMintTime: new BigNumber(2**256 - 1)
}

const DEFAULT_POOL_INFO = {
    poolId: 0,
    isEnabled: false,
    mintingTime: 0,
    mintingFee: BIG_ZERO
}

const tombOverlays: TombOverlay[] = [
    {
        id: 0,
        pid: {
            56: 1,
            97: 2,
        },
        poolId: {
            56: 17,
            97: 2,
        },
        mintingTime: '14 days',
        commonId: 44,
        uncommonId: 45,
        rareId: 46,
        legendaryId: 48,
        userInfo: { ...DEFAULT_USER_INFO },
        poolInfo: { ...DEFAULT_POOL_INFO }
    },
    {
        id: 1,
        pid: {
            56: 0,
            97: 1,
        },
        poolId: {
            56: 29,
            97: 4,
        },
        mintingTime: '14 days',
        commonId: 44,
        uncommonId: 45,
        rareId: 46,
        legendaryId: 47,
        userInfo: { ...DEFAULT_USER_INFO },
        poolInfo: { ...DEFAULT_POOL_INFO }
    },
    {
        id: 2,
        pid: {
            56: 2,
            97: 1,
        },
        poolId: {
            56: 11,
            97: 4,
        },
        mintingTime: '14 days',
        commonId: 44,
        uncommonId: 45,
        rareId: 46,
        legendaryId: 78,
        userInfo: { ...DEFAULT_USER_INFO },
        poolInfo: { ...DEFAULT_POOL_INFO }
    },
]

export default tombOverlays