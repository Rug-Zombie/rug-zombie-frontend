/* eslint-disable no-param-reassign */
import React from 'react'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import Page from '../../components/layout/Page'
import './Graves.Styles.css'
import TopMenu from '../../components/TopMenu'
import HeaderCard from './components/HeaderCard'
import Filter from './components/Filter'
import Grave from './components/Grave'
import { graves } from '../../redux/get'
import { getId } from '../../utils'
import Footer from '../../components/Footer'

const GraveFlex = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

const GravesColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%
`

let accountAddress

const Graves: React.FC = () => {
  const { account } = useWeb3React()

  const tvl = 1580000
  const graveTvl = { page: 'Graves', tvl: 768000 }
  const myHoldings = 4349

  return (
    <>
      <Page>
        <GraveFlex>
          <div style={{ paddingRight: '50px' }}>
            <HeaderCard tvl={tvl} pageTvl={graveTvl} myHoldings={myHoldings} />
          </div>
          <GravesColumn>
            <Filter />
            <div style={{ paddingTop: '40px' }} />
            {graves().map(g => {
              return <>
                <Grave pid={getId(g.pid)} key={getId(g.pid)} />
                <div style={{ paddingBottom: '20px' }} />
              </>
            })}
          </GravesColumn>
        </GraveFlex>
      </Page>
      <Footer />
    </>

  )
}

export default Graves
