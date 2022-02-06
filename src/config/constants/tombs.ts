import tokens from 'config/constants/tokens'
import { Dex, TombConfig } from './types'

const tombs: TombConfig[] = [
  {
    id: 3,
    pid: {
      56: 11,
      97: 2,
    },
    overlayId: {
      56: 2,
      97: 1,
    },
    lpAddress: {
      97: '0x72427E9ee25CC6e9e4Cee3C52a77EEA7eE33A83B',
      56: '0x4dbaf6479f0afa9f03c2a7d611151fa5b53ecdc8',
    },
    token1: tokens.zmbe,
    token2: tokens.wbnb,
    dex: Dex.PCS_V2,
  },
  {
    id: 2,
    pid: {
      56: 29,
      97: 4,
    },
    overlayId: {
      56: 0,
      97: 1,
    },
    lpAddress: {
      97: '0x72427E9ee25CC6e9e4Cee3C52a77EEA7eE33A83B',
      56: '0x9478DFb372cF5bDB2c87B8AE712698E8C8460c3e',
    },
    token1: tokens.zmbe,
    token2: tokens.wbnb,
    dex: Dex.AUTOSHARK,
    notNativeDex: true
  },
  {
    id: 1,
    pid: {
      56: 17,
      97: 3,
    },
    overlayId: {
      56: 1,
      97: 2,
    },
    lpAddress: {
      97: '0x72427E9ee25CC6e9e4Cee3C52a77EEA7eE33A83B',
      56: '0xcaa139138557610fe00f581498f283a789355d14',
    },
    token1: tokens.zmbe,
    token2: tokens.wbnb,
    dex: Dex.APESWAP,
    notNativeDex: true,
  },
]

export default tombs
