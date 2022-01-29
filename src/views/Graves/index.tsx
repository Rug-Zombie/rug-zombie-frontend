/* eslint-disable no-param-reassign */
import React, { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import Page from '../../components/layout/Page'
import './Graves.Styles.css'
import HeaderCard from './components/HeaderCard'
import Filter from './components/Filter'
import Grave from './components/Grave'
import { graves } from '../../redux/get'
import { getId } from '../../utils'
import Footer from '../../components/Footer'
import { fetchFarmUserDataAsync, fetchGravesPublicDataAsync } from '../../state/actions'
import { useAppDispatch } from '../../state'

const GravePage = styled(Page)`
  min-width: 80vw;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
`;

const Header = styled.div`
  max-width: 15vw;
  min-width: 266px;
  margin: 0 20px 0 0;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 1279px) {
    max-width: 100vw;
    margin: 10px auto;
  }
`;

const GravesColumn = styled.div`
  max-width: 60vw;
  min-width: 50vw;
  display: flex;
  flex-direction: column;
  z-index: 1;
  @media (max-width: 1279px) {
    max-width: 100vw;
    min-width: 0;
    margin: 0 auto;
  }
`;

let accountAddress

const Graves: React.FC = () => {
  const { account } = useWeb3React()

  const tvl = 1580000
  const graveTvl = { page: 'Graves', tvl: 768000 }
  const myHoldings = 4349

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchFarmUserDataAsync(accountAddress))
  })

  return (
    <>
      <GravePage>
        <Row>
          <Header>
            <HeaderCard tvl={tvl} pageTvl={graveTvl} myHoldings={myHoldings} />
          </Header>
          <GravesColumn>
            <Filter />
            {graves().map(g => {
              return <Grave pid={getId(g.pid)} key={getId(g.pid)} />
            })}
          </GravesColumn>
        </Row>
      </GravePage>
      <Footer />
    </>
  );
}

export default Graves
