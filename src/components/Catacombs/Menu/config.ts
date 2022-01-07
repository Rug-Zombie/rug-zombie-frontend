import { MenuEntry } from '@catacombs-libs/uikit'

const config: MenuEntry[] = [
  {
    label: 'Catacombs',
    icon: 'HomeIcon',
    href: '/catacombs',
  },
  {
    label: 'Data Lab',
    icon: 'DataLabIcon',
    href: `/datalab`,
  },
  {
    label: 'Rug Roll',
    icon: 'RugRollIcon',
    href: `/rugroll`,
  },
  {
    label: 'Black Market',
    icon: 'BlackMarketIcon',
    href: `/blackmarket`,
  },
  {
    label: 'Barracks',
    icon: 'BarracksIcon',
    items: [
      {
        label: 'Coming Soon!',
        href: '/',
      }
    ],
  },
  {
    label: 'RugZombie',
    icon: 'HomeIcon',
    href: `/`,
  },
]

export default config
