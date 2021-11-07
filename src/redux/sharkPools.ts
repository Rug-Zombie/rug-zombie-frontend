import tokens from '../config/constants/tokens';
import { BIG_ZERO } from '../utils/bigNumber';
import { SharkPool } from './types';

const sharkPools: SharkPool[] = 
[
    {
        id: 0,
        name: 'AutoShark Flash Loan Pool',
        isNew: true,
        address: {
            56: '',
            97: '0x644adD6D85C6dEcE068f7019c899856e6FF571b6',
        },
        geckoId: 'autoshark',
        nft: 52,
        mintTime: '2 Minutes',
        stakeToken: tokens.jaws,
        depositToken: tokens.cjaws,
        project: {
            name: 'AutoShark',
            description: 'AutoShark flash loan attack NFT pool',
            additionalDetails: [
              {
                name: 'Project website',
                url: 'https://autoshark.finance',
              },
              {
                name: 'Compensation Plan',
                url: 'https://medium.com/autosharkfin/restoring-the-ecosystem-a870c0a36a8a',
              }
            ]
        },
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
            nftMintDate: 0
        }
    },
    {
        id: 1,
        name: 'Zombie Test Pool',
        isNew: true,
        address: {
            56: '',
            97: '0x5DF8a9d37dF85a0d67a9e842f4C8bA6c13850Dcb',
        },
        geckoId: 'rugzombie',
        nft: 52,
        mintTime: '2 Minutes',
        stakeToken: tokens.zmbe,
        depositToken: tokens.zmbe,
        project: {
            name: 'Rug Zombie',
            description: 'NFT Only Test Pool',
            additionalDetails: [
              {
                name: 'Project website',
                url: 'https://rugzombie.io',
              }
            ]
        },
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
            nftMintDate: 0
        }
    }
]

export default sharkPools;