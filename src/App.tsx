import React, { useEffect, lazy, useState } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { ResetCSS } from '@rug-zombie-libs/uikit'
import BigNumber from 'bignumber.js'
import useEagerConnect from 'hooks/useEagerConnect'
import ToastListener from 'components/ToastListener'
import { routes } from 'routes'
import TopMenu from 'components/TopMenu'
import AppContainer from 'components/AppContainer'
import Menu from 'components/Menu'
import Loader from 'components/Loader'
import Home from 'views/Home/Home'
import Tombs from 'views/Tombs'
import Gravedigger from 'views/Gravedigger/'
import { useWeb3React } from '@web3-react/core'
import SpawnWithUs from 'views/SpawnWithUs'
import Catacombs from 'views/Catacombs'
import BurnGraves from 'views/BurnGraves'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import history from './routerHistory'
import GlobalStyle from './style/Global'
import Graves from './views/Graves'
import * as fetch from './redux/fetch'
import Mausoleum from './views/Mausoleum'
import PredictionsHome from './views/PredictionsHome'
import SpawningPools from './views/SpawningPools'
import Graveyard from './views/Graveyard'

import Profile from './views/Profile'
import DataLab from './views/Catacombs/components/DataLab'
import BlackMarket from './views/Catacombs/components/BlackMarket'
import Barracks from './views/Catacombs/components/Barracks'
import RugRoll from './views/Catacombs/components/RugRoll'
import SwiperProvider from './views/Mausoleum/context/SwiperProvider'

import SharkPools from './views/SharkPools'
import { useAppDispatch } from './state'
import { fetchNftPublicDataAsync } from './state/nfts'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page
const Landing = lazy(() => import('./components/Landing'))

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  const dispatch = useAppDispatch()

  // Monkey patch warn() because of web3 flood
  // To be removed when web3 1.3.5 is released
  useEffect(() => {
    console.warn = () => null
  }, [])

  const [isAuthenticated, setAuthenticated] = useState(false)
  const [, setZombiePrice] = useState(0)
  const [modal, setModal] = useState(null)


  useEffect(() => {
    document.title = 'RugZombie'
  })
  useEagerConnect()
  const { account } = useWeb3React()
  useEffect(() => {
    fetch.initialData(account, setZombiePrice)
  }, [account])

  // initialise nft state
  useEffect(() => {
    dispatch(fetchNftPublicDataAsync())
  }, [dispatch])

  const handleAuthentication = () => {
    setAuthenticated(!isAuthenticated)
    history.push(routes.HOME)
  }

  const LandingProps = {
    'handleAuthentication': handleAuthentication,
  }
  return (
    <Router history={history}>
      <ResetCSS />
      <GlobalStyle />
      <SuspenseWithChunkError fallback={<Loader />}>
        <Switch>
          <Route exact path={routes.LANDING}><Landing {...LandingProps} /></Route>
          <Route exact path={routes.GRAVEDIGGER}><Gravedigger /></Route>
          <Route exact path={routes.SPAWNWITHUS}><SpawnWithUs /></Route>
          <Route exact path={routes.CATACOMBS}><Catacombs /></Route>
          <Route exact path={routes.RUGROLL}><RugRoll /></Route>
          <Route exact path={routes.DATALAB}>
            <SwiperProvider>
              <DataLab modalObj={{ modal, setModal }} />
            </SwiperProvider>
          </Route>
          <Route exact path={routes.BLACKMARKET}><BlackMarket /></Route>
          <Route exact path={routes.BARRACKS}><Barracks /></Route>
          <Route exact path={routes.HOME}>
            <>
              <TopMenu />
              <AppContainer>
                <Home />
              </AppContainer>
            </>
          </Route>
          <Route exact path={routes.GRAVES}>
            <>
              <TopMenu />
              <AppContainer>
                <Graves />
              </AppContainer>
            </>
          </Route>
          <Route exact path={routes.TOMBS}>
            <>
              <TopMenu />
              <AppContainer>
                <Tombs />
              </AppContainer>
            </>
          </Route>
          <Route exact path={routes.SPAWNING_POOLS}>
            <>
              <TopMenu />
              <AppContainer>
                <SpawningPools />
              </AppContainer>
            </>
          </Route>
          <Route exact path={routes.PROFILE}>
            <>
              <TopMenu />
              <AppContainer>
                <Profile />
              </AppContainer>
            </>
          </Route>
          <Menu>
            <Route exact path={routes.MAUSOLEUM}><PredictionsHome /></Route>
            <Route exact path={routes.AUCTION}><Mausoleum /></Route>
            <Route exact path={routes.GRAVEYARD}><Graveyard /></Route>
            <Route exact path={routes.SHARKTANK}><SharkPools /></Route>
            <Route exact path={routes.BURNGRAVES}><BurnGraves /></Route>
          </Menu>
        </Switch>
      </SuspenseWithChunkError>
      <ToastListener />
      {modal}
    </Router>
  )
}

export default React.memo(App)
