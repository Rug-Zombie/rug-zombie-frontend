import {Barrack} from "./types";
import {BIG_ZERO} from "../utils/bigNumber";
import tokens from "../config/constants/tokens";

const barracks: Barrack[] = [
    {
        id: 1,
        name: 'barrack one',
        nft: 62,
        description: 'description here',
        token: tokens.bnb,
        isNew: true,
        nftMintingTime: '3 days',
        barrackInfo: {
            bnb: true,
            depositFeePercentage: 0,
            lockThreshold: BIG_ZERO,
            minStake: BIG_ZERO,
            totalStaked: BIG_ZERO,
            lockTime: BIG_ZERO,
            timeLocked: BIG_ZERO,
            locked: false
        },
        barrackUserInfo: {
            depositedAmount: BIG_ZERO
        },
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
    },
    {
        id: 2,
        name: 'barrack two',
        nft: 62,
        description: 'some more description here',
        token: tokens.zmbe,
        nftMintingTime: '3 days',
        isNew: true,
        barrackInfo: {
            bnb: false,
            depositFeePercentage: 0,
            minStake: BIG_ZERO,
            lockThreshold: BIG_ZERO,
            totalStaked: BIG_ZERO,
            lockTime: BIG_ZERO,
            timeLocked: BIG_ZERO,
            locked: false
        },
        barrackUserInfo: {
            depositedAmount: BIG_ZERO
        },
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
    },
]

export default barracks