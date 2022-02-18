import tokens from '../config/constants/tokens'
import { BIG_ZERO } from '../utils/bigNumber'
import { SharkPool } from './types'

const sharkPools: SharkPool[] = [
  {
    id: 0,
    name: 'FINS Flash Loan Pool',
    isNew: true,
    address: {
      56: '0x92b07bB646573e5fA158071Df675B1463395BB30',
      97: '0x644adD6D85C6dEcE068f7019c899856e6FF571b6',
    },
    geckoId: 'fins-token',
    nft: 62,
    mintTime: '14 Days',
    stakeToken: tokens.fins,
    depositToken: tokens.none,
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
        },
      ],
    },
    poolInfo: {
      unlockFee: BIG_ZERO,
      minStake: BIG_ZERO,
      maxStake: BIG_ZERO,
      depositTaxRate: 0,
      requiresDeposit: true,
      totalStaked: BIG_ZERO,
      minStakeTime: BIG_ZERO,
    },
    userInfo: {
      stakedAmount: BIG_ZERO,
      paidUnlock: false,
      paidDeposit: false,
      nftMintDate: 0,
    },
  },
  {
    id: 1,
    name: 'JAWS Flash Loan Pool',
    isNew: true,
    address: {
      56: '0x8D358169D4f3ede505E1a9b05E678c7f306A32c6',
      97: '0x644adD6D85C6dEcE068f7019c899856e6FF571b6',
    },
    geckoId: 'autoshark',
    nft: 63,
    mintTime: '14 Days',
    stakeToken: tokens.jaws,
    depositToken: tokens.none,
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
        },
      ],
    },
    poolInfo: {
      unlockFee: BIG_ZERO,
      minStake: BIG_ZERO,
      maxStake: BIG_ZERO,
      depositTaxRate: 0,
      requiresDeposit: true,
      totalStaked: BIG_ZERO,
      minStakeTime: BIG_ZERO,
    },
    userInfo: {
      stakedAmount: BIG_ZERO,
      paidUnlock: false,
      paidDeposit: false,
      nftMintDate: 0,
    },
  },
  {
    id: 2,
    name: 'FINS-BNB LP Flash Loan Pool',
    isNew: true,
    address: {
      56: '0xb7ce5bf868de683Af75EbBe980B4C2bCc1a5E8Af',
      97: '0x644adD6D85C6dEcE068f7019c899856e6FF571b6',
    },
    geckoId: 'autoshark',
    nft: 62,
    mintTime: '14 Days',
    stakeToken: tokens.finsbnb,
    depositToken: tokens.none,
    token0: tokens.wbnb,
    token1: tokens.fins,
    lpPool: true,
    bnbLpTokenIndex: 1,
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
        },
      ],
    },
    poolInfo: {
      unlockFee: BIG_ZERO,
      minStake: BIG_ZERO,
      maxStake: BIG_ZERO,
      depositTaxRate: 0,
      requiresDeposit: true,
      totalStaked: BIG_ZERO,
      minStakeTime: BIG_ZERO,
    },
    userInfo: {
      stakedAmount: BIG_ZERO,
      paidUnlock: false,
      paidDeposit: false,
      nftMintDate: 0,
    },
  },

  {
    id: 3,
    name: 'JAWS-BNB LP Flash Loan Pool',
    isNew: true,
    address: {
      56: '0x8792DB483d4e29f0631829f0c759885e4cfB96cF',
      97: '0x644adD6D85C6dEcE068f7019c899856e6FF571b6',
    },
    geckoId: 'autoshark',
    nft: 63,
    mintTime: '14 Days',
    stakeToken: tokens.jawsbnb,
    depositToken: tokens.none,
    token0: tokens.wbnb,
    token1: tokens.jaws,
    lpPool: true,
    bnbLpTokenIndex: 0,
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
        },
      ],
    },
    poolInfo: {
      unlockFee: BIG_ZERO,
      minStake: BIG_ZERO,
      maxStake: BIG_ZERO,
      depositTaxRate: 0,
      requiresDeposit: true,
      totalStaked: BIG_ZERO,
      minStakeTime: BIG_ZERO,
    },
    userInfo: {
      stakedAmount: BIG_ZERO,
      paidUnlock: false,
      paidDeposit: false,
      nftMintDate: 0,
    },
  },
]

export default sharkPools
