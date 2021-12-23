import tokens from '../config/constants/tokens';
import { BIG_ZERO } from '../utils/bigNumber';
import { BurnGrave } from './types';

const burnGraves: BurnGrave[] = [
    {
        id: {
            56: 3,
            97: 0,
        },
        name: 'Bitconnect Trevon',
        mintingTime: '30 days',
        burnReduction: '1 Hour',
        nftid: 75,
        isNew: true,
        isClosed: false,
        geckoId: 'rugzombie',
        depositToken: tokens.zmbe,
        depositNftId: 0,
        stakingToken: tokens.zmbe,
        endDate: 1641700800,
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
            nftMintDate: 0,
            burnedAmount: BIG_ZERO
        }
    },
    {
        id: {
            56: 4,
            97: 0,
        },
        name: 'Bitconnect Matos',
        mintingTime: '30 days',
        burnReduction: '1 Hour',
        nftid: 76,
        isNew: true,
        isClosed: false,
        geckoId: 'rugzombie',
        depositToken: tokens.zmbe,
        depositNftId: 0,
        stakingToken: tokens.zmbe,
        endDate: 1641700800,
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
            nftMintDate: 0,
            burnedAmount: BIG_ZERO
        }
    },
]

export default burnGraves;