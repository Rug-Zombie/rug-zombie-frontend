import { useGetNftById } from '../../state/hooks'

export enum TombFilter {
  All,
  Staked,
  NftOnly,
  Retired
}

export enum RarityFilter {
  All,
  Legendary,
  Rare,
  Uncommon,
  Common,
}

export const tombFilters = [
  {
    label: 'All tombs',
    filter: gs => gs.filter(g => !g.isRetired && g.poolInfo.allocPoint.gt(0))
  },
  {
    label: 'Staked',
    filter: gs => gs.filter(g => g.userInfo.amount.gt(0))
  },
  {
    label: 'NFT-only',
    filter: gs => gs.filter(g => !g.isRetired && g.poolInfo.allocPoint.isZero())
  },
  {
    label: 'Retired',
    filter: gs => gs.filter(g => g.isRetired)
  },
]

export const rarityFilters = [
  {
    label: 'All types',
    filter: gs => gs
  },
  {
    label: 'Legendary',
    filter: gs => gs.filter(g => useGetNftById(g.nftId).rarity === 'Legendary')
  },
  {
    label: 'Rare',
    filter: gs => gs.filter(g => useGetNftById(g.nftId).rarity === 'Rare')
  },
  {
    label: 'Uncommon',
    filter: gs => gs.filter(g => useGetNftById(g.nftId).rarity === 'Uncommon')
  },
  {
    label: 'Common',
    filter: gs => gs.filter(g => useGetNftById(g.nftId).rarity === 'Common')
  },
]