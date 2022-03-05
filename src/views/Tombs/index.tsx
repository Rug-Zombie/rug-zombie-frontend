/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import Page from '../../components/layout/Page'
import './Tombs.Styles.css'
import HeaderCard from './components/HeaderCard'
import Filter from './components/Filter'
import TombTable from './components/TombTable'
import { getId } from '../../utils'
import Footer from '../../components/Footer'
import { useAppDispatch } from '../../state'
import { fetchTombsPublicDataAsync, fetchTombsUserDataAsync } from '../../state/tombs'
import { useGetTombs } from '../../state/hooks'
import { RarityFilter, rarityFilters, TombFilter, tombFilters } from './filterConfig'
import { getNftConfigById } from '../../state/nfts/hooks'

const TombPage = styled(Page)`
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

const TombsColumn = styled.div`
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

const Tombs: React.FC = () => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchTombsPublicDataAsync())
    if (account) {
      dispatch(fetchTombsUserDataAsync(account))
    }
  }, [dispatch, account])

  const [tombFilter, setTombFilter] = useState(TombFilter.All)
  const [rarityFilter, setRarityFilter] = useState(RarityFilter.All)
  const [searchFilter, setSearchFilter] = useState('')
  let tombs = useGetTombs().data
  tombs = tombFilters[tombFilter].filter(tombs)
  tombs = rarityFilters[rarityFilter].filter(tombs)

  if (searchFilter) {
    tombs = tombs.filter(({ token1, token2, overlay: { legendaryId } }) => {
      const searchString = searchFilter.toLowerCase().replace('-', '')
      return (
        token1.symbol.toLowerCase().includes(searchString) ||
        token2.symbol.toLowerCase().includes(searchString) ||
        getNftConfigById(legendaryId).name.toLowerCase().includes(searchString)
      )
    })
  }

  return (
    <>
      <TombPage>
        <Row>
          <Header>
            <HeaderCard />
          </Header>
          <TombsColumn>
            <Filter
              tombsList={tombFilters.map((f) => f.label)}
              raritiesList={rarityFilters.map((f) => f.label)}
              tombFilter={{ value: tombFilter, set: setTombFilter }}
              rarityFilter={{ value: rarityFilter, set: setRarityFilter }}
              setSearch={setSearchFilter}
            />
            {tombs.map((g) => {
              return <TombTable tomb={g} key={getId(g.pid)} />
            })}
          </TombsColumn>
        </Row>
      </TombPage>
      <Footer />
    </>
  )
}

export default Tombs
