import {Normal} from "../../../../components/Icons";

interface Collection {
  title: any
  description: string
  nftId: number
}

const config: Collection[] = [
  {
    title: Normal,
    description: 'None',
    nftId: 0,
  },

  {
    title: 'All',
    description: 'None',
    nftId: 0,
  },
  {
    title: 'Biblical',
    description: 'Powerful one of a kind relic’s from the pre apocalyptic times.',
    nftId: 5,
  },
  {
    title: 'Mythic',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy',
    nftId: 43,
  },
  {
    title: 'Legendary',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy',
    nftId: 74,
  },
  {
    title: 'Rare',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy',
    nftId: 41,
  },
  {
    title: 'Uncommon',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy',
    nftId: 14,
  },
  {
    title: 'Common',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy',
    nftId: 55,
  },
  {
    title: 'Special',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy',
    nftId: 52,
  },
]

export default config
