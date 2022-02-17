import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import Page from '../../components/layout/Page'
import badge from '../../images/icons/Icon feather-award.svg'
import user from '../../images/icons/Icon feather-user-check.svg'

import { useAppDispatch } from '../../state'
import { fetchNftUserDataAsync } from '../../state/nfts'
import { useGetNftById } from '../../state/hooks'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Image = styled.img`
  max-width: 520px;
  min-width: 320px;
  width: 100%;
  max-height: 520px;
  border-radius: 10px;
`

const Title = styled.div`
  text-align: left;
  font: normal normal 600 60px Poppins;
  letter-spacing: 0;
  color: #FFFFFF;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`

const RowItem = styled.div`
  margin-right: 8px;
  white-space: nowrap;
`

const Subtle = styled.div`
  text-align: left;
  font: normal normal 300 18px/42px Poppins;
  letter-spacing: 0;
  color: #777BAB;
`

const Highlighted = styled.div`
  text-align: left;
  font: normal normal 300 18px/42px Poppins;
  letter-spacing: 0;
  color: #00B1FF;
`

const Icon = styled.img`
  width: 17px;
  height: 20px;
`

const Wrapper = styled.div`
  //overflow: visible;
  background: green;
  height: 520px;
`


const Left = styled.div`
  float:left;
  margin-right:20px;
  max-width: 520px;

  @media (max-width: 1083px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`

const Right = styled.div`
  float: right;
  margin: auto;
  @media (max-width: 1083px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`

interface ParamTypes {
  id: string
}

const Nfts: React.FC = () => {
  const { id } = useParams<ParamTypes>()
  const { account } = useWeb3React()

  const dispatch = useAppDispatch()

  useEffect(() => {
    if(account) {
      dispatch(fetchNftUserDataAsync(account))
    }
  }, [account, dispatch])

  const nft = useGetNftById(parseInt(id))

  console.log(nft.userInfo.ownedIds)

  // const { name, preview, temp: { owner } } = collection

  return (
    <>
      <Page>
          {/* <Wrapper> */}
          {/*  <Left> */}
          {/*    <Image src={preview} /> */}
          {/*  </Left> */}
          {/*  <Right> */}
          {/*    <Title>{name}</Title> */}
          {/*    <Row> */}
          {/*      <RowItem><Icon src={user} /></RowItem> */}
          {/*      <RowItem><Subtle>Collection By</Subtle></RowItem> */}
          {/*      <RowItem><Highlighted>{owner}</Highlighted></RowItem> */}
          {/*    </Row> */}
          {/*    <Row> */}
          {/*      <RowItem><Icon src={badge} /></RowItem> */}
          {/*      <RowItem><Subtle>Verified collection</Subtle></RowItem> */}
          {/*      <RowItem><Highlighted>{owner} {name}</Highlighted></RowItem> */}
          {/*    </Row> */}
          {/*    <Details collection={collection} /> */}
          {/*    <InWallet collection={collection} /> */}
          {/*  </Right> */}
          {/* </Wrapper> */}
          {/* <Left> */}
          {/*  <AdditionalDetails collection={collection} />* /}
          {/* </Left> */}
      </Page>
    </>
  )

}

export default Nfts
