/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react'
import PageHeader from 'components/PageHeader'
import { Flex, Heading, LinkExternal } from '@rug-zombie-libs/uikit'
import { useWeb3React } from '@web3-react/core'
import { getDrFrankensteinAddress } from 'utils/addressHelpers'
import Page from '../../components/layout/Page'
import Table from './components/Table'
import './Graves.Styles.css'
import { grave, initialData, initialGraveData } from '../../redux/fetch'
import { graves, zombiePriceUsd } from '../../redux/get'
import GraveTabButtons from './components/GraveTabButtons'
import { getId } from '../../utils'

let accountAddress

const filterGraves = (i) => {
  switch(i) {
    case 0: // All
      return graves()
    case 1: // Legendary
      return graves().filter(g => g.rarity === "Legendary")
    case 2: // Rare
      return graves().filter(g => g.rarity === "Rare")
    case 3: // Uncommon
      return graves().filter(g => g.rarity === "Uncommon")
    case 4: // Common
      return graves().filter(g => g.rarity === "Common")
    case 5: // NFT Only
      return graves().filter(g => g.poolInfo.allocPoint === 0)
    case 6: // Retired
      return graves().filter(g => g.isRetired)
    default:
      return graves()
  }
}

const Graves: React.FC = () => {
  const { account } = useWeb3React()
  const [isAllowance, setIsAllowance] = useState(false)
  const [updateUserInfo, setUpdateUserInfo] = useState(false)
  const [updatePoolInfo, setUpdatePoolInfo] = useState(false)
  const [filter, setFilter] = useState(0)
  const [stakedOnly, setStakedOnly] = useState(false)
  console.log('yuh')
  useEffect(() => {
    initialData(account)
    if(!updateUserInfo && !updatePoolInfo) {
      initialGraveData(
        { update: updateUserInfo, setUpdate: setUpdateUserInfo },
        { update: updatePoolInfo, setUpdate: setUpdatePoolInfo }
      )
    }
  }, [account, updatePoolInfo, updateUserInfo])

  accountAddress = account
  const [bnbInBusd,] = useState(0)

  const updateResult = (pid) => {
    grave(pid, { update: updateUserInfo, setUpdate: setUpdateUserInfo})
  }

    const updateAllowance = (tokenContact, pid) => {
      tokenContact.methods.allowance(accountAddress, getDrFrankensteinAddress()).call()
        .then(res => {
          if (parseInt(res.toString()) !== 0) {
            setIsAllowance(true)
          } else {
            setIsAllowance(false)
          }
          updateResult(pid)
        })
    }

    const postFilter = () => {
    if(filter !== 6 && filter !== 5) {
      return filterGraves(filter).filter(g => !g.isRetired && g.poolInfo.allocPoint > 0)
    } if(filter === 5) {
      return filterGraves(filter).filter(g => !g.isRetired)
    }
    return filterGraves(filter)
  }

    const visibleGraves = stakedOnly ? filterGraves(filter).filter(g => !g.userInfo.amount.isZero()) : postFilter()
  return (
    <>
      <PageHeader background='#101820'>
        <Flex justifyContent='space-between' flexDirection={['column', null, 'row']}>
          <Flex flexDirection='column' mr={['8px', 0]}>
            <Heading as='h1' size='xxl' color='secondary' mb='24px'>
              Graves
            </Heading>
            <Heading size='md' color='text'>
              Stake $ZMBE to Earn NFTs
            </Heading>
            <br/>
            <LinkExternal href="https://lootex.io/stores/rug-zombie">
              You can now buy and sell your NFTs on LootEX
            </LinkExternal>
          </Flex>
        </Flex>
      </PageHeader>
      <Page>
        <GraveTabButtons setFilter={setFilter} stakedOnly={stakedOnly} setStakedOnly={setStakedOnly} />
        <div>
          {visibleGraves.map((g) => {
            return <Table zombieUsdPrice={zombiePriceUsd()}
                          updateResult={updateResult} updateAllowance={updateAllowance} bnbInBusd={bnbInBusd}
                          isAllowance={isAllowance} pid={getId(g.pid)} key={getId(g.pid)} />
          })}
        </div>
      </Page>
    </>
  )
}

export default Graves
