import { now } from '../../utils/timerHelpers'

export enum SpawningPoolFilter {
  All,
  Staked,
  Ended
}

export enum RarityFilter {
  All,
  Legendary,
  Rare,
  Uncommon,
  Common,
}

export const spawningPoolFilters = [
  {
    label: 'All Pools',
    filter: sps => sps.filter(sp => sp.endDate > now())
  },
  {
    label: 'Staked',
    filter: sps => sps.filter(sp => sp.userInfo.amount.gt(0))
  },
  {
    label: 'Ended',
    filter: sps => sps.filter(sp => sp.endDate <= now())
  },
]