import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { initialSpawningPoolData, initialTombData } from 'redux/fetch'
import { bnbPriceUsd, drFrankensteinZombieBalance, spawningPools, tombs, zombiePriceUsd } from 'redux/get'
import { BIG_ZERO } from 'utils/bigNumber'
import { getBalanceAmount } from 'utils/formatBalance'
import { useMultiCall, useZombie } from 'hooks/useContract'
import Footer from 'components/Footer'
import Hero from './components/Hero'
import NftSection from './components/NftSection'
import TutorialSection from './components/TutorialSection'

const Home: React.FC = () => {
  const history = useHistory()
  const multi = useMultiCall()
  const zombie = useZombie()
  const [updatePoolInfo, setUpdatePoolInfo] = useState(0)
  useEffect(() => {
    initialTombData()
  }, [])
  useEffect(() => {
    if (updatePoolInfo === 0) {
      initialSpawningPoolData(zombie, { update: updatePoolInfo, setUpdate: setUpdatePoolInfo })
    }
  }, [multi, updatePoolInfo, zombie])

  const totalSpawningPoolStaked = spawningPools().reduce((accumulator, sp) => {
    return sp.poolInfo.totalZombieStaked.plus(accumulator)
  }, BIG_ZERO)

  const zombiePrice = zombiePriceUsd()
  let tombsTvl = BIG_ZERO
  tombs().forEach((t) => {
    const {
      poolInfo: { reserves, lpTotalSupply, totalStaked },
    } = t
    const reservesUsd = [
      getBalanceAmount(reserves[0]).times(zombiePrice),
      getBalanceAmount(reserves[1]).times(bnbPriceUsd()),
    ]
    const bnbLpTokenPrice = reservesUsd[0].plus(reservesUsd[1]).div(lpTotalSupply)
    tombsTvl = tombsTvl.plus(totalStaked.times(bnbLpTokenPrice))
  })

  const zombieBalance = getBalanceAmount(drFrankensteinZombieBalance()).times(zombiePrice)
  const spawningPoolTvl = getBalanceAmount(totalSpawningPoolStaked).times(zombiePrice)
  const [tvl, setTvl] = useState(tombsTvl.plus(zombieBalance).plus(spawningPoolTvl))
  const newTvl = tombsTvl.plus(zombieBalance).plus(spawningPoolTvl)
  useEffect(() => {
    if (!tvl.eq(newTvl) || tvl.isNaN()) {
      setTvl(newTvl)
    }
  }, [newTvl, tvl])

  return (
    <>
      <Hero tvl={tvl} history={history} />
      <NftSection history={history} />
      <TutorialSection />
      <Footer />
    </>
  )
}

export default Home
