export enum MenuItem {
  Internal,
  External
}

const config = [
  {
    label: 'Graves',
    href: '/graves'
  },
  {
    label: 'Tombs',
    href: '/tombs'
  },
  {
    label: 'Spawning Pools',
    href: '/spawning_pools'
  },
  {
    label: 'Exchange',
    href: 'https://swap.rugzombie.io/',
    type: MenuItem.External
  },
  {
    label: 'Graveyard',
    href: '/graveyard'
  },
  {
    label: 'Catacombs',
    href: '/catacombs'
  },

]

export default config