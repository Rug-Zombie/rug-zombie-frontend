export enum Type {
  InternalLink,
  ExternalLink,
}

const config = [
  [
    {
      label: 'Exchange',
      href: 'https://swap.rugzombie.io/',
      type: Type.ExternalLink,
    },
    {
      label: 'Graves',
      href: '/graves',
    },
    {
      label: 'Tombs',
      href: '/tombs',
    },
    {
      label: 'Spawning Pools',
      href: '/spawning_pools',
    },
  ],
  [
    {
      label: 'Graveyard',
      href: '/graveyard',
    },
    {
      label: 'Catacombs',
      href: '/catacombs',
    },
    {
      label: 'Shark Tank',
      href: '/sharktank',
    },
    {
      label: 'Mausoleum',
      href: '/mausoleum',
    },
  ],
  [
    {
      label: 'Burn Graves',
      href: '/burngraves',
    },
    {
      label: 'Contact',
      href: 'https://rugzombie.gitbook.io/docs/untitled',
    },
    {
      label: 'Github',
      href: 'https://github.com/Rug-Zombie',
      type: Type.ExternalLink,
    },
    {
      label: 'Docs',
      href: 'https://rugzombie.gitbook.io/docs/',
      type: Type.ExternalLink,
    },
    {
      label: 'Terms of service',
      href: 'https://rugzombie.gitbook.io/docs/fine-print-stuff/terms-of-use',
      type: Type.ExternalLink
    },
  ],
]

export default config
