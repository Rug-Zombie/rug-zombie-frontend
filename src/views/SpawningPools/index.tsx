/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react'
import PageHeader from 'components/PageHeader'
import { Flex, Heading, LinkExternal } from '@rug-zombie-libs/uikit'
import { useWeb3React } from '@web3-react/core'
import { getSpawningPoolAddress } from 'utils/addressHelpers'
import Page from '../../components/layout/Page'
import Table from './components/Table'
import './SpawningPools.Styles.css'
import { initialSpawningPoolData, spawningPool } from '../../redux/fetch'
import * as get from '../../redux/get'
import { useZombie } from '../../hooks/useContract'
import { spawningPools } from '../../redux/get'

let accountAddress
const now = Math.floor(Date.now() / 1000)

const filterPools = (i) => {
  switch(i) {
    case 0: // Live
      return spawningPools()
    case 1: // Ended
      return spawningPools().filter(sp => sp.endDate < now)
    default:
      return spawningPools()
  }
}

const SpawningPools: React.FC = () => {
  const { account } = useWeb3React()
  const zombie = useZombie()
  const [isAllowance, setIsAllowance] = useState(false)
  const id = 0
  const [updatePoolInfo, setUpdatePoolInfo] = useState(0)
  const [updateUserInfo, setUpdateUserInfo] = useState(0)
  const [filter, setFilter] = useState(0)
  const [stakedOnly, setStakedOnly] = useState(false)
  useEffect(() => {
    if(account) {
      if(updateUserInfo === 0) {
        initialSpawningPoolData(zombie, undefined,{update: updateUserInfo, setUpdate: setUpdateUserInfo})
      }
    } else if(updatePoolInfo === 0) {
        initialSpawningPoolData(zombie, {update: updatePoolInfo, setUpdate: setUpdatePoolInfo})
    }

  }, [account, updatePoolInfo, updateUserInfo, zombie])

  accountAddress = account
  const [bnbInBusd, ] = useState(0)

  const updateResult = (pid) => {
    spawningPool(pid, zombie)
  }
    const updateAllowance = (tokenContact, pid) => {
      tokenContact.methods.allowance(accountAddress, getSpawningPoolAddress(id)).call()
        .then(res => {
          if (parseInt(res.toString()) !== 0) {
            setIsAllowance(true)
          } else {
            setIsAllowance(false)
          }
          updateResult(pid)
        })
    }


  return (
    <>
      <PageHeader background="#101820">
        <Flex justifyContent='space-between' flexDirection={['column', null, 'row']}>
          <Flex flexDirection='column' mr={['8px', 0]}>
            <Heading as='h1' size='xxl' color='secondary' mb='24px'>
              Spawning Pools
            </Heading>
            <Heading size='md' color='text'>
              Earn partner project tokens and NFTs by staking $ZMBE
            </Heading>
            <br/>
            <LinkExternal href="https://rugzombie.medium.com/happy-spawntemberfest-eca586d78b6b">
              Spawntemberfest release schedule
            </LinkExternal>
          </Flex>
        </Flex>
      </PageHeader>
      <Page>
      <div>
        {get.spawningPools().map((g) => {
          return <Table zombieUsdPrice={get.zombiePriceUsd()}
                        updateResult={updateResult} updateAllowance={updateAllowance} bnbInBusd={bnbInBusd}
                        isAllowance={isAllowance} key={g.id} id={g.id} account={accountAddress} />
        })}
      </div>
    </Page>
    </>
  )
}

export default SpawningPools
