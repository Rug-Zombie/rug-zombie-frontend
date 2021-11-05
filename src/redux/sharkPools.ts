import tokens from '../config/constants/tokens'
import artists from '../config/constants/artists'
import { BIG_ZERO } from '../utils/bigNumber'
import { SharkPool } from './types'

const sharkPools: SharkPool[] = [
    {
        id: 0,
        name: 'AutoShark Flash Loan Pool',
        isNew: true,
        address: {
            56: '',
            97: '0x1cfB376e57ae798F325EC6156Be7c29D25F31088',
        },
        geckoId: 'autoshark',
        nft: 52,
        stakeToken: tokens.jaws,
        depositToken: tokens.cjaws,
        poolInfo: {
            unlockFee: BIG_ZERO,
            minStake: BIG_ZERO,
            maxStake: BIG_ZERO,
            depositTaxRate: 0,
            requiresDeposit: true,
            totalStaked: BIG_ZERO,
            minStakeTime: BIG_ZERO
        },
        userInfo: {
            stakedAmount: BIG_ZERO,
            paidUnlock: false,
            paidDeposit: false,
            nftMintDate: BIG_ZERO
        }
    }
]

export default sharkPools;