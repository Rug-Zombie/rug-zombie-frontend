import { Dex, SpawningPoolConfig } from './types'
import tokens from './tokens'

const spawningPools: SpawningPoolConfig[] = [
  {
    id: 19,
    name: 'Farmaggedon Legendary',
    nftId: 85,
    address: {
      56: '0xFaAa54ec46a9BA92694DdA390a54A713b9Ce1332',
      97: '0xFaAa54ec46a9BA92694DdA390a54A713b9Ce1332',
    },
    endBlock: 17450000,
    endDate: 1651463999,
    project: {
      name: 'Farmaggedon',
      description: 'Farmageddon is used to power a platform that brings the lucrative yet complicated process of yield farming to the masses. After choosing the Farm you want to stake into. All you need to do is enter the quantity of FG tokens you want staked. Leave the rest to us. As your rewards start growing you will then be able to compound your rewards back into the farm with one simple click.',
      additionalDetails: [
        {
          name: 'Project website',
          url: tokens.frt.projectLink,
        },
        {
          name: 'Whitepaper',
          url: 'https://farmageddon.gitbook.io/farmageddon/farmageddon-whitepaper',
        },
        {
          name: 'Telegram',
          url: 'https://t.me/FARMAGEDDON_TOKEN',
        },
      ],
    },
    rewardToken: tokens.frt,
    dex: Dex.PCS_V2,
    isNew: true,
  },
  {
    id: 18,
    name: 'Sparten Token Legendary',
    nftId: 86,
    address: {
      56: '0xe43cf2bd5076C480410AC0065BBc8b3029C609c3',
      97: '0xBf559640BCEa0f19eC0B1dc30B7F294e4194a300',
    },
    endBlock: 17450000,
    endDate: 1651463999,
    project: {
      name: 'Spartan Army',
      description: 'The Spartans project vision is to educate, reward, and simplify the complicated world of Defi to crypto investors. Spartan holders benefit by being a part of the powerful Decentralized Exchange (DEX) of the KnightSwap ecosystem, being the first token that emits $KNIGHT tokens to Spartan holders.',
      additionalDetails: [
        {
          name: 'Youtube',
          url: 'https://www.youtube.com/channel/UC_rRWe4zY_5zP0j3L_lqDZg',
        },
        {
          name: 'Project website',
          url: tokens.spa.projectLink,
        },
        {
          name: 'Whitepaper',
          url: 'https://info-121.gitbook.io/welcome-to-the-spartan-army/',
        },
        {
          name: 'Telegram',
          url: 'https://t.me/+AzNvB9nnf2A0ZjU5',
        },
      ],
    },
    rewardToken: tokens.spa,
    dex: Dex.PCS_V2,
    isNew: true,
    color: 'orange',
  },
  {
    id: 17,
    name: 'Blockmine Legendary',
    nftId: 87,
    address: {
      56: '0xc7D99410737B1601464f27cDDab9c2875A4da042',
      97: '0xBf559640BCEa0f19eC0B1dc30B7F294e4194a300',
    },
    endBlock: 17080500,
    endDate: 1650340799,
    project: {
      name: 'Blockmine',
      description: 'Blockmine is a project that\'s goal is to solve existing issues with liquidity mining while incorporating metaverse and blockchain features. Watch the video to learn more!',
      additionalDetails: [
        {
          name: 'Video',
          url: 'https://www.youtube.com/watch?v=e8eZLYjv90I',
        },
        {
          name: 'Project website',
          url: tokens.goldbar.projectLink,
        },
        {
          name: 'Whitepaper',
          url: 'https://docs.block-mine.io/whitepaper/whitepaper',
        },
        {
          name: 'Telegram',
          url: 'https://t.me/blockmine_io',
        },
      ],
    },
    rewardToken: tokens.goldbar,
    dex: Dex.APESWAP,
    isNew: false,
    color: 'orange',
  },
  {
    id: 16,
    name: 'French Connection V2 Legendary',
    nftId: 82,
    address: {
      56: '0xAf0ed0352dCAbc57aa101dBd186C6abFb9C2a7F4',
      97: '0xBf559640BCEa0f19eC0B1dc30B7F294e4194a300',
    },
    endBlock: 17000000,
    endDate: 1650168000,
    project: {
      name: 'French Connection Finance',
      description: 'French Connection Finance aims to create the world\'s first credit card to cryptocurrency encrypted online payment gateway, which rewards its holders with 9% fully automated BNB reflection on all the transactions made with $FCF during the same 24 hour period.',
      additionalDetails: [
        {
          name: 'Project website',
          url: tokens.fcf.projectLink,
        },
        {
          name: 'Whitepaper',
          url: 'https://frenchconnection.finance/white-paper/',
        },
        {
          name: 'Telegram',
          url: 'https://t.me/frenchconnection_bsc',
        },
      ],
    },
    rewardToken: tokens.fcf,
    dex: Dex.PCS_V2,
    isNew: true,
    color: 'brown',
  },
  {
    id: 15,
    name: 'L1GHT L1ST Legendary',
    nftId: 74,
    address: {
      56: '0xBBFF27B0CDEEa37EaC4A01430C9b03C512784954',
      97: '0xBf559640BCEa0f19eC0B1dc30B7F294e4194a300',
    },
    endBlock: 15600000,
    endDate: 1647147599,
    project: {
      name: 'L1GHT L1ST',
      description: 'L1ght L1st was founded with the intention of bridging ambitious investors to the most innovative and remarkable projects on the blockchain. Shifting the focus from hype to utility and long term market validation. Their goal is to offer investors the exclusive opportunity to invest in innovative startups, while offering remarkable start ups the early exposure necessary for success allowing them to pay in their own token and set their own terms for launch.',
      additionalDetails: [
        {
          name: 'Project website',
          url: tokens.l1ghtv2.projectLink,
        },
        {
          name: 'Whitepaper',
          url: 'https://l1ghtl1st.io/documentation',
        },
        {
          name: 'Telegram',
          url: 'https://t.me/L1ghtL1st',
        },
      ],
    },
    rewardToken: tokens.l1ghtv2,
    dex: Dex.PCS_V2,
    isNew: true,
  },
  {
    id: 14,
    name: 'Street Punks Legendary',
    nftId: 73,
    address: {
      56: '0x306d8c5B2Fa6999D2Af31a966FB4Eb76E0FEc955',
      97: '0xBf559640BCEa0f19eC0B1dc30B7F294e4194a300',
    },
    endBlock: 15900000,
    endDate: 1646888399,
    project: {
      name: 'Street Punks',
      description: 'StreetPunks is a spinoff inspired by the CryptoPunks project created by a small group of CryptoPunk fans. They strive to contribute to the CryptoPunks hype by creatively adding streetwear and (popular) theme orientated costumes. StreetPunks offers the average CyberPunk lover to invest early into the next stage of the CryptoPunks hype.',
      additionalDetails: [
        {
          name: 'Project website',
          url: tokens.punks.projectLink,
        },
        {
          name: 'Whitepaper',
          url: 'https://streetpunks.org/wp-content/uploads/2021/11/Streetpunks-Whitepaper-2021-1.pdf',
        },
        {
          name: 'Telegram',
          url: 'https://t.me/StreetPunksOfficial',
        },
      ],
    },
    rewardToken: tokens.punks,
    dex: Dex.PCS_V2,
    color: "silver",
  },
  {
    id: 13,
    name: 'Black Eye Galaxy Legendary',
    nftId: 68,
    address: {
      56: '0x2855dBBb6De5dc93893717c326a0fbDE94a9431a',
      97: '0xBf559640BCEa0f19eC0B1dc30B7F294e4194a300',
    },
    endBlock: 15400000,
    endDate: 1646197199,
    project: {
      name: 'Black Eye Galaxy',
      description: 'Black Eye Galaxy is a Metaverse designed to create a space exploration experience for its members. Offering tradable assets from planets to spaceships and buildings, BYG is a Play-To-Earn game meaning that just by doing tasks in-game the player will be rewarded BYG tokens.',
      additionalDetails: [
        {
          name: 'Project website',
          url: tokens.byg.projectLink,
        },
        {
          name: 'Whitepaper',
          url: 'https://www.blackeyegalaxy.space/wp-content/uploads/2021/11/Byg_WP1.4.pdf',
        },
        {
          name: 'Telegram',
          url: 'https://t.me/blackeyegalaxypublic',
        },
      ],
    },
    rewardToken: tokens.byg,
    dex: Dex.PCS_V2,
    color: "silver",
  },
  {
    id: 12,
    name: 'InfiniteOne Legendary',
    nftId: 65,
    address: {
      56: '0x0b9e22204EeE16B97cD9CE9dE82417D74102C6fa',
      97: '0xBf559640BCEa0f19eC0B1dc30B7F294e4194a300',
    },
    endBlock: 15300000,
    endDate: 1645073999,
    project: {
      name: 'InfiniteOne',
      description: 'InfiniteOne Token is the only token you truly need in your wallet. It rewards you in multiple ways just for holding it. It supplies you with Infinite rewards through the ups and downs of the market.',
      additionalDetails: [
        {
          name: 'Project website',
          url: tokens.if1.projectLink,
        },
        {
          name: 'Whitepaper',
          url: 'https://infiniteone.io/whitepaper/#comp-0',
        },
        {
          name: 'Telegram',
          url: 'https://t.me/TheRealInfiniteOne',
        },
      ],
    },
    rewardToken: tokens.if1,
    dex: Dex.PCS_V2,
    color: "grey",
  },
  {
    id: 11,
    name: 'Squid Stake Legendary',
    nftId: 64,
    address: {
      56: '0x2499751b166D38e00590d054b82c20e9a1613913',
      97: '0xBf559640BCEa0f19eC0B1dc30B7F294e4194a300',
    },
    endBlock: 15060000,
    endDate: 1644641999,
    project: {
      name: 'Squid Stake',
      description: 'Squid Stake builds on the oceanic ecosystem of AutoShark to help you stake more and earn more.',
      additionalDetails: [
        {
          name: 'Project website',
          url: tokens.squidstake.projectLink,
        },
        {
          name: 'Whitepaper',
          url: 'https://docs.squidstake.com/',
        },
        {
          name: 'Telegram',
          url: 'https://t.me/squidstake',
        },
      ],
    },
    rewardToken: tokens.squidstake,
    dex: Dex.PCS_V2,
    color: "pink",
  },
  {
    id: 10,
    name: 'French Connection Legendary',
    nftId: 42,
    address: {
      56: '0xFC57f86f80D3f6155dE76F15e245F0A9ad33fFA5',
      97: '0xBf559640BCEa0f19eC0B1dc30B7F294e4194a300',
    },
    endBlock: 14170000,
    endDate: 1641646800,
    project: {
      name: 'French Connection Finance',
      description: 'French Connection Finance aims to create the world\'s first credit card to cryptocurrency encrypted online payment gateway, which rewards its holders with 9% fully automated BNB reflection on all the transactions made with $FCF during the same 24 hour period.',
      additionalDetails: [
        {
          name: 'Project website',
          url: tokens.fcf.projectLink,
        },
        {
          name: 'Whitepaper',
          url: 'https://frenchconnection.finance/white-paper/',
        },
        {
          name: 'Telegram',
          url: 'https://t.me/frenchconnection_bsc',
        },
      ],
    },
    rewardToken: tokens.fcf,
    dex: Dex.PCS_V2,
    color: "brown",
  },
  {
    id: 9,
    name: 'Autoshark Legendary',
    nftId: 37,
    address: {
      56: '0x2B2327E219D6BA1DE8b3cF5715Dd1d1FE6f39e60',
      97: '0xBf559640BCEa0f19eC0B1dc30B7F294e4194a300',
    },
    endBlock: 13800000,
    endDate: 1640523600,
    project: {
      name: 'Autoshark',
      description: 'AutoShark Finance is the 1st Cross-Chain Hybrid AMM and Yield Optimizer, offering unparalleled access to farming opportunities through the use of superior yield strategies, auto-compounding vaults, and NFT-powered farming.',
      additionalDetails: [
        {
          name: 'Project website',
          url: tokens.fins.projectLink,
        },
        {
          name: 'Whitepaper',
          url: 'https://autosharkgw.gitbook.io/autoshark/',
        },
        {
          name: 'Telegram',
          url: 'https://t.me/AutoSharkFinance',
        },
      ],
    },
    rewardToken: tokens.fins,
    dex: Dex.AUTOSHARK,
    color: "#9400d3",
  },
  {
    id: 8,
    name: 'Bingus Network Legendary',
    nftId: 36,
    address: {
      56: '0xBBB1c60CA67cab1441AcD8c077BB0b779e73DA40',
      97: '0xBf559640BCEa0f19eC0B1dc30B7F294e4194a300',
    },
    endBlock: 13700000,
    endDate: 1640188800,
    project: {
      name: 'Bingus Network',
      description: 'The Bingus project was launched as an animal charity / meme token on BSC. Bingus Network aims to save as many animals as possible. A percentage of every Bingus Network transaction is donated to animal shelters and charities and over $120k has been donated since April.',
      additionalDetails: [
        {
          name: 'Project website',
          url: tokens.bingus.projectLink,
        },
        {
          name: 'Whitepaper',
          url: 'https://bingus.io/documents/Bingus-Network-Whitepaper.pdf',
        },
        {
          name: 'Telegram',
          url: 'https://t.me/BingusNetworkOfficial',
        },
      ],
    },
    rewardToken: tokens.bingus,
    dex: Dex.APESWAP,
    color: "#C4A484",
  },
  {
    id: 7,
    name: 'Octaplex Legendary',
    nftId: 35,
    address: {
      56: '0xe9Dc48d8F5a1eAd54b8ADC263c4564b5346b1aEB',
      97: '0xBf559640BCEa0f19eC0B1dc30B7F294e4194a300',
    },
    endBlock: 13620000,
    endDate: 1639940400,
    project: {
      name: 'Octaplex Network',
      description: 'Octaplex Network is an ecosystem with a unique and revolutionary concept bringing a new template for the future development of DeFi and yield bearing tokens. They aim to create an ecosystem of tokens in which users shall be rewarded and will be able to get special deals by holding their native $PLX token as well as our partner project tokens.',
      additionalDetails: [
        {
          name: 'Project website',
          url: tokens.plx.projectLink,
        },
        {
          name: 'Whitepaper',
          url: 'https://octaplex.gitbook.io/octaplex-network-whitepaper/',
        },
        {
          name: 'Telegram',
          url: 'https://t.me/OctaplexNetwork',
        },
      ],
    },
    rewardToken: tokens.plx,
    dex: Dex.PCS_V2,
    color: "violet",
  },
  {
    id: 6,
    name: 'AtmosSoft Legendary',
    nftId: 34,
    address: {
      56: '0x20E060a9FD13F9F2D442f6e7A804B186C53EcF60',
      97: '0xBf559640BCEa0f19eC0B1dc30B7F294e4194a300',
    },
    endBlock: 13566061,
    endDate: 1639771200,
    project: {
      name: 'AtmosSoft',
      description: 'AtmosSoft is an NFT Play-2-Earn collectible card game where you Earn $ATMSSFT just by playing. NFT Staking and Farming including P2P gameplay to earn a spot in tournaments with prize pools.',
      additionalDetails: [
        {
          name: 'Project website',
          url: tokens.atmssft.projectLink,
        },
        {
          name: 'Whitepaper',
          url: 'https://atmossoft.gitbook.io/atmossoft-ccg/',
        },
        {
          name: 'Telegram',
          url: 'https://t.me/atmossoft',
        },
      ],
    },
    rewardToken: tokens.atmssft,
    dex: Dex.PCS_V2,
    color: "red",
  },
  {
    id: 5,
    name: 'Monkey Coin Legendary',
    nftId: 33,
    address: {
      56: '0x1976e5607aB7D163E5DA2F6D427aD1868e967f97',
      97: '0xBf559640BCEa0f19eC0B1dc30B7F294e4194a300',
    },
    endBlock: 13503600,
    endDate: 1639576800,
    project: {
      name: 'CryptoMonkey Empire',
      description: 'CryptoMonkey Empire is a Massively Multiplayer Online Real Time Strategy video game. Where you, the player manages monkeys to build an Empire. You will collect resources by raiding other player\'s empires to build up a city and make technological progress. Their MonkeyCoin token is used in game as a resource and your army is used to steal other player\'s cryptocurrency during raids.',
      additionalDetails: [
        {
          name: 'Project website',
          url: tokens.mkc.projectLink,
        },
        {
          name: 'Pre-alpha Gameplay Video',
          url: 'https://www.youtube.com/watch?v=OiiQ8CBOuLw',
        },
        {
          name: 'Whitepaper',
          url: 'https://mwgbucket.s3.eu-west-3.amazonaws.com/CME_WP_V7bis.pdf',
        },
        {
          name: 'Telegram',
          url: 'https://t.me/cryptomonkeyempire',
        },
      ],
    },
    rewardToken: tokens.mkc,
    dex: Dex.PCS_V2,
    color: "red",
  },
  {
    id: 4,
    name: 'WalletNow Legendary',
    nftId: 30,
    address: {
      56: '0x32c5ec65beB8482b5c727A0E3A352F8E330eb312',
      97: '0xBf559640BCEa0f19eC0B1dc30B7F294e4194a300',
    },
    endBlock: 13350000,
    endDate: 1639101600,
    project: {
      name: 'WalletNow',
      description: 'WalletNow is an advanced crypto portfolio monitoring solution. It aggregates all your DeFi & CeFi investments in a searchable table and actively monitors it with an integrated Telegram Bot. With detailed LP information, impermanent loss and yields calculation, you are always in control of your wallet.',
      additionalDetails: [
        {
          name: 'Project website',
          url: tokens.wnow.projectLink,
        },
        {
          name: 'Telegram',
          url: 'https://t.me/WalletNow',
        },
      ],
    },
    rewardToken: tokens.wnow,
    dex: Dex.PCS_V2,
    color: "rgb(0, 150, 255)",
  },
  {
    id: 3,
    name: 'Koala Defi Legendary',
    nftId: 27,
    address: {
      56: '0x14422173F2EA692Ae2e27c77a9bf5DB58b38b457',
      97: '0xBf559640BCEa0f19eC0B1dc30B7F294e4194a300',
    },
    endBlock: 13140040,
    endDate: 1638453600,
    project: {
      name: 'Koala Defi',
      description: 'Koala DeFi Finance is a yield farming dapp running on Binance Smart Chain and ApeSwap exchange, with cool new features that let you earn and win LYPTUS tokens. The idea behind this project is to create a safe place for conservative yield farmers. ',
      additionalDetails: [
        {
          name: 'Project website',
          url: tokens.nalis.projectLink,
        },
        {
          name: 'Telegram',
          url: 'https://t.me/koaladefichat',
        },
      ],
    },
    rewardToken: tokens.nalis,
    dex: Dex.APESWAP,
  },
  {
    id: 2,
    name: 'Main Street Legendary',
    nftId: 20,
    address: {
      56: '0x0af40D42F805112ECc40b0148c1221eDc8Ce001B',
      97: '0xBf559640BCEa0f19eC0B1dc30B7F294e4194a300',
    },
    endBlock: 12790000,
    endDate: 1637366400,
    project: {
      name: 'Main Street',
      description: 'Main Street is a deflationary token that provides its holders with a space to find new high use case tokens in their Neighborhood and Alley, as well as entertainment and games in their Shops.',
      additionalDetails: [
        {
          name: 'Project website',
          url: tokens.mainst.projectLink,
        },
        {
          name: 'Telegram',
          url: 'https://t.me/buymainstreet',
        },
      ],
    },
    rewardToken: tokens.mainst,
    dex: Dex.PCS_V2,
  },
  {
    id: 1,
    name: 'Euler Tools Legendary',
    nftId: 25,
    address: {
      56: '0x637810116bfdEcA4bB38c61D9FeBC5911440B0eF',
      97: '0xBf559640BCEa0f19eC0B1dc30B7F294e4194a300',
    },
    endBlock: 12350000,
    endDate: 1636189527,
    project: {
      name: 'Euler Tools',
      description: 'Euler Tools is a platform to explore and discover blockchain content. With a clean, usable and responsive interface.',
      additionalDetails: [
        {
          name: 'Project website',
          url: tokens.euler.projectLink,
        },
        {
          name: 'Twitter',
          url: 'https://twitter.com/EulerTools',
        },
        {
          name: 'Telegram',
          url: 'https://t.me/eulertools',
        },
        {
          name: 'Medium Post',
          url: 'https://rugzombie.medium.com/new-spawning-pool-euler-tools-a07b095a9846',
        },
      ],
    },
    rewardToken: tokens.euler,
    dex: Dex.PCS_V2,
  },
  {
    id: 0,
    name: 'GorillaFi Legendary',
    nftId: 17,
    address: {
      56: '0x83818859688eF175F6AEAFb80Be881Db24A4E50a',
      97: '0xBf559640BCEa0f19eC0B1dc30B7F294e4194a300',
    },
    endBlock: 12209400,
    endDate: 1635608820,
    project: {
      name: 'Gorilla-Fi',
      description: 'Gorilla-Fi is a comprehensive De-Fi earnings ecosystem that allows anyone with a smartphone to earn passive income.',
      additionalDetails: [
        {
          name: 'Project website',
          url: 'https://www.gorillafi.com/',
        },
        {
          name: 'Podcast with project founder',
          url: 'https://www.youtube.com/watch?v=xdwiHSCPSNw',
        },
        {
          name: 'Telegram',
          url: 'https://t.me/GorillaFi',
        },
        {
          name: 'Medium post',
          url: 'https://rugzombie.medium.com/first-spawn-gorilla-fi-g-fi-f16a234047f7',
        },
      ],

    },
    rewardToken: tokens.gfi,
    dex: Dex.PCS_V2,
    color: "rgb(0, 150, 255)",
  },
]

export default spawningPools
