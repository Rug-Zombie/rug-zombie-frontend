import tokens from '../config/constants/tokens';
import { BIG_ZERO } from '../utils/bigNumber';
import { BurnGrave } from './types';

const burnGraves: BurnGrave[] = [
    {
        id: {
            56: 0,
            97: 0,
        },
        name: 'No Deposit Burn Grave',
        mintingTime: '5 Hours',
        burnReduction: '1 Hour',
        nftid: 62,
        isNew: true,
        isClosed: false,
        geckoId: 'rugzombie',
        depositToken: tokens.zmbe,
        depositNftId: 0,
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
            nftMintDate: 0,
            burnedAmount: BIG_ZERO
        }
    },
    // {
    //     id: {
    //         56: 1,
    //         97: 1,
    //     },
    //     name: 'Token Deposit Burn Grave',
    //     mintingTime: '3 Days',
    //     burnReduction: '1 Day',
    //     nftid: 62,
    //     isNew: true,
    //     isClosed: false,
    //     geckoId: 'rugzombie',
    //     depositToken: tokens.zmbe,
    //     depositNftId: 0,
    //     stakingToken: tokens.zmbe,
    //     poolInfo: {
    //         isEnabled: true,
    //         depositType: 0,
    //         depositAddress: '',
    //         unlockFee: BIG_ZERO,
    //         minimumStake: BIG_ZERO,
    //         mintingTime: BIG_ZERO,
    //         tokensToBurn: BIG_ZERO,
    //         burnReduction: 0,
    //         maxBurned: BIG_ZERO,
    //         totalStaked: BIG_ZERO,
    //         totalBurned: BIG_ZERO
    //     },
    //     userInfo: {
    //         stakedAmount: BIG_ZERO,
    //         hasDeposited: false,
    //         hasUnlocked: false,
    //         nftMintDate: 0,
    //         burnedAmount: BIG_ZERO
    //     }
    // },
    // {
    //     id: {
    //         56: 2,
    //         97: 2,
    //     },
    //     name: 'NFT Deposit Burn Grave',
    //     mintingTime: '3 Days',
    //     burnReduction: '1 Day',
    //     nftid: 62,
    //     isNew: true,
    //     isClosed: false,
    //     geckoId: 'rugzombie',
    //     depositToken: tokens.zmbe,
    //     depositNftId: 6,
    //     stakingToken: tokens.zmbe,
    //     poolInfo: {
    //         isEnabled: true,
    //         depositType: 0,
    //         depositAddress: '',
    //         unlockFee: BIG_ZERO,
    //         minimumStake: BIG_ZERO,
    //         mintingTime: BIG_ZERO,
    //         tokensToBurn: BIG_ZERO,
    //         burnReduction: 0,
    //         maxBurned: BIG_ZERO,
    //         totalStaked: BIG_ZERO,
    //         totalBurned: BIG_ZERO
    //     },
    //     userInfo: {
    //         stakedAmount: BIG_ZERO,
    //         hasDeposited: false,
    //         hasUnlocked: false,
    //         nftMintDate: 0,
    //         burnedAmount: BIG_ZERO
    //     }
    // }
]

export default burnGraves;