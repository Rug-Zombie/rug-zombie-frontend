import { MenuEntry } from '@rug-zombie-libs/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/home',
  },
  {
    label: 'Exchange',
    icon: 'ExchangeIcon',
    href: 'https://swap.rugzombie.io/',
  },  {
    label: 'Graves',
    icon: 'GravesIcon',
    href: '/graves',
  },
  {
    label: 'Tombs',
    icon: 'TombsIcon',
    href: '/tombs',
  },
  {
    label: 'Spawning Pools',
    icon: 'SpawningPoolIcon',
    href: '/spawning_pools'
  },
  {
    label: 'Shark Tank',
    icon: 'SharkTankIcon',
    href: '/sharktank'
  },
  {
    label: 'Mausoleum (BETA)',
    icon: 'MausoleumIcon',
    href: '/mausoleum',
  },
  {
    label: 'Graveyard',
    icon: 'GraveyardIcon',
    href: '/graveyard'
  },
  {
    label: 'Catacombs',
    icon: 'CatacombsIcon',
    href: '/catacombs'
  },
  {
    label: 'Profile',
    icon: 'ProfileIcon',
    href: '/profile'
  },
  {
    label: 'Referral Program',
    icon: 'ReferralIcon',
    items: [
      {
        label: 'In development',
        href: '/',
      },
    ],
  },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Contact',
        href: 'https://rugzombie.gitbook.io/docs/feedback-suggestions-and-bug-bounty',
      },
      {
        label: 'Github',
        href: 'https://github.com/Rug-Zombie',
      },
      {
        label: 'Docs',
        href: 'https://rugzombie.gitbook.io/docs/',
      },
    ],
  },
]

export default config
