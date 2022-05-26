import { Announcement } from './types'

/**
 * Map of announcement id to {@link Announcement} instance.
 */
const announcements: Map<number, Announcement> = new Map([
  [
    137,
    {
      url: 'https://rugzombie.medium.com/bored-to-death-new-grave-coming-fa71b0718a79',
      title: 'Bored to Death New Grave Coming',
      published: 1653537600,
    },
  ],
  [
    136,
    {
      url: 'https://rugzombie.medium.com/infinitetwo-pool-coming-51110fa73518',
      title: 'InfiniteTwo Pool Coming',
      published: 1651377600000,
    },
  ],
  [
    135,
    {
      url: 'https://rugzombie.medium.com/earthfi-spawning-pool-coming-357be17973d9',
      title: 'EarthFi Spawning Pool Coming',
      published: 1650513600000,
    },
  ],
  [
    134,
    {
      url: 'https://rugzombie.medium.com/axs-grave-incoming-69aa5206688a',
      title: 'AXS Grave Incoming',
      published: 1648902915000,
    },
  ],
  [
    133,
    {
      url: 'https://rugzombie.medium.com/april-graves-day-218a6078ff3',
      title: 'April Graves Day?',
      published: 1648822364000,
    },
  ],
  [
    132,
    {
      url: 'https://rugzombie.medium.com/new-grave-salvation-finance-slvn-e9e9d1206a8',
      title: 'New Grave: Salvation Finance (SLVN)',
      published: 1647961758000,
    },
  ],
  [
    131,
    {
      url: 'https://rugzombie.medium.com/new-contract-and-pool-same-old-punks-14156087c1df',
      title: 'New Contract and Pool, Same Old Punks',
      published: 1647032624000,
    },
  ],
  [
    130,
    {
      url: 'https://rugzombie.medium.com/shiny-graves-utility-95f363983b48',
      title: 'SHINY GRAVES & UTILITY?',
      published: 1646927018000,
    },
  ],
  [
    129,
    {
      title: 'Long live the ZMBE and condolences to the King (of the ocean)',
      url: 'https://rugzombie.medium.com/long-live-the-zmbe-and-condolences-to-the-king-of-the-ocean-cf7c48f2fc64',
      published: 1646505162000,
    },
  ],
  [
    128,
    {
      title: 'Zombie Updates and More!',
      url: 'https://rugzombie.medium.com/zombie-updates-and-more-9c2af6cb3c42',
      published: 1646319667000,
    },
  ],
  [
    127,
    {
      title: 'CXCOIN GRAVE(S) — INCOMING',
      url: 'https://rugzombie.medium.com/cxcoin-grave-s-incoming-35bb0848ac19',
      published: 1644612470000,
    },
  ],
  [
    126,
    {
      title: 'New Spawning Pool -Spartan Token ($SPA)',
      url: 'https://rugzombie.medium.com/new-spawning-pool-spartan-token-spa-3e3be8d2604b',
      published: 1643338751000,
    },
  ],
  [
    125,
    {
      title: 'New Spawning Pool THIS WEEK: Farmageddon (FRT)',
      url: 'https://rugzombie.medium.com/new-spawning-pool-this-week-farmageddon-frt-aee9041bbd91',
      published: 1643124869000,
    },
  ],
  [
    124,
    {
      title: 'NEW GRAVE TODAY: $PIRATE',
      url: 'https://rugzombie.medium.com/new-grave-today-pirate-3f5a7b52fe71',
      published: 1642601955000,
    },
  ],
  [
    123,
    {
      title: 'Oblivion Marketplace Dynamics',
      url: 'https://rugzombie.medium.com/oblivion-marketplace-dynamics-858a2b7cafb9',
      published: 1642437138000,
    },
  ],
  [
    122,
    {
      title: 'New Zombie Horde Members & Quality of Life Updates',
      url: 'https://rugzombie.medium.com/new-zombie-horde-members-quality-of-life-updates-bd4c77103da7',
      published: 1642298336000,
    },
  ],
  [
    121,
    {
      title: 'Welcome Blockmine to the RugZombie Ecosystem',
      url: 'https://rugzombie.medium.com/welcome-blockmine-to-the-rugzombie-ecosystem-82cd5258ef82',
      published: 1642178396000,
    },
  ],
  [
    120,
    {
      title: 'Get Your Gotti On…FCF Renews Spawning Pool',
      url: 'https://rugzombie.medium.com/get-your-gotti-on-fcf-renews-spawning-pool-5799e42adbc',
      published: 1642000380000,
    },
  ],
  [
    119,
    {
      title: 'Patient Zero MiniGame BETA Release: Sunday January 9th, 2021',
      url: 'https://rugzombie.medium.com/patient-zero-minigame-beta-release-sunday-january-9th-2021-152f72579df8',
      published: 1641682122448,
    },
  ],
  [
    118,
    {
      title: 'Ronin Gamez GRAVE Update',
      url: 'https://rugzombie.medium.com/ronin-gamez-grave-update-f7cc296cd751',
      published: 1641603519034,
    },
  ],
  [
    117,
    {
      title: 'New GRAVE DROPPING TODAY | Ronin Gamez',
      url: 'https://rugzombie.medium.com/new-grave-dropping-today-ronin-gamez-c6ba212c3c1d',
      published: 1641495363634,
    },
  ],
  [
    116,
    {
      title: 'New Spawning Pool THIS WEEK: RugSeekers (SEEK)',
      url: 'https://rugzombie.medium.com/new-spawning-pool-this-week-rugseekers-seek-baadecfbf874',
      published: 1641398455989,
    },
  ],
  [
    115,
    {
      title: 'Pancake Hunny — A Post Mortem',
      url: 'https://rugzombie.medium.com/pancake-hunny-a-post-mortem-42651878ad1f',
      published: 1640876414810,
    },
  ],
  [
    114,
    {
      title: 'Insider Information on RugZombie’s Patient Zero Game + NFT Utility',
      url: 'https://rugzombie.medium.com/insider-information-on-rugzombies-patient-zero-game-nft-utility-ab25e806b296',
      published: 1640803190379,
    },
  ],
  [
    113,
    {
      title: 'Explain it like i’m 5: New Feature the “BARRACKS”',
      url: 'https://rugzombie.medium.com/explain-it-like-im-5-new-feature-the-barracks-3fc8a9ce8799',
      published: 1639923741543,
    },
  ],
  [
    112,
    {
      title: 'Market Gotcha Down? EZ here with the Holiday Hopium You Need!',
      url: 'https://rugzombie.medium.com/market-gotcha-down-ez-here-with-the-holiday-hopium-you-need-a693f3bc07e7',
      published: 1639810228436,
    },
  ],
  [
    111,
    {
      title: 'BURN GRAVES',
      url: 'https://rugzombie.medium.com/burn-graves-4aaf510b4f27',
      published: 1638890617537,
    },
  ],
  [
    110,
    {
      title: 'L1ght L1st Spawning Pool, Dec 7th 2021',
      url: 'https://rugzombie.medium.com/l1ght-l1st-spawning-pool-dec-7th-2021-e59c398ce3af',
      published: 1638851627731,
    },
  ],
  [
    109,
    {
      title: 'New Spawning Pool: StreetPunks',
      url: 'https://rugzombie.medium.com/new-spawning-pool-streetpunks-5a91395aecd9',
      published: 1638821633836,
    },
  ],
  [
    108,
    {
      title: 'December 2021 GRAVES & TOMBS announcements',
      url: 'https://rugzombie.medium.com/december-2021-graves-tombs-announcements-9f0dcd1cd9e8',
      published: 1638299321068,
    },
  ],
  [
    107,
    {
      title: 'RugZombie Trading Contest (Cash + NFT Prizes)',
      url: 'https://rugzombie.medium.com/rugzombie-trading-contest-cash-nft-prizes-9b892a0ddb20',
      published: 1638289488108,
    },
  ],
  [
    106,
    {
      title: 'Zombies Have Graduated from ApeSwap’s BUIDL Program!',
      url: 'https://rugzombie.medium.com/zombies-have-graduated-from-apeswaps-buidl-program-f99bb35590e2',
      published: 1638153814512,
    },
  ],
  [
    105,
    {
      title: 'BurnsGiving is Upon Us',
      url: 'https://rugzombie.medium.com/burnsgiving-is-upon-us-6867edb176c2',
      published: 1638063803276,
    },
  ],
  [
    104,
    {
      title: 'RugZombie x AutoShark Swap Integration: Zombie Swap!',
      url: 'https://rugzombie.medium.com/rugzombie-x-autoshark-swap-integration-zombie-swap-c22de4d213b3',
      published: 1638042714034,
    },
  ],
  [
    103,
    {
      title: 'RugZombie Playing Squip Games: Retail Collaboration - RugZombie x Squip',
      url:
        'https://rugzombie.medium.com/rugzombie-playing-squip-games-retail-collaboration-rugzombie-x-squip-9689577eab44',
      published: 1637954459213,
    },
  ],
  [
    102,
    {
      title: 'Squid Games on BSC; RARE GRAVE',
      url: 'https://rugzombie.medium.com/squid-games-on-bsc-rare-grave-4f914c5482ed',
      published: 1637782755418,
    },
  ],
  [
    101,
    {
      title: 'Black Eye Galaxy Spawning Pool',
      url: 'https://rugzombie.medium.com/black-eye-galaxy-spawning-pool-92b9b21d1a90',
      published: 1637690499757,
    },
  ],
  [
    100,
    {
      title: 'RugZombie Patient Gamma Auction',
      url: 'https://rugzombie.medium.com/rugzombie-patient-gamma-auction-6bd54b7a6141',
      published: 1637037129851,
    },
  ],
  [
    99,
    {
      title: 'Newest Spawning Pool Member @ SquidStake',
      url: 'https://rugzombie.medium.com/newest-spawning-pool-member-squidstake-12d821187cc2',
      published: 1636566710132,
    },
  ],
  [
    98,
    {
      title: 'Chompers v3 and RugZombie Shark Support',
      url: 'https://rugzombie.medium.com/chompers-v3-and-rugzombie-shark-support-a4a55d9897',
      published: 1636482240605,
    },
  ],
  [
    97,
    {
      title: 'Bog of War! About our Upcoming BOG v1 GRAVE',
      url: 'https://rugzombie.medium.com/bog-of-war-abour-our-upcoming-bog-v1-grave-e07305b7f46f',
      published: 1636252857610,
    },
  ],
  [
    96,
    {
      title: 'POKECOIN',
      url: 'https://rugzombie.medium.com/pokecoin-77e21df1afdf',
      published: 1636165028293,
    },
  ],
  [
    95,
    {
      title: 'Bullish Jackpot Token GRAVE Incoming!',
      url: 'https://rugzombie.medium.com/bullish-jackpot-token-grave-incoming-90eaa3b24acd',
      published: 1636063123093,
    },
  ],
  [
    94,
    {
      title: 'Zombie Farm',
      url: 'https://rugzombie.medium.com/zombie-farm-4d8e9cec714b',
      published: 1635947933665,
    },
  ],
  [
    93,
    {
      title: 'Save the Kids Token',
      url: 'https://rugzombie.medium.com/save-the-kids-token-e9fff00b3ceb',
      published: 1635905398324,
    },
  ],
  [
    92,
    {
      title: 'Special Data Lab x Cake Ape',
      url: 'https://rugzombie.medium.com/special-data-lab-x-cake-603a8fc18949',
      published: 1635863277562,
    },
  ],
  [
    91,
    {
      title: 'Lifeline Token Grave Coming',
      url: 'https://rugzombie.medium.com/lifeline-token-grave-coming-c6c4c1bb3ef1',
      published: 1635861816155,
    },
  ],
  [
    90,
    {
      title: 'A Zombie’s Digest (Past and Upcoming Announcements)',
      url: 'https://rugzombie.medium.com/a-zombies-digest-past-and-upcoming-announcements-181dc614f4e7',
      published: 1635820727088,
    },
  ],
  [
    89,
    {
      title: 'RugZombie Retiring GRAVES (Nov. 2021) | Making Room for More',
      url: 'https://rugzombie.medium.com/rugzombie-retiring-graves-nov-2021-making-room-for-more-1d4274bc202',
      published: 1634956025885,
    },
  ],
  [
    88,
    {
      title: 'Dia De Los Muertos FREE NFT TRADE-INS',
      url: 'https://rugzombie.medium.com/dia-de-los-muertos-free-nft-trade-ins-eb031e00734c',
      published: 1634914761797,
    },
  ],
  [
    87,
    {
      title: 'NFTombs Minting Odds',
      url: 'https://rugzombie.medium.com/nftombs-minting-odds-a707be8827f5',
      published: 1634867429180,
    },
  ],
  [
    86,
    {
      title: 'RugZombie Integrates Chainlink VRF to Help Power “Non-Fungible Tombs”, Gamified LP Farming',
      url:
        'https://rugzombie.medium.com/rugzombie-integrates-chainlink-vrf-to-help-power-non-fungible-tombs-gamified-lp-farming-8e8c4dc68b94',
      published: 1634830820177,
    },
  ],
  [
    85,
    {
      title: 'Our First Victim Pool + Compensation Plan for BLACKDIAMOND Holders ($diamonds)',
      url:
        'https://rugzombie.medium.com/our-first-victim-pool-compensation-plan-for-blackdiamond-holders-diamonds-4cc8f664397b',
      published: 1634661075115,
    },
  ],
  [
    84,
    {
      title: 'How to Stake on RugZombie',
      url: 'https://rugzombie.medium.com/how-to-stake-on-rugzombie-5d02a4444c27',
      published: 1634657583862,
    },
  ],
  [
    83,
    {
      title: 'How to Buy $ZMBE',
      url: 'https://rugzombie.medium.com/how-to-buy-zmbe-b763c2b3185f',
      published: 1634485449254,
    },
  ],
  [
    82,
    {
      title: 'NFTombs Exclusive NFTs',
      url: 'https://rugzombie.medium.com/nftombs-exclusive-nfts-623678cd3edc',
      published: 1634139203072,
    },
  ],
  [
    81,
    {
      title: 'Swim in the Ocean with Autoshark x RugZombie',
      url: 'https://rugzombie.medium.com/swim-in-the-ocean-with-autoshark-x-rugzombie-d79747b17074',
      published: 1633927336666,
    },
  ],
  [
    80,
    {
      title: 'Introducing NON FUNGIBLE TOMBS',
      url: 'https://rugzombie.medium.com/introducing-non-fungible-tombs-ce3ce445d4b',
      published: 1633659964647,
    },
  ],
  [
    79,
    {
      title: 'BONFIRE Resurrection Grave Coming Oct. 5th',
      url: 'https://rugzombie.medium.com/bonfire-resurrection-grave-coming-oct-5th-ff5d3607fc42',
      published: 1633394376434,
    },
  ],
  [
    78,
    {
      title: 'FCF Spawning Pool — Coming October 5th',
      url: 'https://rugzombie.medium.com/fcf-spawning-pool-coming-october-5th-2a48a415a136',
      published: 1633141154721,
    },
  ],
  [
    77,
    {
      title: 'WHALE GRAVE — SEASON 1',
      url: 'https://rugzombie.medium.com/whale-grave-season-1-a15208f51a0d',
      published: 1632864089678,
    },
  ],
  [
    76,
    {
      title: 'BIBLICAL NFT AUCTION: Trust Us',
      url: 'https://rugzombie.medium.com/biblical-nft-auction-trust-us-b32cea60df37',
      published: 1632764529302,
    },
  ],
  [
    75,
    {
      title: 'Introducing MYTHIC NFTs through the DATA LAB',
      url: 'https://rugzombie.medium.com/introducing-mythic-nfts-through-the-data-lab-d2be4803ee6e',
      published: 1632623561284,
    },
  ],
  [
    74,
    {
      title: 'There is no Black Market',
      url: 'https://rugzombie.medium.com/there-is-no-black-market-e839539086d6',
      published: 1632499668719,
    },
  ],
  [
    73,
    {
      title: 'Mini-Roadmap',
      url: 'https://rugzombie.medium.com/mini-roadmap-bc24ac42b54d',
      published: 1632451533382,
    },
  ],
  [
    72,
    {
      title: '$FINS Spawning Pool TODAY (Friday, ~6PM EST / 10PM UTC)',
      url: 'https://rugzombie.medium.com/fins-spawning-pool-today-friday-6pm-est-10pm-utc-a39e59a43878',
      published: 1632424312372,
    },
  ],
  [
    71,
    {
      title: 'Bingus Network Spawning Pool',
      url: 'https://rugzombie.medium.com/bingus-network-spawning-pool-4b8603632325',
      published: 1632058625280,
    },
  ],
  [
    70,
    {
      title: 'Octaplex Spawning Pool Coming Today!',
      url: 'https://rugzombie.medium.com/octaplex-spawning-pool-coming-today-69846716b567',
      published: 1631896940566,
    },
  ],
  [
    69,
    {
      title: 'AtmosSoft Spawning Pool',
      url: 'https://rugzombie.medium.com/atmossoft-spawning-pool-8bf52623373c',
      published: 1631720166167,
    },
  ],
  [
    68,
    {
      title: 'Happy Spawntemberfest!',
      url: 'https://rugzombie.medium.com/happy-spawntemberfest-eca586d78b6b',
      published: 1631548277898,
    },
  ],
  [
    67,
    {
      title: 'New SPAWNING POOL (2 of 2) THIS WEEK: Crypto Monkey Empire (MKC)',
      url: 'https://rugzombie.medium.com/new-spawning-pool-2-of-2-this-week-crypto-monkey-empire-mkc-9c7029a5ce34',
      published: 1631069553205,
    },
  ],
  [
    66,
    {
      title: 'Digging a common GRAVE for Kitty Cake! ($KCake)',
      url: 'https://rugzombie.medium.com/digging-a-common-grave-for-kitty-cake-kcake-7d0307cc7fae',
      published: 1630986364481,
    },
  ],
  [
    65,
    {
      title: 'New SPAWNING POOL (1 of 2) THIS WEEK: WalletNow (WNOW)',
      url: 'https://rugzombie.medium.com/new-spawning-pool-1-of-2-this-week-walletnow-wnow-5b28f341f9f4',
      published: 1630948057481,
    },
  ],
  [
    64,
    {
      title: 'THE MOST LEGENDARY FELINE — PantherSwap GRAVE Coming SEPT 11, 2021',
      url: 'https://rugzombie.medium.com/the-most-legendary-feline-pantherswap-grave-coming-sept-11-2021-baec65875c20',
      published: 1630895461691,
    },
  ],
  [
    63,
    {
      title: 'Trading Contest on PancakeSwap for 7 Days! Earn our COMMON ZOMBIE TRADER NFT',
      url:
        'https://rugzombie.medium.com/trading-contest-on-pancakeswap-for-7-days-earn-our-common-zombie-trader-nft-37d663e6c508',
      published: 1630682559837,
    },
  ],
  [
    62,
    {
      title: 'New SPAWNING POOL: KOALA DEFI',
      url: 'https://rugzombie.medium.com/new-spawning-pool-koala-defi-528906526865',
      published: 1630465743257,
    },
  ],
  [
    61,
    {
      title: 'MAUSOLEUM UPGRADES',
      url: 'https://rugzombie.medium.com/mausoleum-upgrades-5c0bdd4fe1b4',
      published: 1630206245238,
    },
  ],
  [
    60,
    {
      title: 'Retiring Graves and Grave Multipliers on RugZombie',
      url: 'https://rugzombie.medium.com/retiring-graves-and-grave-multipliers-on-rugzombie-afb823e249e3',
      published: 1630120957379,
    },
  ],
  [
    59,
    {
      title: 'NEW BASIC GRAVE — RETIRING OLD GRAVE ON AUG 30TH',
      url: 'https://rugzombie.medium.com/new-basic-grave-retiring-old-grave-on-aug-30th-54fd10eb3654',
      published: 1629722146572,
    },
  ],
  [
    58,
    {
      title: "Remember the Titan? The TLDR on one of DeFi's most public events.",
      url: 'https://rugzombie.medium.com/remember-the-titan-the-tldr-on-one-of-defis-most-public-events-d7a76332b560',
      published: 1629599760507,
    },
  ],
  [
    57,
    {
      title: 'It’s time for a Totally Fungible Ape! EXCLUSIVE NFT DROP FOR LP PROVIDERS',
      url:
        'https://rugzombie.medium.com/its-time-for-a-totally-fungible-ape-exclusive-nft-drop-for-lp-providers-f6a3cb45c3a5',
      published: 1629512198798,
    },
  ],
  [
    56,
    {
      title: 'TITAN FALL — Introducing IRON Finance Auction and Grave',
      url: 'https://rugzombie.medium.com/titan-fall-introducing-iron-finance-auction-and-grave-c6f2c54221d1',
      published: 1629482119048,
    },
  ],
  [
    55,
    {
      title: 'AMA 11/08/2021',
      url: 'https://rugzombie.medium.com/ama-11-08-2021-694485014272',
      published: 1629295383189,
    },
  ],
  [
    54,
    {
      title: 'New SPAWNING POOL MAIN Street ($MAINST) Crypto',
      url: 'https://rugzombie.medium.com/new-spawning-pool-main-street-mainst-crypto-652795491489',
      published: 1629255785256,
    },
  ],
  [
    53,
    {
      title: 'Update on TRUST US Campaign and Locking our LP!',
      url: 'https://rugzombie.medium.com/update-on-trust-us-campaign-and-locking-our-lp-f7321aebc4c3',
      published: 1629191714657,
    },
  ],
  [
    52,
    {
      title: 'Introducing TWO HyruleSwap GRAVES',
      url: 'https://rugzombie.medium.com/introducing-two-hyruleswap-graves-76b5a7ac4b0a',
      published: 1629115176092,
    },
  ],
  [
    51,
    {
      title: 'Patient Zero Beta Auction — MAUSOLEUM',
      url: 'https://rugzombie.medium.com/patient-zero-beta-auction-mausoleum-636bed28e931',
      published: 1629081133223,
    },
  ],
  [
    50,
    {
      title: 'Introducing the OG Zombie Team',
      url: 'https://rugzombie.medium.com/introducing-the-og-zombie-team-9bae7d1beffb',
      published: 1628996003607,
    },
  ],
  [
    49,
    {
      title: 'Migration Plan to ApeSwap',
      url: 'https://rugzombie.medium.com/migration-plan-to-apeswap-9ce001c85ab0',
      published: 1628473908475,
    },
  ],
  [
    48,
    {
      title: 'New Spawning Pool: EULER TOOLS',
      url: 'https://rugzombie.medium.com/new-spawning-pool-euler-tools-a07b095a9846',
      published: 1628268695834,
    },
  ],
  [
    47,
    {
      title: 'RugZombie is on a Jungle Cruise with the ApeSwap BUIDL Program!',
      url: 'https://rugzombie.medium.com/rugzombie-is-on-a-jungle-cruise-with-the-apeswap-buidl-program-f17dd94346db',
      published: 1628132907308,
    },
  ],
  [
    46,
    {
      title: 'Keep Trusting - Dr. Frankenstein Time Lock!',
      url: 'https://rugzombie.medium.com/keep-trusting-dr-frankenstein-time-lock-e59a0246572a',
      published: 1628085281389,
    },
  ],
  [
    45,
    {
      title: 'We Want YOU to TRUST US',
      url: 'https://rugzombie.medium.com/we-want-you-to-trust-us-74b114ed2483',
      published: 1627967657733,
    },
  ],
  [
    44,
    {
      title: 'Introducing NEW GRAVE TYPES - Multipliers',
      url: 'https://rugzombie.medium.com/introducing-new-grave-types-multipliers-8af8ac4cd9f3',
      published: 1627935565316,
    },
  ],
  [
    43,
    {
      title: 'Say Goodbye to Chompers',
      url: 'https://rugzombie.medium.com/say-goodbye-to-chompers-76b1e6bb2e1e',
      published: 1627744386160,
    },
  ],
  [
    42,
    {
      title: 'Post Mortem on Emperor Token',
      url: 'https://rugzombie.medium.com/post-mortem-on-emperor-token-e4e4a23c1780',
      published: 1627391587709,
    },
  ],
  [
    41,
    {
      title: 'New GRAVE OFFERING: $RUGBIDEN Post Mortem',
      url: 'https://rugzombie.medium.com/new-grave-offering-rugbiden-post-mortem-9580d2e1abbc',
      published: 1626689836949,
    },
  ],
  [
    40,
    {
      title: 'RETURN OF THE HACK: $BURGER GRAVE OPEN on RugZombie',
      url: 'https://rugzombie.medium.com/return-of-the-hack-burger-grave-open-on-rugzombie-69f38cba019c',
      published: 1626666373808,
    },
  ],
  [
    39,
    {
      title: 'Marketing Update',
      url: 'https://rugzombie.medium.com/marketing-update-1797ea5337e5',
      published: 1626405044733,
    },
  ],
  [
    38,
    {
      title: 'First SPAWN: Gorilla Fi (G-Fi)',
      url: 'https://rugzombie.medium.com/first-spawn-gorilla-fi-g-fi-f16a234047f7',
      published: 1626265168956,
    },
  ],
  [
    37,
    {
      title: 'Viewing Your NFTs',
      url: 'https://rugzombie.medium.com/viewing-your-nfts-202c4791a60b',
      published: 1626185440026,
    },
  ],
  [
    36,
    {
      title: 'NEW FEATURE ALERT — The SPAWNING POOL Arrives',
      url: 'https://rugzombie.medium.com/new-feature-alert-the-spawning-pool-arrives-71f61687538b',
      published: 1626167413896,
    },
  ],
  [
    35,
    {
      title: 'NEW FEATURE ALERT — Introducing THE MAUSOLEUM',
      url: 'https://rugzombie.medium.com/new-feature-alert-introducing-the-mausoleum-4867bb4bdcbb',
      published: 1626152312321,
    },
  ],
  [
    34,
    {
      title: 'Uranium Finance',
      url: 'https://rugzombie.medium.com/uranium-finance-74ce9ccd788a',
      published: 1625909197016,
    },
  ],
  [
    33,
    {
      title: 'NEW GRAVE — WORLDS MOST NOTORIOUS RUG PULL (BUSD)',
      url: 'https://rugzombie.medium.com/new-grave-worlds-most-notorious-rug-pull-busd-96b01e916963',
      published: 1625809005853,
    },
  ],
  [
    32,
    {
      title: 'RugZombie Safety and the Evolution of the Rug Pull',
      url: 'https://rugzombie.medium.com/rugzombie-safety-and-the-evolution-of-the-rug-pull-dab1f68aea2e',
      published: 1625726565365,
    },
  ],
  [
    31,
    {
      title: 'Our Roadmap',
      url: 'https://rugzombie.medium.com/our-roadmap-55e683675ebb',
      published: 1625653580872,
    },
  ],
  [
    30,
    {
      title: 'RUGBIDEN Post Mortem',
      url: 'https://rugzombie.medium.com/rugbiden-post-mortem-3de9d04715c8',
      published: 1625547994963,
    },
  ],
  [
    29,
    {
      title: 'Thunderswap Post Mortem',
      url: 'https://rugzombie.medium.com/thunderswap-post-mortem-8e225ab22562',
      published: 1625471398881,
    },
  ],
  [
    28,
    {
      title: 'Whale Games',
      url: 'https://rugzombie.medium.com/whale-games-202a8c49a0d4',
      published: 1625464816079,
    },
  ],
  [
    27,
    {
      title: 'Basic Token Information',
      url: 'https://rugzombie.medium.com/basic-token-information-6074d61cf41b',
      published: 1625458965579,
    },
  ],
  [
    26,
    {
      title: 'Initial Launch and our APD (anti pump and dump) feature.',
      url: 'https://rugzombie.medium.com/initial-launch-and-our-apd-anti-pump-and-dump-feature-57999f89a8ee',
      published: 1625427423617,
    },
  ],
  [
    25,
    {
      title: 'TOKEN CONTRACT ADDRESS HAS BEEN UPDATED',
      url: 'https://rugzombie.medium.com/token-contract-address-has-been-updated-765b96dfc020',
      published: 1625413381566,
    },
  ],
  [
    24,
    {
      title: 'Merlin Lab',
      url: 'https://rugzombie.medium.com/merlin-lab-2f344e725314',
      published: 1625145630769,
    },
  ],
  [
    23,
    {
      title: 'Yield Panda',
      url: 'https://rugzombie.medium.com/yield-panda-ea746db74dc2',
      published: 1625064616564,
    },
  ],
  [
    22,
    {
      title: 'Some Tokenomics Information',
      url: 'https://rugzombie.medium.com/some-tokenomics-information-6103cd3dc58e',
      published: 1625059746243,
    },
  ],
  [
    21,
    {
      title: 'MEME CONTEST — THIRD Airdrop Contest (Yes, You Can Do All 3)',
      url: 'https://rugzombie.medium.com/meme-contest-third-airdrop-contest-yes-you-can-do-all-3-cacdac173e71',
      published: 1624903226682,
    },
  ],
  [
    20,
    {
      title: 'RUGGED PROJECT: Gorilla Yield Post Mortem (yAPE)',
      url: 'https://rugzombie.medium.com/rugged-project-gorilla-yield-post-mortem-yape-7a4dc093a15f',
      published: 1624811092400,
    },
  ],
  [
    19,
    {
      title: 'Post Mortem Report on DragonFarm Finance ($DRAGON)',
      url: 'https://rugzombie.medium.com/post-mortem-report-on-dragonfarm-finance-dragon-f84432150647',
      published: 1624800755357,
    },
  ],
  [
    18,
    {
      title: 'Fairmoon Post Mortem ( A Safer Moon? )',
      url: 'https://rugzombie.medium.com/fairmoon-post-mortem-a-safer-moon-7ed32756733',
      published: 1624635247764,
    },
  ],
  [
    17,
    {
      title: 'ICYMI: Techrate Audit Completed (with no critical issues)',
      url: 'https://rugzombie.medium.com/icymi-techrate-audit-completed-with-no-critical-issues-5f3b2a64b722',
      published: 1624035277695,
    },
  ],
  [
    16,
    {
      title: 'Genesis Block NFTs are Here',
      url: 'https://rugzombie.medium.com/genesis-block-nfts-are-here-90224aa3929a',
      published: 1623699875413,
    },
  ],
  [
    15,
    {
      title: 'Recap of AMA with AMA Lovers Club (June 11, 2021 14:00 UTC)',
      url: 'https://rugzombie.medium.com/recap-of-ama-with-ama-lovers-club-june-11-2021-14-00-utc-92112c002262',
      published: 1623606609274,
    },
  ],
  [
    14,
    {
      title: 'Marketing Roadmap (Living Document)',
      url: 'https://rugzombie.medium.com/marketing-roadmap-living-document-6c04a77ff772',
      published: 1623345626068,
    },
  ],
  [
    13,
    {
      title: 'Post Mortem Report on Defi100',
      url: 'https://rugzombie.medium.com/post-mortem-report-on-defi100-b0c0b15c477d',
      published: 1623331838264,
    },
  ],
  [
    12,
    {
      title: 'Initial Grave Offerings (Our First Pools)',
      url: 'https://rugzombie.medium.com/initial-grave-offerings-our-first-pools-6cbbbad2a62e',
      published: 1623246582592,
    },
  ],
  [
    11,
    {
      title: 'RugZombie Launches SECOND AIRDROP CONTEST (50,000 TOKENS)',
      url: 'https://rugzombie.medium.com/rugzombie-launches-second-airdrop-contest-50-000-tokens-a24e439ab73d',
      published: 1623178616490,
    },
  ],
  [
    10,
    {
      title: 'NFTs and Utility',
      url: 'https://rugzombie.medium.com/nfts-and-utility-934c77617210',
      published: 1622987005821,
    },
  ],
  [
    9,
    {
      title: 'Common Questions and Answers',
      url: 'https://rugzombie.medium.com/common-questions-and-answers-8f1136d2ec95',
      published: 1622906238278,
    },
  ],
  [
    8,
    {
      title: 'Welcome zSHARK Holders! (Collaboration with AutoShark Finance)',
      url: 'https://rugzombie.medium.com/welcome-zshark-holders-collaboration-with-autoshark-finance-db0903ac3d76',
      published: 1622827223057,
    },
  ],
  [
    7,
    {
      title: 'Security and Scams (Part 1)',
      url: 'https://rugzombie.medium.com/security-and-scams-part-1-47cd303875fe',
      published: 1622814626520,
    },
  ],
  [
    6,
    {
      title: 'RugZombie Main Features (Part 2)',
      url: 'https://rugzombie.medium.com/rugzombie-main-features-part-2-2614c773dae0',
      published: 1622771869950,
    },
  ],
  [
    5,
    {
      title: 'RugZombie — Main Features (That You Know About)',
      url: 'https://rugzombie.medium.com/rugzombie-main-features-that-you-know-about-5d304db53586',
      published: 1622728404737,
    },
  ],
  [
    4,
    {
      title: 'First Airdrop Coming — Earn 1000 Free Tokens from the RugZombie Team',
      url:
        'https://rugzombie.medium.com/first-airdrop-coming-earn-1000-free-tokens-from-the-rugzombie-team-13afbbf29eb8',
      published: 1622656561128,
    },
  ],
  [
    3,
    {
      title: 'RugZombie — The Problem & The Solution (Why We Exist)',
      url: 'https://rugzombie.medium.com/rugzombie-the-problem-the-solution-why-we-exist-1bd704e2466f',
      published: 1622640307280,
    },
  ],
  [
    2,
    {
      title: 'Utility = Value (and why RugZombie Team are BUIDLERS)',
      url: 'https://rugzombie.medium.com/utility-value-and-why-rugzombie-team-are-buidlers-872637f53082',
      published: 1622573601402,
    },
  ],
  [
    1,
    {
      title: 'Welcome to RugZombie',
      url: 'https://rugzombie.medium.com/welcome-to-rugzombie-873116bd45a7',
      published: 1622490778282,
    },
  ],
])

export default announcements
