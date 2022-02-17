import React, { useEffect } from 'react'
import './Landing.Styles.css'
import { useHistory } from 'react-router'
import { bnbPriceUsd, zombiePriceUsd } from '../../redux/get'
import { BIG_ZERO } from '../../utils/bigNumber'
import { getBalanceNumber } from '../../utils/formatBalance'
import Hero from './components/Hero'
import NftSection from './components/NftSection'
import TutorialSection from './components/TutorialSection'
import Footer from '../Footer'
import { useGetGraveByPid, useGetGraves, useGetSpawningPools, useGetTombs } from '../../state/hooks'
import { getId } from '../../utils'
import { useAppDispatch } from '../../state'
import { fetchTombsPublicDataAsync } from '../../state/tombs'
import { fetchSpawningPoolsPublicDataAsync } from '../../state/spawningPools'
import { fetchGravesPublicDataAsync } from '../../state/graves'

const Home: React.FC = () => {
  const history = useHistory()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchGravesPublicDataAsync())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchSpawningPoolsPublicDataAsync())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchTombsPublicDataAsync())
  }, [dispatch])

  const graveSum = useGetGraves().data.reduce((sum, { pid, poolInfo: { tokenAmount } }) => {
    return {
      totalAmount: getId(pid) === 0 ? sum.totalAmount : sum.totalAmount.plus(tokenAmount),
    }
  }, { totalAmount: BIG_ZERO })

  const legacyGraveTvl = getBalanceNumber(
    useGetGraveByPid(0).poolInfo.tokenAmount.minus(graveSum.totalAmount),
  ) * zombiePriceUsd()
  const graveTvl = getBalanceNumber(graveSum.totalAmount) * (zombiePriceUsd()) + legacyGraveTvl

  const spawningPoolSum = useGetSpawningPools().data.reduce((sum, {
    poolInfo: { totalAmount },
  }) => {
    return {
      totalAmount: sum.totalAmount.plus(totalAmount)
    }
  }, { totalAmount: BIG_ZERO })

  const spawningPoolsTvl = getBalanceNumber(spawningPoolSum.totalAmount) * zombiePriceUsd()

  const tombSum = useGetTombs().data.reduce((sum, {
    poolInfo: { tokenAmount, lpPriceBnb },
  }) => {
    const lpPrice = lpPriceBnb.times(bnbPriceUsd()).toNumber()
    return {
      tokenAmountTvl: sum.tokenAmountTvl.plus(getBalanceNumber(tokenAmount.times(lpPrice))),
    }
  }, { tokenAmountTvl: BIG_ZERO })

  const tvl = graveTvl + spawningPoolsTvl + tombSum.tokenAmountTvl.toNumber()
  return (
    <>
      <Hero tvl={tvl} history={history} />
      <NftSection history={history} />
      <TutorialSection />
      <Footer />
    </>
  )
}

export default Home;
