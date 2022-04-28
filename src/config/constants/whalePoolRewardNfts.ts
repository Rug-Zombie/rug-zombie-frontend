import {Nft, NftUserInfo} from "../../state/types";
import {BIG_ZERO} from "../../utils/bigNumber";


const DEFAULT_USER_INFO: NftUserInfo = {
    ownedIds: [],
}

const whalePoolRewardNfts: Nft[] = [
    {
        id: 0,
        name: 'yApe Common',
        symbol: 'yAPE-COMMON',
        description: 'Good things never last Mr. Denham.',
        address: {
            56: '0xa8a30a507c44Cb7Bdcb7d6f1F8e6A7F373A9C9AA',
            97: '0x86a6A9EeE400f10254bDf34eAc2c21dd10fF60D5',
        },
        totalSupply: BIG_ZERO,
        path: '/images/rugZombie/yApeCommon.jpeg',
        type: 'image',
        rarity: 'Common',
        userInfo: { ...DEFAULT_USER_INFO },
    },
    {
        id: 1,
        name: 'yPanda Common',
        symbol: 'yPANDA-COMMON',
        description: 'Legend tells of a legendary warrior whose kung fu skills were the stuff of legend.',
        address: {
            56: '0x864661Cd1FDedf6Bc249beB8B76CeaD629B48122',
            97: '0x3545fC897d22521E0b1f545715A8f42238F13Cb5',
        },
        totalSupply: BIG_ZERO,
        path: 'https://ipfs.io/ipfs/QmTvbrG5QLaZXDiNvKAPjidvzzdbuwtKxtWVkSrnFb3iL9',
        type: 'image',
        rarity: 'Common',
        userInfo: { ...DEFAULT_USER_INFO },
    },
    {
        id: 2,
        name: 'DragonFarm Finance Common',
        symbol: 'DRAGON-COMMON',
        description:
            'My armor is like tenfold shields, my teeth are swords, my claws spears, the shock of my tail a thunderbolt, my wings a hurricane, and my breath death!',
        address: {
            56: '0x983608174E9ae08D938433119aD5C4b1f8B29A03',
            97: '0xB43D38e68af6fB9159C4D28F76b968Df7061Fbb8',
        },
        totalSupply: BIG_ZERO,
        path: 'https://ipfs.io/ipfs/QmZJfGwdhFGY6ScYDoK1GLtJiDcNpvZUqKFrjk2koPSCYN',
        type: 'video',
        rarity: 'Common',
        userInfo: { ...DEFAULT_USER_INFO },
    },
]

export default whalePoolRewardNfts