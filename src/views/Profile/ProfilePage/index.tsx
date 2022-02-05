import React, { useEffect, useState } from 'react'
import { Heading, LinkExternal, Text, CardsLayout } from '@rug-zombie-libs/uikit'
import { zombiePriceUsd } from 'redux/get'
import styled from 'styled-components'
import { useZombieBalanceChecker } from 'hooks/useContract'
import { BigNumber } from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import DefaultBannerImage from 'images/backgrounds/DefaultProfileBanner.png'
import BasicZombie from 'images/BasicZombie.gif'
import RugZombieTab from 'images/profile/RugZombieTab.png'
import OblivionTab from 'images/profile/OblivionTab.png'
import Page from '../../../components/layout/Page'
import StakedGraves from '../components/StakedGraves'
import SwiperProvider from '../../Mausoleum/context/SwiperProvider'
import CollectiblesCard from '../../Graveyard/components/Collectibles/CollectiblesCard'
import '../Profile.Styles.css'
import StakedTombs from '../components/StakedTombs'
import { BIG_ZERO } from '../../../utils/bigNumber'
import { getBalanceAmount, getFullDisplayBalance } from '../../../utils/formatBalance'
import StakedSpawningPools from '../components/StakedSpawningPools'
import { useAppDispatch } from '../../../state'
import { fetchNftUserDataAsync } from '../../../state/nfts'
import { useGetNfts } from '../../../state/hooks'

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

const BannerImage = styled.img`
  width: 100%;
  height: 300px;
  border-radius: 10px;
`

const UserAvatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 35px;
`

const UserName = styled.text`
  width: 410px;
  height: 43px;
  text-align: center;
  font: normal normal 600 30px/42px Poppins;
  letter-spacing: 1.5px;
  color: #FFFFFF;
  opacity: 1;
`

const UserAddress = styled.text`
  text-align: center;
  font: normal normal 300 18px/42px Poppins;
  letter-spacing: 0px;
  color: #6B7682;
  opacity: 1;
`

const UserDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  top: -60px;
`

const TabDiv = styled.div`
  display: flex;
  justify-content: center;
`

const Tab = styled.img`
  height: 30px;
`

const Separator = styled.div`
  height: 0px;
  border: 1px solid #6B7682;
  margin: 25px 0 0 0;
`

const CardDiv = styled.div`
  display: flex;
`

const Card = styled.div`
  width: 630px;
  height: 450px;
  background-color: #151E21;
  border-radius: 10px;
  border: 2px solid #30C00D;
  opacity: 1;
  margin: 10px;
`

const ProfilePage: React.FC = () => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch();

  const [stakedInGraves, setStakedInGraves] = useState(BIG_ZERO)
  const [stakedInSpawningPools, setStakedInSpawningPools] = useState(BIG_ZERO)
  const zombieBalanceChecker = useZombieBalanceChecker()
  const nfts = useGetNfts().data

  const ownedNfts = nfts.filter(nft => nft.userInfo.ownedIds.length > 0)
  const accountLength = account ? account.length : 0
  const displayAccount = account ? `${account.slice(0, 6)}...${account.slice(accountLength - 4, accountLength)}` : ''

  const refresh = () => undefined

  useEffect(() => {
      dispatch(fetchNftUserDataAsync(account))
  }, [dispatch, account])

  useEffect(() => {
    if (account) {
      zombieBalanceChecker.methods.getGraves(account).call()
        .then(res => {
          setStakedInGraves(new BigNumber(res))
        })
    }
  }, [zombieBalanceChecker.methods, account])

  useEffect(() => {
    if (account) {
      zombieBalanceChecker.methods.getSpawningPools(account).call()
        .then(res => {
          setStakedInSpawningPools(new BigNumber(res))
        })
    }
  }, [zombieBalanceChecker.methods, account])

  const zombiePrice = zombiePriceUsd()
  const totalStaked = stakedInGraves.plus(stakedInSpawningPools)
  return (
    <>
      <Page>
        <BannerImage src={DefaultBannerImage}/>
        <UserDiv>
          <UserAvatar src={BasicZombie}/>
          <UserName>YungNams</UserName>
          <UserAddress>{displayAccount}</UserAddress>
        </UserDiv>
        <TabDiv>
          <Tab style={{marginRight: '10px'}} src={OblivionTab} alt='Oblivion tab'/>
          <Tab style={{marginLeft: '10px'}} src={RugZombieTab} alt='RugZombie tab'/>
        </TabDiv>
        <Separator/>
        <CardDiv>
          <Card/>
          <Card/>
        </CardDiv>
        <Row>
          <LinkExternal href={`https://bscscan.com/address/${account}`}>
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
                    <StyledCollectibleCard nft={nft} key={nft.id} refresh={refresh} />
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
