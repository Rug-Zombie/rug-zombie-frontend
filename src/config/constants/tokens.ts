const tokens = {
  bnb: {
    symbol: 'BNB',
    address: {
      56: 'BNB',
      97: 'BNB',
    },
    decimals: 18,
    projectLink: 'https://www.binance.com/',
    geckoId: 'binancecoin',
  },
  cake: {
    symbol: 'CAKE',
    address: {
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
      97: '0xf3A3a31b90BE814A45170CbC9df0678219c03656',
    },
    decimals: 18,
    projectLink: 'https://rugzombie.io/',
    geckoId: 'pancakeswap-token',
  },
  zmbe: {
    symbol: 'ZMBE',
    address: {
      56: '0x50ba8BF9E34f0F83F96a340387d1d3888BA4B3b5',
      97: '0xB8EE810b15553A7f11eC813C0FDF7C25bab89C4E',
    },
    decimals: 18,
    projectLink: 'https://rugzombie.io/',
    geckoId: 'rugzombie',
  },
  euler: {
    symbol: 'EULER',
    address: {
      56: '0x3920123482070c1a2dff73aad695c60e7c6f6862',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://euler.tools/',
    tokenLogo: 'https://bscscan.com/token/images/eulertools_32.png'
  },
  if1: {
    symbol: 'IF1',
    address: {
      56: '0xfCaC1a3eDE7b55Cc51e3eBff2885a67FBfE01a1A',
      97: '',
    },
    decimals: 9,
    projectLink: 'https://infiniteone.io/',
  },
  byg: {
    symbol: 'BYG',
    address: {
      56: '0x4f7b627b88651e3dddca0240bca68a3062632c8c',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://www.blackeyegalaxy.space/',
    tokenLogo: 'https://assets.coingecko.com/coins/images/16814/small/logo_200_white.png?1625150910'
  },
  punks: {
    symbol: 'PUNKS',
    address: {
      56: '0xf428fc1126b7c1b1bd266f1e415ac05255fa7748',
      97: '',
    },
    decimals: 9,
    projectLink: 'https://streetpunks.org/',
    tokenLogo: 'https://i0.wp.com/streetpunks.org/wp-content/uploads/2021/11/cropped-2021-11-16_20h34_53-1.png?w=826&ssl=1'
  },
  l1ghtv2: {
    symbol: 'L1ght',
    address: {
      56: '0x6052327e918ccc2f24fe0a2b6fa2649e30339d04',
      97: '',
    },
    decimals: 9,
    projectLink: 'https://l1ghtl1st.io/',
    tokenLogo: 'https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fs3.amazonaws.com%2Fappforest_uf%2Ff1634140724647x381024309361064100%2FNewToken.png?w=384&h=384&auto=compress&fit=crop&dpr=2'
  },
  rugbiden: {
    symbol: 'RUGBIDEN',
    address: {
      56: '0x7f84a94ba46ccdc78325d0484f62451f3e4b8076',
      97: '0x7f84a94ba46ccdc78325d0484f62451f3e4b8076',
    },
    decimals: 9,
    projectLink: '/',
  },
  burger: {
    symbol: 'BURGER',
    address: {
      56: '0xae9269f27437f0fcbc232d39ec814844a51d6b8f',
      97: '0xae9269f27437f0fcbc232d39ec814844a51d6b8f',
    },
    decimals: 18,
    projectLink: '/',
  },
  zshark: {
    symbol: 'ZSHARK',
    address: {
      56: '0x40ab94f28fbf07ae45b9e50132da643a720e0e32',
      97: '0x40ab94f28fbf07ae45b9e50132da643a720e0e32',
    },
    decimals: 18,
    projectLink: ''
  },
  gfi: {
    symbol: 'G-Fi',
    address: {
      56: '0xc82C80E03E491B252Cae745575ea2d1c2fDDe25A',
      97: '0xc82C80E03E491B252Cae745575ea2d1c2fDDe25A',
    },
    decimals: 8,
    projectLink: 'https://www.gorillafi.com/',
    tokenLogo: 'https://bscscan.com/token/images/gorillafi2_32.png'
  },
  merl: {
    symbol: 'MERL',
    address: {
      56: '0xda360309c59cb8c434b28a91b823344a96444278',
      97: '0xda360309c59cb8c434b28a91b823344a96444278',
    },
    decimals: 18,
    projectLink: ''
  },
  undead: {
    symbol: 'UNDEAD',
    address: {
      56: '0xa2394aff511de6661b8178dfc9cecfd04cc614e8',
      97: '0x85537ef782bab72e65704aa59e5C71131561D422',
    },
    decimals: 18,
    projectLink: 'https://rugzombie.io/',
  },
  fairmoon: {
    symbol: 'FAIRMOON',
    address: {
      56: '0xfe75cD11E283813eC44B4592476109Ba3706cef6',
      97: '',
    },
    decimals: 9,
    projectLink: 'https://fairmoon.org/',
  },
  bonfire: {
    symbol: 'BONFIRE',
    address: {
      56: '0x5e90253fbae4dab78aa351f4e6fed08a64ab5590',
      97: '',
    },
    decimals: 9,
    projectLink: 'https://www.bonfiretoken.co/',
  },
  u92: {
    symbol: 'U92',
    address: {
      56: '0x670De9f45561a2D02f283248F65cbd26EAd861C8',
      97: '',
    },
    decimals: 18,
    projectLink: '',
  },
  dragon: {
    symbol: 'DRAGON',
    address: {
      56: '0x251a3184857488dc90fa9c9a52fd2d8df473d92c',
      97: '',
    },
    decimals: 8,
    projectLink: 'https://dragonfarm.finance/',
  },
  squidgame: {
    symbol: 'SQUID',
    address: {
      56: '0x87230146e138d3f296a9a77e497a2a83012e9bc5',
      97: '',
    },
    decimals: 18,
    projectLink: '',
    tokenLogo: 'https://assets.coingecko.com/coins/images/20506/small/Squid_Game_Logo-0001.png?1637150038'
  },
  iron: {
    symbol: 'IRON',
    address: {
      56: '0x7b65B489fE53fCE1F6548Db886C08aD73111DDd8',
      97: '',
    },
    decimals: 18,
    projectLink: '',
    tokenLogo: 'https://assets.coingecko.com/coins/images/14588/small/logo_-_2021-03-31T123525.615.png?1617165339'
  },
  roningmz: {
    symbol: 'RONINGMZ',
    address: {
      56: '0x980b37a82b60a32965b6e56356d14e0410ea440f',
      97: '',
    },
    decimals: 18,
    projectLink: '',
    tokenLogo: 'https://assets.coingecko.com/coins/images/19203/small/logo_200x200_%285%29.png?1634682332'
  },
  zroningmz: {
    symbol: 'ZRONINGMZ',
    address: {
      56: '0x1e25f2da754ebe4eb1cc11c255da8cafa37b9472',
      97: '',
    },
    decimals: 0,
    projectLink: '',
    tokenLogo: 'https://assets.coingecko.com/coins/images/19203/small/logo_200x200_%285%29.png?1634682332'
  },
  hunny: {
    symbol: 'HUNNY',
    address: {
      56: '0x565b72163f17849832a692a3c5928cc502f46d69',
      97: '',
    },
    decimals: 18,
    projectLink: '',
    tokenLogo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDM1MiwgMjAyMC8wMS8zMC0xNTo1MDozOCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjEgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkJBQjZCNzJCQzUwMDExRUJCRTAwRTFBQTcxNUZEMzY3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkJBQjZCNzJDQzUwMDExRUJCRTAwRTFBQTcxNUZEMzY3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QkFCNkI3MjlDNTAwMTFFQkJFMDBFMUFBNzE1RkQzNjciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QkFCNkI3MkFDNTAwMTFFQkJFMDBFMUFBNzE1RkQzNjciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5fVWEDAAAN0klEQVR42uxaC3QU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'
  },
  mneb: {
    symbol: 'MNEB',
    address: {
      56: '0xd22202d23fe7de9e3dbe11a2a88f42f4cb9507cf',
      97: '',
    },
    decimals: 8,
    projectLink: '',
    tokenLogo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1673.png'
  },
  zmneb: {
    symbol: 'zMNEB',
    address: {
      56: '0x043EfaF7aC4Efb1E373D0368FC2DB33f063DF82d',
      97: '',
    },
    decimals: 0,
    projectLink: '',
    tokenLogo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1673.png'
  },
  yape: {
    symbol: 'yAPE',
    address: {
      56: '0x64b783a80d0c05bed0e2f1a638465a7ba3f4a6fb',
      97: '',
    },
    decimals: 8,
    projectLink: 'https://gorillayield.finance/',
  },
  ypanda: {
    symbol: 'yPANDA',
    address: {
      56: '0x9806aec346064183b5cE441313231DFf89811f7A',
      97: '',
    },
    decimals: 8,
    projectLink: 'https://pandayield.com/#/',
  },
  viking: {
    symbol: 'VIKING',
    address: {
      56: '0x896eDE222D3f7f3414e136a2791BDB08AAa25Ce0',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://www.vikingswap.finance/',
  },
  zmpr: {
    symbol: 'ZMPR',
    address: {
      56: '0x103ED7038914AB877cfA4A8961333D9af8236852',
      97: ''
    },
    decimals: 0,
  },
  rupee: {
    symbol: 'RUPEE',
    address: {
      56: '0x7b0409a3a3f79baa284035d48e1dfd581d7d7654',
      97: ''
    },
    decimals: 18,
    projectLink: 'https://app.hyruleswap.com/'
  },
  grupee: {
    symbol: 'gRUPEE',
    address: {
      56: '0x8efa59bf5f47c6fe0e97c15cad12f2be6bb899a1',
      97: ''
    },
    decimals: 18,
    projectLink: 'https://app.hyruleswap.com/'
  },
  mainst: {
    symbol: "$MAINST",
    address: {
      56: '0x8fc1a944c149762b6b578a06c0de2abd6b7d2b89',
      97: ''
    },
    decimals: 9,
    projectLink: 'https://www.buymainstreet.com/',
  },
  nalis: {
    symbol: "NALIS",
    address: {
      56: '0xb2ebaa0ad65e9c888008bf10646016f7fcdd73c3',
      97: ''
    },
    decimals: 18,
    projectLink: 'https://app.koaladefi.finance/',
  },
  panther: {
    symbol: "PANTHER",
    address: {
      56: '0x1f546ad641b56b86fd9dceac473d1c7a357276b7',
      97: '0x8CD20B92A5853b50AADbf355e46A0E995A170286'
    },
    decimals: 18,
    projectLink: 'https://pantherswap.com/'
  },
  tndr: {
    symbol: 'TNDR',
    address: {
      56: '0x7cc46141ab1057b1928de5ad5ee78bb37efc4868',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://www.thunderswap.finance/',
  },
  d100: {
    symbol: 'D100',
    address: {
      56: '0x9d8aac497a4b8fe697dd63101d793f0c6a6eebb6',
      97: '',
    },
    decimals: 9,
    projectLink: 'https://defi100.org/',
  },
  msc: {
    symbol: 'MSC',
    address: {
      56: '0x8c784c49097dcc637b93232e15810d53871992bf',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://monsterslayer.finance/',
  },
  basicZmbe: {
    symbol: 'BASIC-ZMBE',
    address: {
      56: '0x22e42D9425b55FD2262bfF72a316bb052DDb2a77',
      97: '',
    },
    decimals: 0,
    projectLink: '',
  },
  wnow: {
    symbol: 'WNOW',
    address: {
      56: '0x56aa0237244c67b9a854b4efe8479cca0b105289',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://walletnow.net/',
    tokenLogo: 'https://bscscan.com/token/images/walletnow_32.png'
  },
  bingus: {
    symbol: 'BINGUS',
    address: {
      56: '0x12adadddc8d86081561a3ff107a2cb347779e717',
      97: '',
    },
    decimals: 9,
    projectLink: 'https://bingus.io/',
  },
  pokecoin: {
    symbol: 'POKECOIN',
    address: {
      56: '0x8364c57ba219dfbc8033f1368123f29beb75b4dc',
      97: '',
    },
    decimals: 18,
    projectLink: '',
  },
  zombie_no_relation: {
    symbol: 'Zombie (No Relation)',
    address: {
      56: '0x99d6b719D78f75A0A8f34d7443630dF58973fF41',
      97: '',
    },
    decimals: 18,
    projectLink: '',
  },
  llt: {
    symbol: 'LLT',
    address: {
      56: '0xd37c1417da7bf5b02ffdea8d5427022dc88a0ee2',
      97: '',
    },
    decimals: 8,
    projectLink: '',
  },
  bjt: {
    symbol: 'BJT',
    address: {
      56: '0x37f3ef4e065f3415d1b6f9284389cc9d9439f658',
      97: '',
    },
    decimals: 18,
    projectLink: '',
  },
  fins: {
    symbol: 'FINS',
    address: {
      56: '0x1b219aca875f8c74c33cff9ff98f3a9b62fcbff5',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://autoshark.finance/',
    tokenLogo: 'images/tokens/FINS.svg'
  },
  finsbnb: {
    symbol: 'FINS-BNB LP',
    address: {
      56: '0x14B5a6d26577970953F9E6608d6604e4676Ac5b7',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://autoshark.finance/',
    tokenLogo: 'images/tokens/FINS.svg'
  },
  jawsbnb: {
    symbol: 'JAWS-BNB LP',
    address: {
      56: '0x1BbA5C6Cc38EF04066042237b4298dC23405304D',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://autoshark.finance/',
  },
  diamonds: {
    symbol: 'DIAMONDS',
    address: {
      56: '0x37c4bcf0b8fc6f074be933af7fb9d1dde55f979c',
      97: '',
    },
    decimals: 12,
  },
  kids: {
    symbol: 'KIDS',
    address: {
      56: '0x7acf49997e9598843cb9051389fa755969e551bb',
      97: '',
    },
    decimals: 9,
  },
  zdiamonds: {
    symbol: 'ZDIAMONDS',
    address: {
      56: '0xCDB6FC41a78ca570e9e27C627eC4a9d165F44A10',
      97: '',
    },
    decimals: 0,
  },
  zbog: {
    symbol: 'ZBOG',
    address: {
      56: '0xeaaD9e5Ab71E5B21492a6686afdbB4A598A641ab',
      97: '',
    },
    decimals: 0,
  },
  bog: {
    symbol: 'BOG',
    address: {
      56: '0xb09fe1613fe03e7361319d2a43edc17422f36b09',
      97: '',
    },
    decimals: 18,
  },
  horde: {
    symbol: 'HORDE',
    address: {
      56: '0xE30043524ADb329169b11eDfe833a9beDd4D2A11',
      97: '',
    },
    decimals: 0,
    projectLink: '',
  },
  kcake: {
    symbol: 'KCAKE',
    address: {
      56: '0xc22e8114818a918260662375450e19ac73d32852',
      97: '',
    },
    decimals: 18,
    projectLink: '',
  },
  mkc: {
    symbol: 'MKC',
    address: {
      56: '0x92cc2c999ade41c71d1c8136d5b57d12564e045f',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://www.milkyway.games/',
  },
  atmssft: {
    symbol: 'ATMSSFT',
    address: {
      56: '0xc53c65c4a925039cc149fa99fd011490d40270a3',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://www.atmossoftdefi.app/',
    tokenLogo: 'https://bscscan.com/token/images/atmossoft_32.png'
  },
  plx: {
    symbol: 'PLX',
    address: {
      56: '0x57022edd5c7ed7b6bd870488853fe961dfdd3fb6',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://octaplex.io/',
    tokenLogo: 'https://bscscan.com/token/images/octaplex_32.png'
  },
  fcf: {
    symbol: 'FCF',
    address: {
      56: '0x4673f018cc6d401AAD0402BdBf2abcBF43dd69F3',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://frenchconnection.finance/',
  },
  goldbar: {
    symbol: 'GOLDBAR',
    address: {
      56: '0x24f6ECAF0B9E99D42413F518812d2c4f3EeFEB12',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://block-mine.io/',
  },
  pirate: {
    symbol: 'PIRATE',
    address: {
      56: '0x63041a8770c4cfe8193d784f3dc7826eab5b7fd2',
      97: '',
    },
    decimals: 18,
    projectLink: '',
    tokenLogo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/10922.png'
  },
  txl: {
    symbol: 'TXL',
    address: {
      56: '0x1ffd0b47127fdd4097e54521c9e2c7f0d66aafc5',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://tixl.org/',
  },
  nuggetGoldbarApeLp: {
    symbol: 'APE-LP',
    address: {
      56: '0x46Da2455D212bf8BC78D5fE557074dc7602969C0',
      97: ''
    },
    decimals: 18,
    projectLink: '',
  },
  cos: {
    symbol: 'COS',
    address: {
      56: '0x96Dd399F9c3AFda1F194182F71600F1B65946501',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://www.contentos.io/',
  },
  bunny: {
    symbol: 'BUNNY',
    address: {
      56: '0xc9849e6fdb743d08faee3e34dd2d1bc69ea11a51',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://pancakebunny.finance/',
  },
  alice: {
    symbol: 'ALICE',
    address: {
      56: '0xac51066d7bec65dc4589368da368b212745d63e8',
      97: '',
    },
    decimals: 6,
    projectLink: 'https://www.myneighboralice.com/',
  },
  for: {
    symbol: 'FOR',
    address: {
      56: '0x658A109C5900BC6d2357c87549B651670E5b0539',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://www.for.tube/home',
  },
  bux: {
    symbol: 'BUX',
    address: {
      56: '0x211ffbe424b90e25a15531ca322adf1559779e45',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://getbux.com/bux-crypto/',
  },
  nuls: {
    symbol: 'NULS',
    address: {
      56: '0x8cd6e29d3686d24d3c2018cee54621ea0f89313b',
      97: '',
    },
    decimals: 8,
    projectLink: 'https://www.nuls.io/',
  },
  belt: {
    symbol: 'BELT',
    address: {
      56: '0xE0e514c71282b6f4e823703a39374Cf58dc3eA4f',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://beta.belt.fi/',
  },
  ramp: {
    symbol: 'RAMP',
    address: {
      56: '0x8519ea49c997f50ceffa444d240fb655e89248aa',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://rampdefi.com/',
  },
  bfi: {
    symbol: 'BFI',
    address: {
      56: '0x81859801b01764d4f0fa5e64729f5a6c3b91435b',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://bearn.fi/',
  },
  dexe: {
    symbol: 'DEXE',
    address: {
      56: '0x039cb485212f996a9dbb85a9a75d898f94d38da6',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://dexe.network/',
  },
  bel: {
    symbol: 'BEL',
    address: {
      56: '0x8443f091997f06a61670b735ed92734f5628692f',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://bella.fi/',
  },
  tpt: {
    symbol: 'TPT',
    address: {
      56: '0xeca41281c24451168a37211f0bc2b8645af45092',
      97: '',
    },
    decimals: 4,
    projectLink: 'https://www.tokenpocket.pro/',
  },
  watch: {
    symbol: 'WATCH',
    address: {
      56: '0x7a9f28eb62c791422aa23ceae1da9c847cbec9b0',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://yieldwatch.net/',
  },
  xmark: {
    symbol: 'xMARK',
    address: {
      56: '0x26a5dfab467d4f58fb266648cae769503cec9580',
      97: '',
    },
    decimals: 9,
    projectLink: 'https://benchmarkprotocol.finance/',
  },
  bmxx: {
    symbol: 'bMXX',
    address: {
      56: '0x4131b87f74415190425ccd873048c708f8005823',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://multiplier.finance/',
  },
  iotx: {
    symbol: 'IOTX',
    address: {
      56: '0x9678e42cebeb63f23197d726b29b1cb20d0064e5',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://iotex.io/',
  },
  bor: {
    symbol: 'BOR',
    address: {
      56: '0x92d7756c60dcfd4c689290e8a9f4d263b3b32241',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://www.boringdao.com/',
  },
  bopen: {
    symbol: 'bOPEN',
    address: {
      56: '0xf35262a9d427f96d2437379ef090db986eae5d42',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://opendao.io/',
  },
  dodo: {
    symbol: 'DODO',
    address: {
      56: '0x67ee3cb086f8a16f34bee3ca72fad36f7db929e2',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://dodoex.io/',
  },
  swingby: {
    symbol: 'SWINGBY',
    address: {
      56: '0x71de20e0c4616e7fcbfdd3f875d568492cbe4739',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://swingby.network/',
  },
  bry: {
    symbol: 'BRY',
    address: {
      56: '0xf859bf77cbe8699013d6dbc7c2b926aaf307f830',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://berrydata.co/',
  },
  zee: {
    symbol: 'ZEE',
    address: {
      56: '0x44754455564474a89358b2c2265883df993b12f0',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://zeroswap.io/',
  },
  swgb: {
    symbol: 'SWGb',
    address: {
      56: '0xe40255c5d7fa7ceec5120408c78c787cecb4cfdb',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://swirgepay.com/',
  },
  sfp: {
    symbol: 'SFP',
    address: {
      56: '0xd41fdb03ba84762dd66a0af1a6c8540ff1ba5dfb',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://www.safepal.io/',
  },
  lina: {
    symbol: 'LINA',
    address: {
      56: '0x762539b45a1dcce3d36d080f74d1aed37844b878',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://linear.finance/',
  },
  lit: {
    symbol: 'LIT',
    address: {
      56: '0xb59490ab09a0f526cc7305822ac65f2ab12f9723',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://www.litentry.com/',
  },
  hget: {
    symbol: 'HGET',
    address: {
      56: '0xc7d8d35eba58a0935ff2d5a33df105dd9f071731',
      97: '',
    },
    decimals: 6,
    projectLink: 'https://www.hedget.com/',
  },
  bdo: {
    symbol: 'BDO',
    address: {
      56: '0x190b589cf9fb8ddeabbfeae36a813ffb2a702454',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://bdollar.fi/',
  },
  egld: {
    symbol: 'EGLD',
    address: {
      56: '0xbf7c81fff98bbe61b40ed186e4afd6ddd01337fe',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://elrond.com/',
  },
  ust: {
    symbol: 'UST',
    address: {
      56: '0x23396cf899ca06c4472205fc903bdb4de249d6fc',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://mirror.finance/',
  },
  wsote: {
    symbol: 'wSOTE',
    address: {
      56: '0x541e619858737031a1244a5d0cd47e5ef480342c',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://soteria.finance/#/',
  },
  front: {
    symbol: 'FRONT',
    address: {
      56: '0x928e55dab735aa8260af3cedada18b5f70c72f1b',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://frontier.xyz/',
  },
  helmet: {
    symbol: 'Helmet',
    address: {
      56: '0x948d2a81086a075b3130bac19e4c6dee1d2e3fe8',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://www.helmet.insure/',
  },
  btcst: {
    symbol: 'BTCST',
    address: {
      56: '0x78650b139471520656b9e7aa7a5e9276814a38e9',
      97: '',
    },
    decimals: 17,
    projectLink: 'https://www.1-b.tc/',
  },
  bscx: {
    symbol: 'BSCX',
    address: {
      56: '0x5ac52ee5b2a633895292ff6d8a89bb9190451587',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://bscex.org/',
  },
  ten: {
    symbol: 'TEN',
    address: {
      56: '0xdff8cb622790b7f92686c722b02cab55592f152c',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://www.tenet.farm/',
  },
  balbt: {
    symbol: 'bALBT',
    address: {
      56: '0x72faa679e1008ad8382959ff48e392042a8b06f7',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://allianceblock.io/',
  },
  asr: {
    symbol: 'ASR',
    address: {
      56: '0x80d5f92c2c8c682070c95495313ddb680b267320',
      97: '',
    },
    decimals: 2,
    projectLink: 'https://www.chiliz.com',
  },
  atm: {
    symbol: 'ATM',
    address: {
      56: '0x25e9d05365c867e59c1904e7463af9f312296f9e',
      97: '',
    },
    decimals: 2,
    projectLink: 'https://www.chiliz.com',
  },
  og: {
    symbol: 'OG',
    address: {
      56: '0xf05e45ad22150677a017fbd94b84fbb63dc9b44c',
      97: '',
    },
    decimals: 2,
    projectLink: 'https://www.chiliz.com',
  },
  reef: {
    symbol: 'REEF',
    address: {
      56: '0xf21768ccbc73ea5b6fd3c687208a7c2def2d966e',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://reef.finance/',
  },
  ditto: {
    symbol: 'DITTO',
    address: {
      56: '0x233d91a0713155003fc4dce0afa871b508b3b715',
      97: '',
    },
    decimals: 9,
    projectLink: 'https://ditto.money/',
  },
  juv: {
    symbol: 'JUV',
    address: {
      56: '0xc40c9a843e1c6d01b7578284a9028854f6683b1b',
      97: '',
    },
    decimals: 2,
    projectLink: 'https://www.chiliz.com',
  },
  psg: {
    symbol: 'PSG',
    address: {
      56: '0xbc5609612b7c44bef426de600b5fd1379db2ecf1',
      97: '',
    },
    decimals: 2,
    projectLink: 'https://www.chiliz.com',
  },
  vai: {
    symbol: 'VAI',
    address: {
      56: '0x4bd17003473389a42daf6a0a729f6fdb328bbbd7',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://venus.io/',
  },
  wbnb: {
    symbol: 'wBNB',
    address: {
      56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
      97: '0xae13d989dac2f0debff460ac112a837c89baa7cd',
    },
    decimals: 18,
    projectLink: 'https://pancakeswap.finance/',
  },
  squidstake: {
    symbol: 'SQUID',
    address: {
      56: '0xae61e7dc989718e700c046a2483e93513edca484',
      97: '0xae13d989dac2f0debff460ac112a837c89baa7cd',
    },
    decimals: 18,
    projectLink: 'https://squidstake.com',
    tokenLogo: 'https://squidstake.com/tokens/0xAE61e7dc989718E700C046a2483e93513eDCA484.png'
  },
  sushi: {
    symbol: 'SUSHI',
    address: {
      56: '0x947950bcc74888a40ffa2593c5798f11fc9124c4',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://sushi.com/',
  },
  syrup: {
    symbol: 'SYRUP',
    address: {
      56: '0x009cF7bC57584b7998236eff51b98A168DceA9B0',
      97: '0xfE1e507CeB712BDe086f3579d2c03248b2dB77f9',
    },
    decimals: 18,
    projectLink: 'https://pancakeswap.finance/',
  },
  busd: {
    symbol: 'BUSD',
    address: {
      56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
      97: '0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee',
    },
    decimals: 18,
    projectLink: 'https://www.paxos.com/busd/',
  },
  eth: {
    symbol: 'ETH',
    address: {
      56: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://ethereum.org/en/',
  },
  beth: {
    symbol: 'BETH',
    address: {
      56: '0x250632378e573c6be1ac2f97fcdf00515d0aa91b',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://ethereum.org/en/eth2/beacon-chain/',
  },
  usdc: {
    symbol: 'USDC',
    address: {
      56: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://www.centre.io/usdc',
  },
  dai: {
    symbol: 'DAI',
    address: {
      56: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
      97: '',
    },
    decimals: 18,
    projectLink: 'http://www.makerdao.com/',
  },
  ada: {
    symbol: 'ADA',
    address: {
      56: '0x3ee2200efb3400fabb9aacf31297cbdd1d435d47',
      97: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
    },
    decimals: 18,
    projectLink: 'https://www.cardano.org/',
  },
  dot: {
    symbol: 'DOT',
    address: {
      56: '0x7083609fce4d1d8dc0c979aab8c869ea2c873402',
      97: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
    },
    decimals: 18,
    projectLink: 'https://polkadot.network/',
  },
  eos: {
    symbol: 'EOS',
    address: {
      56: '0x56b6fb708fc5732dec1afc8d8556423a2edccbd6',
      97: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
    },
    decimals: 18,
    projectLink: 'https://eos.io/',
  },
  link: {
    symbol: 'LINK',
    address: {
      56: '0xf8a0bf9cf54bb92f17374d9e9a321e6a111a51bd',
      97: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
    },
    decimals: 18,
    projectLink: 'https://chain.link/',
  },
  usdt: {
    symbol: 'USDT',
    address: {
      97: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
      56: '0x55d398326f99059ff775485246999027b3197955',
    },
    decimals: 18,
    projectLink: 'https://tether.to/',
  },
  btcb: {
    symbol: 'BTCB',
    address: {
      56: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
      97: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
    },
    decimals: 18,
    projectLink: 'https://bitcoin.org/',
  },
  xrp: {
    symbol: 'XRP',
    address: {
      56: '0x1d2f0da169ceb9fc7b3144628db156f3f6c60dbe',
      97: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
    },
    decimals: 18,
    projectLink: 'https://ripple.com/xrp/',
  },
  atom: {
    symbol: 'ATOM',
    address: {
      56: '0x0eb3a705fc54725037cc9e008bdede697f62f335',
      97: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
    },
    decimals: 18,
    projectLink: 'https://cosmos.network/',
  },
  jaws: {
    symbol: 'JAWS',
    address: {
      56: '0xdd97ab35e3c0820215bc85a395e13671d84ccba2',
      97: '0xCE2DFB3a10f534Fa18c9d15C0239938C06Ab3b24'
    },
    decimals: 18,
    projectLink: 'https://autoshark.finance/'
  },
  none: {
    symbol: '',
    address: {
      56: '',
      97: '',
    },
    decimals: 0,
    projectLink: '',
  },
}

export default tokens
