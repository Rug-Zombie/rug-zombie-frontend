import tokens from '../config/constants/tokens'
import artists from '../config/constants/artists'
import { BIG_ZERO } from '../utils/bigNumber'
import { BurnGrave, BurnGravePoolInfo, BurnGraveUserInfo } from './types'

const burnGraves: BurnGrave[] = [
    {
        id: {
            56: 0,
            97: 0,
        },
        name: 'Test Burn Grave',
        mintingTime: '5 Hours',
        nftid: 62,
        isNew: true,
        stakingToken: tokens.zmbe,
        poolInfo: {
            isEnabled: true,
            depositType: 0,
            depositAddress: '',
            unlockFee: BIG_ZERO,
            minimumStake: BIG_ZERO,
            mintingTime: BIG_ZERO,
            tokensToBurn: BIG_ZERO,
            burnReduction: 0,
            maxBurned: BIG_ZERO,
            totalStaked: BIG_ZERO,
            totalBurned: BIG_ZERO
        },
        userInfo: {
            stakedAmount: BIG_ZERO,
            hasDeposited: false,
            hasUnlocked: false,
            nftMintDate: BIG_ZERO,
            burnedAmount: BIG_ZERO
        }
    }
]

export default burnGraves;