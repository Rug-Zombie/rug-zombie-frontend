/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { useGetFilteredGraves } from 'state/hooks'
import Page from '../../components/layout/Page'
import './Graves.Styles.css'
import HeaderCard from './components/HeaderCard'
import Filter from './components/Filter'
import GraveTable from './components/GraveTable'
import { getId } from '../../utils'
import Footer from '../../components/Footer'
import { useAppDispatch } from '../../state'
import { fetchGravesPublicDataAsync, fetchGravesUserDataAsync } from '../../state/graves'
<<<<<<< HEAD

=======
>>>>>>> 5975115f1a01a6c21fc914c192f983631222bcea

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

  const [filter, setFilter] = useState('All graves')
  const [search, setSearch] = useState('')

  const graves = useGetFilteredGraves([search, filter])

<<<<<<< HEAD
  // graves = graveFilters[graveFilter].filter(graves)
  // graves = rarityFilters[rarityFilter].filter(graves)

  const featuredGraves = []
  const newGraves = []
  const remainingGraves = []
  graves.forEach(g => {
    if(g.isFeatured) {
      featuredGraves.push(g)
    } else if(g.isNew) {
      newGraves.push(g)
    } else {
      remainingGraves.push(g)
    }
  })

  const orderedGraves = featuredGraves.concat(
    newGraves,
    // eslint-disable-next-line no-nested-ternary
    remainingGraves.sort((a, b) => a.poolInfo.allocPoint.gt(b.poolInfo.allocPoint) ? -1 : a.poolInfo.allocPoint.lt(b.poolInfo.allocPoint) ? 1 : 0)
  )

=======
>>>>>>> 5975115f1a01a6c21fc914c192f983631222bcea
  const handleFilter = (condition: string) => setFilter(condition)
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)

  return (
    <>
      <GravePage>
        <Row>
          <Header>
            <HeaderCard />
          </Header>
          <GravesColumn>
            <Filter
              searchValue={search}
              handleFilter={handleFilter}
              handleSearch={handleSearch}
            />
<<<<<<< HEAD
            {orderedGraves.map(g => {
=======
            {graves.map(g => {
>>>>>>> 5975115f1a01a6c21fc914c192f983631222bcea
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
