import React from 'react'
import styled from 'styled-components'
import {useHistory} from 'react-router'
import {WhalePool} from '../../../../../../../../state/types'
import whalePoolRewardNfts from "../../../../../../../../config/constants/whalePoolRewardNfts";


const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const NftImageContainer = styled.div`
  margin: 25px 0 15px 0;
  border-radius: 10px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  
  @media only screen and (max-width: 412px) {
    flex-direction: column;
    justify-content: center;
  }
`

const NftImage = styled.img`
  min-width: 150px;
  max-width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
  
  @media only screen and (max-width: 412px) {
    max-width: 250px;
    align-self: center;
    margin-top: 10px;
  }
`

const NftVideo = styled.video`
  min-width: 150px;
  max-width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
  @media only screen and (max-width: 412px) {
    max-width: 250px;
    align-self: center;
    margin-top: 10px;
  }
`

const HeaderText = styled.div`
  margin-top: 10px;
  text-align: left;
  font: normal normal normal 16px/30px Poppins;
  color: #ffffff;
  width: 100%;
  display: flex;
  justify-content: center;
`

interface TableDetailsProps {
    nftId: number
}

const PoolDetails: React.FC<TableDetailsProps> = ({nftId}) => {

    const history = useHistory()
    const imageOnErrorHandler = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const source = event.target as HTMLImageElement
        source.onerror = null
        source.remove()
    }

    const linkToNft = () => {
        history.push(`/nfts/${nftId}`)
    }

    return (
        <Container>
            <HeaderText>Potential rewards</HeaderText>
            <NftImageContainer>
                {
                    whalePoolRewardNfts.map((nft, index) => {
                        if (nft.type === 'video') {
                            return (
                                <NftVideo key={nft.id} onClick={linkToNft} autoPlay loop muted>
                                    <source src={nft.path} type="video/webm"/>
                                </NftVideo>
                            )
                        }
                        return (<NftImage key={nft.id} onClick={linkToNft} src={nft.path} onError={imageOnErrorHandler}/>)
                    })
                }
            </NftImageContainer>
        </Container>
    )
}

export default PoolDetails
