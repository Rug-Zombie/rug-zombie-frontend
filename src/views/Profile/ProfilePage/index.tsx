import React, { useEffect } from 'react'
import { LinkExternal } from '@rug-zombie-libs/uikit'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import DefaultBannerImage from 'images/backgrounds/DefaultProfileBanner.png'
import BasicZombie from 'images/BasicZombie.gif'
import RugZombieTab from 'images/profile/RugZombieTab.png'
import OblivionTab from 'images/profile/OblivionTab.png'
import '../Profile.Styles.css'
import { useAppDispatch } from '../../../state'
import { fetchNftUserDataAsync } from '../../../state/nfts'
import { useGetNfts } from '../../../state/hooks'
import ActivityCard from './components/ActivityCard'
import StakingInfoCard from './components/StakingInfoCard'
import NftCard from '../../Graveyard/components/Nfts/components/NftCard'
import Page from '../../../components/layout/Page'

const BannerImage = styled.img`
  min-width: 317px;
  height: 300px;
  border-radius: 10px;
  padding: 10px;
`

const UserAvatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 35px;
`

const UserName = styled.p`
  height: 43px;
  text-align: center;
  font: normal normal 600 30px/42px Poppins;
  letter-spacing: 1.5px;
  color: #FFFFFF;
  opacity: 1;
`

const UserAddress = styled(LinkExternal)`
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
  justify-content: center;
  flex-wrap: wrap;
`

const SectionTitle = styled.p`
  font: normal normal normal 36px/36px Poppins;
  color: #FFFFFF;
  padding: 20px;
`

const NftsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  min-height: 480px;
`

const ProfilePage: React.FC = () => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()
  const nfts = useGetNfts().data

  const ownedNfts = nfts.filter(nft => nft.userInfo.ownedIds.length > 0)
  const accountLength = account ? account.length : 0
  const displayAccount = account ? `${account.slice(0, 6)}...${account.slice(accountLength - 4, accountLength)}` : ''

  useEffect(() => {
    dispatch(fetchNftUserDataAsync(account))
  }, [dispatch, account])


  return (
    <>
      <Page style={{minHeight: '0'}}>
        <BannerImage src={DefaultBannerImage} />
        <UserDiv>
          <UserAvatar src={BasicZombie} />
          <UserName>Basic Zombie</UserName>
          <UserAddress href={`https://bscscan.com/address/${account}`}>{displayAccount}</UserAddress>
        </UserDiv>
        <TabDiv>
          <Tab style={{ marginRight: '10px' }} src={OblivionTab} alt='Oblivion tab' />
          <Tab style={{ marginLeft: '10px' }} src={RugZombieTab} alt='RugZombie tab' />
        </TabDiv>
        <Separator />
      </Page>
      <CardDiv>
        <StakingInfoCard />
        <ActivityCard />
      </CardDiv>
      <Page style={{minHeight: '0', width: '100%'}}>
        <SectionTitle>
          Your Assets
        </SectionTitle>
      </Page>

      <NftsContainer>
          {ownedNfts.map(nft => <NftCard showOwned key={nft.id} id={nft.id} />)}
        </NftsContainer>

    </>
  )
}

export default ProfilePage
