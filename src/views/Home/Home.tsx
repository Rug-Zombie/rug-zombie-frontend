import React, { useEffect } from 'react'
import styled from 'styled-components'
import { BaseLayout, Flex } from '@rug-zombie-libs/uikit'
import Page from 'components/layout/Page'
import AnnouncementCard from 'views/Home/components/AnnouncementCard'
import ZmbeStats from 'views/Home/components/ZmbeStats'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import HomeInstabuyCard from './components/HomeInstabuyCard'
import GraveStakingCard from './components/GraveStakingCard'
import * as fetch from '../../redux/fetch'
import WhatsNewCard from './components/WhatsNewCard'
import Title from './components/Title'
import EnterGravesCard from './components/EnterGravesCard'
import VictimPoolsCard from './components/VictimPool/VictimPoolsCard'
import useEagerConnect from '../../hooks/useEagerConnect'
import NFTBanner from './components/NFTBanner'

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

interface HomeProps {
  modalObj: {modal: boolean, setModal: any};
}

const Home: React.FC<HomeProps> = ({ modalObj }) => {
  useEagerConnect()
  const { account } = useWeb3React()
  useEffect(() => {
    fetch.initialData(account)
  }, [account])

  const {ethereum} = window
  const provider = new ethers.providers.Web3Provider(ethereum)
  console.log(provider.getSigner())
  console.log("provider")

  return (
    <>
      {/* <NFTBanner/> */}
    <Title/>
    <Page>
      <div>
        <Cards>
          <GraveStakingCard />
          <AnnouncementCard modalObj={modalObj} />
          {/* <HomeInstabuyCard id={2} refresh={() => { */}
          {/*       // eslint-disable-next-line */}
          {/*       console.log('refresh') */}
          {/*     }} modalObj={modalObj} /> */}
          <VictimPoolsCard />
          <Flex flexDirection="column" >
            <EnterGravesCard/>
            <TotalValueLockedCard/>
          </Flex>
        </Cards>
        <Cards>

          <ZmbeStats />
          <WhatsNewCard/>
        </Cards>
      </div>
    </Page>
    </>
  )
}

export default Home
