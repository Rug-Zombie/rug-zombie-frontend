import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Text } from '@rug-zombie-libs/uikit'
import numeral from 'numeral'
import { useGetTombsTvlUsd, useGetZombiePriceUsd } from '../../../state/hooks'
import { getBalanceAmount } from '../../../utils/formatBalance'
import { drFrankensteinZombieBalance, spawningPools } from '../../../redux/get'
import { initialSpawningPoolData } from '../../../redux/fetch'

import { useMultiCall, useZombie } from '../../../hooks/useContract'
import { BIG_ZERO } from '../../../utils/bigNumber'

const StyledTotalValueLockedCard = styled(Card)`
  align-items: center;
  display: flex;
  flex: 1;
  box-shadow: rgb(204 246 108) 0px 0px 20px;
`
const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const TotalValueLockedCard: React.FC = () => {
  const multi = useMultiCall()
  const zombie = useZombie()
  const [updatePoolInfo, setUpdatePoolInfo] = useState(0)
  useEffect(() => {
    if (updatePoolInfo === 0) {
      initialSpawningPoolData(zombie, { update: updatePoolInfo, setUpdate: setUpdatePoolInfo })
    }
  }, [multi, updatePoolInfo, zombie])

  const totalSpawningPoolStaked = spawningPools().reduce((accumulator, sp) => {
    return sp.poolInfo.totalZombieStaked.plus(accumulator)
  }, BIG_ZERO)

  const zombiePrice = useGetZombiePriceUsd()
  const tombsTvl = useGetTombsTvlUsd()

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
    <div style={{ paddingTop: '15px' }}>
      <StyledTotalValueLockedCard>
        <CardBody>
          <Heading size="lg" mb="24px">
            Total Value Locked (TVL)
          </Heading>
          <>
            <Heading size="xl">{`$${numeral(tvl).format('(0.00 a)')}`}</Heading>
            <Row>
              <Text fontSize="14px">Across all Tombs and Graves</Text>
            </Row>
          </>
        </CardBody>
      </StyledTotalValueLockedCard>
    </div>
  )
}

export default TotalValueLockedCard
