/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import Page from '../../components/layout/Page'
import './SpawningPools.Styles.css'
import HeaderCard from './components/HeaderCard'
import Filter from './components/Filter'
import SpawningPoolTable from './components/SpawningPoolTable'
import Footer from '../../components/Footer'
import { useAppDispatch } from '../../state'
import { fetchSpawningPoolsPublicDataAsync, fetchSpawningPoolsUserDataAsync } from '../../state/spawningPools'
import { useGetFilteredSpawningPools } from '../../state/hooks'

const SpawningPoolPage = styled(Page)`
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

const SpawningPoolsColumn = styled.div`
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

const SpawningPools: React.FC = () => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchSpawningPoolsPublicDataAsync())
    if (account) {
      dispatch(fetchSpawningPoolsUserDataAsync(account))
    }
  }, [dispatch, account])


  const [filter, setFilter] = useState('All graves')
  const [search, setSearch] = useState('')

  const spawningPools = useGetFilteredSpawningPools([search, filter])
  const handleFilter = (condition: string) => setFilter(condition)
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)

  return (
    <>
      <SpawningPoolPage>
        <Row>
          <Header>
            <HeaderCard />
          </Header>
          <SpawningPoolsColumn>
            <Filter
              searchValue={search}
              handleFilter={handleFilter}
              handleSearch={handleSearch}
            />
            {spawningPools.map(sp => {
              return <SpawningPoolTable spawningPool={sp} key={sp.id} />
            })}
          </SpawningPoolsColumn>
        </Row>
      </SpawningPoolPage>
      <Footer />
    </>
  )
}

export default SpawningPools
