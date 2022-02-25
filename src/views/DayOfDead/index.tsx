import React from 'react'
import { Flex, Heading } from '@rug-zombie-libs/uikit'
import PageHeader from 'components/PageHeader'
import artists from 'config/constants/artists'
import Page from 'components/layout/Page'
import NftCard from './NftCard'

const DayOfDead: React.FC = () => {
  return (
    <>
      <PageHeader background="#101820">
        <Flex justifyContent="space-between" flexDirection={['column', null, 'row']}>
          <Flex flexDirection="column" mr={['8px', 0]}>
            <Heading as="h1" size="xxl" color="secondary" mb="24px">
              Day of the Dead NFT Swap
            </Heading>
            <Heading size="md" color="text">
              Convert your Rug Zombie NFTs into special edition Dead of the Dead NFTs
            </Heading>
          </Flex>
        </Flex>
      </PageHeader>
      <Page>
        <NftCard name="Common" artist={artists.RugZombie} rznftid={6} dodnftid={49} />
        <NftCard name="Unommon" artist={artists.RugZombie} rznftid={19} dodnftid={50} />
        <NftCard name="Rare" artist={artists.RugZombie} rznftid={29} dodnftid={51} />
      </Page>
    </>
  )
}

export default DayOfDead
