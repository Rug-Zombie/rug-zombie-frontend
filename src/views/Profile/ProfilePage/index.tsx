import React, { useEffect, useState } from 'react'
import { Heading, LinkExternal, Text, CardsLayout } from '@rug-zombie-libs/uikit'
import { account, nfts, zombiePriceUsd } from 'redux/get'
import styled from 'styled-components'

import { nftUserInfo } from 'redux/fetch'
import { useNftOwnership, useZombieBalanceChecker } from 'hooks/useContract'
import { BigNumber } from 'bignumber.js'
import Page from '../../../components/layout/Page'
import StakedGraves from '../components/StakedGraves'
import SwiperProvider from '../../Mausoleum/context/SwiperProvider'
import CollectiblesCard from '../../Graveyard/components/Collectibles/CollectiblesCard'
import '../Profile.Styles.css'
import Avatar from '../components/Avatar'
import StakedTombs from '../components/StakedTombs'
import { BIG_ZERO } from '../../../utils/bigNumber'
import { getBalanceAmount, getFullDisplayBalance } from '../../../utils/formatBalance'
import StakedSpawningPools from '../components/StakedSpawningPools'

const Row = styled.div`
  display: flex
`

const Col = styled.div`
  flex: 1;
  padding: 10px;
`
const StyledCollectibleCard = styled(CollectiblesCard)`
  width: 20px;
  height: 20px;
`
const ProfilePage: React.FC = () => {
  const contract = useNftOwnership()
  const [updateNftUserInfo, setUpdateNftUserInfo] = useState(false)
  const [update, setUpdate] = useState(false)
  const [stakedInGraves, setStakedInGraves] = useState(BIG_ZERO)
  const [stakedInSpawningPools, setStakedInSpawningPools] = useState(BIG_ZERO)
  const zombieBalanceChecker = useZombieBalanceChecker()

  const ownedNfts = nfts().filter(nft => nft.userInfo.ownedIds.length > 0)
  const accountLength = account() ? account().length : 0
  const displayAccount = account() ? `${account().slice(0, 6)}...${account().slice(accountLength - 4, accountLength)}` : ''
  const refresh = () => {
    if (account()) {
      nftUserInfo(contract).then(() => {
        setUpdate(!update)
      })
    }
  }

  useEffect(() => {
    if (!updateNftUserInfo && account()) {
      nftUserInfo(contract).then(() => {
        setUpdate(!update)
      })
    }
    // eslint-disable-next-line
  }, [contract])

  useEffect(() => {
    if (account()) {
      zombieBalanceChecker.methods.getGraves(account()).call()
        .then(res => {
          setStakedInGraves(new BigNumber(res))
        })
    }
  }, [zombieBalanceChecker.methods])

  useEffect(() => {
    if (account()) {
      zombieBalanceChecker.methods.getSpawningPools(account()).call()
        .then(res => {
          setStakedInSpawningPools(new BigNumber(res))
        })
    }
  }, [zombieBalanceChecker.methods])

  const zombiePrice = zombiePriceUsd()
  const totalStaked = stakedInGraves.plus(stakedInSpawningPools)
  return (
    <>
      <Page>
        <Row>
          <Avatar />
          <LinkExternal href={`https://bscscan.com/address/${account()}`}>
            <Text>{displayAccount}</Text>
          </LinkExternal>
        </Row>
        <Heading color='text' size='md' className='staked-graves-header'>
          Total Zombie Staked
          <Text>
            {getFullDisplayBalance(totalStaked, 18, 4)} ZMBE
          </Text>
          <Text fontSize='12px' color='textSubtle'>{`~${
            totalStaked.isZero() ? '0.00' : getBalanceAmount(totalStaked, 18).times(zombiePrice).toFormat(2)
          } USD`}
          </Text>
        </Heading>

        <Heading color='text' size='md' className='staked-graves-header'>
          Staked Graves
        </Heading>
        <StakedGraves zombieStaked={stakedInGraves} />
        <Heading color='text' size='md' className='staked-graves-header'>
          Staked Tombs
        </Heading>
        <StakedTombs />
        <Heading color='text' size='md' className='staked-graves-header'>
          Staked Spawning Pools
        </Heading>
        <StakedSpawningPools zombieStaked={stakedInSpawningPools} />
        <Heading color='text' size='md' className='staked-graves-header'>
          Collectibles
          <Text>
            RugZombie collectibles are special ERC-721 NFTs that can be used on the RugZombie platform.
            NFTs in this user&apos;s wallet that aren&apos;t approved by RugZombie won&apos;t be shown here.
          </Text>
        </Heading>
        <SwiperProvider>
          <Row>
            <CardsLayout>
              {ownedNfts.map((nft) => {
                return (<Col>
                    <StyledCollectibleCard id={nft.id} key={nft.id} refresh={refresh} />
                  </Col>
                )
              })
              }
            </CardsLayout>
          </Row>
        </SwiperProvider>
      </Page>
    </>
  )
}

export default ProfilePage
