/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import Page from '../../components/layout/Page'
import './Graves.Styles.css'
import HeaderCard from './components/HeaderCard'
import Filter from './components/Filter'
import GraveTable from './components/GraveTable'
import { getId } from '../../utils'
import Footer from '../../components/Footer'
import { useAppDispatch } from '../../state'
import { fetchGravesPublicDataAsync, fetchGravesUserDataAsync } from '../../state/graves'
import { useGetGraves, useGetNftById } from '../../state/hooks'
import { GraveFilter, graveFilters, RarityFilter, rarityFilters } from './filterConfig'
import { getNftConfigById } from '../../state/nfts/hooks'

const GravePage = styled(Page)`
  min-width: 80vw;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  @media (max-width: 1279px) {
    max-width: 748px;
  }
`

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
`

const GravesColumn = styled.div`
  max-width: 70vw;
  min-width: 50vw;
  display: flex;
  flex-direction: column;
  z-index: 1;
  @media (max-width: 1279px) {
    max-width: 100%;
    flex-grow: 1;
    margin: 0 auto;
  }
`

const Graves: React.FC = () => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchGravesPublicDataAsync())
    if (account) {
      dispatch(fetchGravesUserDataAsync(account))
    }
  }, [dispatch, account])

  const [graveFilter, setGraveFilter] = useState(GraveFilter.All)
  const [rarityFilter, setRarityFilter] = useState(RarityFilter.All)
  const [searchFilter, setSearchFilter] = useState('')

  let graves = useGetGraves().data

  graves = graveFilters[graveFilter].filter(graves)
  graves = rarityFilters[rarityFilter].filter(graves)

  if (searchFilter) {
    graves = graves.filter(({name, rug: {symbol}, nftId}) => {
      const searchString = searchFilter.toLowerCase()
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return name.toLowerCase().includes(searchString) || symbol.toLowerCase().includes(searchString) || getNftConfigById(nftId).name.toLowerCase().includes(searchString)
    })
  }

  return (
    <>
      <GravePage>
        <Row>
          <Header>
            <HeaderCard />
          </Header>
          <GravesColumn>
            <Filter gravesList={graveFilters.map(f => f.label)} raritiesList={rarityFilters.map(f => f.label)}
                    graveFilter={{ value: graveFilter, set: setGraveFilter }}
                    rarityFilter={{ value: rarityFilter, set: setRarityFilter }} setSearch={setSearchFilter} />
            {graves.map(g => {
              return <GraveTable grave={g} key={getId(g.pid)} />
            })}
          </GravesColumn>
        </Row>
      </GravePage>
      <Footer />
    </>
  )
}

export default Graves
