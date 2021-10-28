/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react'
import PageHeader from 'components/PageHeader'
import { Flex, Heading, LinkExternal } from '@rug-zombie-libs/uikit'
import { getDrFrankensteinAddress, getTombOverlayAddress } from 'utils/addressHelpers'
import Page from '../../components/layout/Page'
import Table from './Table'
import '../Graves/Graves.Styles.css'
import { account, tombs } from '../../redux/get'
import { initialTombData, tomb, multicallTombOverlayData, multicallTombData } from '../../redux/fetch'
import { getId } from '../../utils'
import { multicallv2 } from '../../utils/multicall'
import tombOverlayAbi from '../../config/abi/tombOverlay.json'

const Tombs: React.FC = () => {
  const [update, setUpdate] = useState(false)
  const [updatePoolInfo, setUpdatePoolInfo] = useState(0)
  const [updateUserInfo, setUpdateUserInfo] = useState(0)
  const [updateOverlayPoolInfo, setUpdateOverlayPoolInfo] = useState(false)
  const [updateOverlayUserInfo, setUpdateOverlayUserInfo] = useState(false)
  const [bracketBStart, setBracketBStart] = useState(0)
  const [bracketCStart, setBracketCStart] = useState(0)
  const wallet = account()
  useEffect(() => {
    if(updatePoolInfo === 0 && updateUserInfo === 0) {
      initialTombData(
        { update: updatePoolInfo, setUpdate: setUpdatePoolInfo },
        { update: updateUserInfo, setUpdate: setUpdateUserInfo },
      )
    }
  }, [updatePoolInfo, updateUserInfo])

  useEffect(() => {
    multicallTombData(
      { update: updateOverlayPoolInfo, setUpdate: setUpdateOverlayPoolInfo },
      { update: updateOverlayUserInfo, setUpdate: setUpdateOverlayUserInfo },
    )
  }, [updateOverlayPoolInfo, updateOverlayUserInfo])

  useEffect(() => {
    const calls = [
      { address: getTombOverlayAddress(), name: 'bracketBStart', params: [] },
      { address: getTombOverlayAddress(), name: 'bracketCStart', params: [] },
    ]
    multicallv2(tombOverlayAbi, calls)
      .then(res => {
        setBracketBStart(res[0])
        setBracketCStart(res[1])
      })
  }, [wallet])

  const updateOverlay = () => {
    multicallTombOverlayData(
      undefined,
      undefined,
      { update: updateOverlayUserInfo, setUpdate: setUpdateOverlayUserInfo }
    )
  }

  const [isAllowance, setIsAllowance] = useState(false)
  const updateResult = (pid) => {
    tomb(
      pid,
      null,
      null,
      { update, setUpdate },
    )
  }

  const updateAllowance = (tokenContact, pid) => {
    tokenContact.methods.allowance(account(), getDrFrankensteinAddress()).call()
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
      <PageHeader background='#101820'>
        <Flex justifyContent='space-between' flexDirection={['column', null, 'row']}>
          <Flex flexDirection='column' mr={['8px', 0]}>
            <Heading as='h1' size='xxl' color='secondary' mb='24px'>
              NFTombs
            </Heading>
            <Heading size='md' color='text'>
              Stake LP tokens to earn ZMBE and NFTs
            </Heading>
            <br/>
            <LinkExternal href="https://rugzombie.medium.com/introducing-non-fungible-tombs-ce3ce445d4b">
              Learn more about our NFTombs upgrade
            </LinkExternal>
          </Flex>
        </Flex>
      </PageHeader>
      <Page>
        <div>
          {tombs().sort((a, b) => a.id - b.id).map((t) => {
            return <Table pid={getId(t.pid)} updateResult={updateResult} updateOverlay={updateOverlay} updateAllowance={updateAllowance}
                          isAllowance={isAllowance} bracketBStart={bracketBStart} bracketCStart={bracketCStart} key={t.id} />
          })}
        </div>
      </Page>
    </>
  )
}

export default Tombs
