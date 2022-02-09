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
import { useGetNftById, useGetSpawningPools } from '../../state/hooks'
import { SpawningPoolFilter, spawningPoolFilters } from './filterConfig'
import { getNftConfigById } from '../../state/nfts/hooks'

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
  useEffect(() => {
    dispatch(fetchSpawningPoolsPublicDataAsync())
  }, [dispatch])

  const [spawningPoolFilter, setSpawningPoolFilter] = useState(SpawningPoolFilter.All)
  const [searchFilter, setSearchFilter] = useState('')

  let spawningPools = useGetSpawningPools().data
  spawningPools = spawningPoolFilters[spawningPoolFilter].filter(spawningPools)

  if (searchFilter) {
    spawningPools = spawningPools.filter(({ name, rewardToken: { symbol }, nftId }) => {
      const searchString = searchFilter.toLowerCase()
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return name.toLowerCase().includes(searchString) || symbol.toLowerCase().includes(searchString) || getNftConfigById(nftId).name.toLowerCase().includes(searchString)
    })
  }

  return (
    <>
      <SpawningPoolPage>
        <Row>
          <Header>
            <HeaderCard />
          </Header>
          <SpawningPoolsColumn>
            <Filter spawningPoolsList={spawningPoolFilters.map(f => f.label)}
                    spawningPoolFilter={{ value: spawningPoolFilter, set: setSpawningPoolFilter }}
                    setSearch={setSearchFilter} />
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
