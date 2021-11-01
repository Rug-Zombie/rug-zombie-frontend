import React, { useEffect } from 'react'
import styled from 'styled-components'
import { BaseLayout } from '@rug-zombie-libs/uikit'
import Page from 'components/layout/Page'
import AnnouncementCard from 'views/Home/components/AnnouncementCard'
import ZmbeStats from 'views/Home/components/ZmbeStats'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'
import { useWeb3React } from '@web3-react/core'
import HomeInstabuyCard from './components/HomeInstabuyCard'
import GraveStakingCard from './components/GraveStakingCard'
import * as fetch from '../../redux/fetch'
import WhatsNewCard from './components/WhatsNewCard'
import Title from './components/Title'
import EnterGravesCard from './components/EnterGravesCard'
import VictimPoolsCard from './components/VictimPool/VictimPoolsCard'
import useEagerConnect from '../../hooks/useEagerConnect'

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

  return (
    <>
     {/* <NFTBanner/> */}
    <Title/>
    <Page>
      <div>
        <Cards>
          <GraveStakingCard />
          <AnnouncementCard />
          <HomeInstabuyCard id={43} refresh={() => {
                // eslint-disable-next-line
                console.log('refresh')
              }} modalObj={modalObj} />
          <VictimPoolsCard />
        </Cards>
        <Cards>
          <EnterGravesCard/>
          <TotalValueLockedCard/>
          <ZmbeStats />
          <WhatsNewCard/>
        </Cards>
      </div>
    </Page>
    </>
  )
}

export default Home
