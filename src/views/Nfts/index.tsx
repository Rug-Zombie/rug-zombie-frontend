import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { LinkExternal } from '@rug-zombie-libs/uikit'
import Page from '../../components/layout/Page'
// import badge from '../../images/icons/Icon feather-award.svg'
// import user from '../../images/icons/Icon feather-user-check.svg'
import { useAppDispatch } from '../../state'
import { fetchNftUserDataAsync } from '../../state/nfts'
import { useGetNftById } from '../../state/hooks'
import './Nfts.styles.css'
import { getAddress } from '../../utils/addressHelpers'
import { formatAddress } from '../../utils'
import { PreviewVideo, SmallPreviewVideo } from '../../components/Video/NftVideo'
import Footer from '../../components/Footer'

const Image = styled.img`
  margin-top: 20px;
  max-width: 520px;
  min-width: 320px;
  width: 100%;
  border-radius: 20px;
  box-shadow: 5px 15px 20px 0px #000000;
`

const Small = styled.img`
  position: relative;
  max-width: 100px;
  min-width: 70px;
  width: 100%;
  border-radius: 15px;
  padding: 8px;
`

const Title = styled.div`
  max-width: 350px;
  text-align: left;
  font: normal normal 600 60px Poppins;
  letter-spacing: 0;
  color: #ffffff;
  @media (max-width: 1083px) {
    max-width: 100%;
    text-align: center;
  }
`
const Regular = styled.div`
  padding-left: 10px;
  font: normal normal 300 18px/42px Poppins;
  letter-spacing: 0;
  color: white;
`
const Normal = styled.div`
  padding-left: 10px;
  font: normal normal 300 16px/32px Poppins;
  letter-spacing: 0;
  color: white;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`

const RowItem = styled.div`
  margin-right: 5px;
  white-space: nowrap;
`

const Subtle = styled.p`
  max-width: 350px;
  text-align: left;
  font: normal normal 300 18px/42px Poppins;
  letter-spacing: 0;
  color: #777bab;
`

const Highlighted = styled.text`
  text-align: left;
  font: normal normal 300 18px/42px Poppins;
  letter-spacing: 0;
  color: #00b1ff;
`
const HighlightSmall = styled.div`
  text-align: left;
  font: normal normal 300 14px/36px Poppins;
  letter-spacing: 0;
  color: #00b1ff;
`

// const Icon = styled.img`
//  width: 17px;
//  height: 20px;
// `

const Left = styled.div`
  float: left;
  padding-right: 20px;
  padding-left: 20px;
  max-width: 520px;
  min-width: 380px;
  @media (max-width: 1083px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 100%;
  }
`

const Right = styled.div`
  float: right;
  padding-right: 20px;
  padding-left: 20px;
  max-width: 690px;
  min-width: 400px;
  @media (max-width: 1083px) {
    display: flex;
    float: none;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 100%;
  }
`

const TabRight = styled.div`
  position: relative;
  top: 50px;
  background: #151e21;
  max-width: 690px;
  padding: 15px 25px;
  box-shadow: 0 20px 20px -20px #000000;
  border-radius: 10px;
  @media (max-width: 1083px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`

const Variant = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Variants = styled.div`
  display: flex;
  align-items: center;
  max-width: 350px;
  overflow-x: scroll;
`

const DetailName = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  line-height: initial;
  text-align: left;
  font: normal normal 300 16px/30px Poppins;
  letter-spacing: 0;
  color: #777bab;
`

const DetailValue = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  line-height: initial;
  text-align: left;
  font: normal normal 300 16px/30px Poppins;
  letter-spacing: 0;
  color: #00b1ff;
`

const DetailFlex = styled.div`
  display: flex;
  line-height: initial;
`

const DetailsContainer = styled.div`
  padding: 5% 0%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Link = styled(LinkExternal)`
  font: normal normal 300 16px/30px Poppins;
  color: #00b1ff;
`

const PreviewVid = styled(PreviewVideo)`
  max-width: 520px;
  min-width: 300px;
  width: 100%;
  object-fit: cover;
`
const SmallVid = styled(SmallPreviewVideo)`
  position: relative;
  max-width: 100px;
  min-width: 70px;
  width: 100%;
  border-radius: 6px;
  padding: 8px;
`

const VidDiv = styled.div`
  margin-top: 20px;
  border-radius: 20px;
`

const NftPage = styled(Page)`
  margin-bottom: 200px;
`

interface ParamTypes {
  id: string
}

const Nfts: React.FC = () => {
  const { id } = useParams<ParamTypes>()
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (account) {
      dispatch(fetchNftUserDataAsync(account))
    }
  }, [account, dispatch])

  const nft = useGetNftById(parseInt(id))

  return (
    <>
      <NftPage>
        <Left>
          {nft.type === 'image' ? (
            <Image src={nft.path} />
          ) : (
            <VidDiv>
              <PreviewVid path={nft.path} />
            </VidDiv>
          )}
        </Left>
        <Right>
          <Title>{nft.name}</Title>
          <Subtle>{nft.description}</Subtle>
          <Subtle>
            Rarity: <Highlighted>{nft.rarity}</Highlighted>
          </Subtle>
          <Row>
            <RowItem>
              <Subtle>Collection By</Subtle>
            </RowItem>
            <RowItem>
              <Highlighted>RugZombie</Highlighted>
            </RowItem>
          </Row>
          {nft.artist ? (
            <Row>
              <RowItem>
                <Subtle>Artist</Subtle>
              </RowItem>
              <RowItem>
                <Link href={nft.artist.twitter ? nft.artist.twitter : nft.artist.instagram}>{nft.artist.name}</Link>
              </RowItem>
            </Row>
          ) : null}
          <TabRight>
            <Row>
              <RowItem>
                <Regular>Owned Variants</Regular>
              </RowItem>
            </Row>
            <Row>
              <RowItem>
                <Normal>You own {nft.userInfo.ownedIds.length} variants of this nft</Normal>
              </RowItem>
            </Row>
            <Row>
              <Variants>
                {nft.userInfo.ownedIds.map((value) => (
                  <Variant>
                    {nft.type === 'image' ? (
                      <Small src={nft.path} />
                    ) : (
                      <VidDiv>
                        <SmallVid path={nft.path} />
                      </VidDiv>
                    )}
                    <HighlightSmall>{value}</HighlightSmall>
                  </Variant>
                ))}
              </Variants>
            </Row>
          </TabRight>
          <br />
          <TabRight>
            <DetailsContainer>
              <DetailFlex>
                <DetailName>Total Supply</DetailName>
                <DetailValue>{nft.totalSupply.toString()}</DetailValue>
              </DetailFlex>
              <DetailFlex>
                <DetailName>Contract Address</DetailName>
                <DetailValue>{formatAddress(getAddress(nft.address))}</DetailValue>
              </DetailFlex>
              <DetailFlex>
                <DetailName>Token Standard</DetailName>
                <DetailValue>ERC-721</DetailValue>
              </DetailFlex>
            </DetailsContainer>
          </TabRight>
        </Right>
      </NftPage>
      <Footer />
    </>
  )
}

export default Nfts
