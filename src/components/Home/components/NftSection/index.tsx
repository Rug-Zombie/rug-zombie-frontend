import React from 'react'
import { Link } from 'react-router-dom'
import tombsLogo from 'images/home/Tombs.svg'
import tombsArrow from 'images/home/TombArrow.svg'
import gravesLogo from 'images/home/Graves.svg'
import gravesArrow from 'images/home/GraveArrow.svg'
import spLogo from 'images/home/SpawningPools.svg'
import spArrow from 'images/home/SpawningPoolArrow.svg'
import SectionContainer from '../SectionContainer'
import SectionHeader from '../SectionHeader'


import {
  NftCards,
  NftCard,
  HalfLine,
  NftCardImg,
  NftCardContent,
  NftCardTitleText,
  NftCardSubText,
  NftCardTextDiv,
  NftCardText,
  NftCardFooter,
  NftCardCursorHover,
  NFTCardTextRight,
} from './styles'

interface NftSectionProps {
  history: any
}

const NftSection: React.FC<NftSectionProps> = ({ history }) => {
  return (
    <SectionContainer backgroundColor="#010202">
      <SectionHeader title="Farm NFTs in multiple ways" />
      <NftCards>


        <NftCard>
          <Link to='/graves'>
            <NftCardCursorHover>
            <HalfLine color="#AE32AA" />
            <NftCardImg src={gravesLogo} alt="Graves Logo" />
            <NftCardContent>
              <NftCardTitleText>Graves</NftCardTitleText>
              <NftCardSubText>Create NFTs from the dead tokens lingering in your wallet</NftCardSubText>
              <NftCardText>
              Unlock graves using rugged tokens in your wallet to earn NFTs on top of regular ZMBE rewards
              </NftCardText>
            </NftCardContent>

            <NftCardFooter>
              <NFTCardTextRight color="#AE32AA">enter graves
              <img src={gravesArrow} alt="Grave Card Arrow" />
              </NFTCardTextRight>
            </NftCardFooter>

            </NftCardCursorHover>
          </Link>
        </NftCard>



        <NftCard>
          <Link to='/tombs'>
            <NftCardCursorHover>
            <HalfLine color="#4B7BDC" />
            <NftCardImg src={tombsLogo} alt="Tombs Logo" />
            <NftCardContent>
              <NftCardTitleText>Tombs</NftCardTitleText>
              <NftCardSubText>Boost NFT rarity by providing liquidity</NftCardSubText>
              <NftCardText>
                Roll for NFTs of varying rarity while earning ZMBE by staking LP tokens. Increase your odds by increasing
                your stake in the tombs
              </NftCardText>
            </NftCardContent>

            <NftCardFooter>
              <NFTCardTextRight color="#4B7BDC">enter tombs
                <img src={tombsArrow} alt="Tomb Card Arrow" />
              </NFTCardTextRight>
            </NftCardFooter>

            </NftCardCursorHover>
          </Link>
        </NftCard>



        <NftCard>
          <Link to='/spawning_pools'>
            <NftCardCursorHover>
              <HalfLine color="#30C00D" />
              <NftCardImg src={spLogo} alt="Spawning Pools Logo" />
              <NftCardContent>
                <NftCardTitleText>Spawning Pools</NftCardTitleText>
                <NftCardSubText>Earn NFTs and returns in partnered project tokens</NftCardSubText>
                <NftCardText>
                  Farm NFTs by staking ZMBE, while earning rewards in tokens from RugZombie partners
                </NftCardText>
              </NftCardContent>

              <NftCardFooter>
                <NFTCardTextRight color="#30C00D">enter spawning pools
                  <img src={spArrow} alt="Spawning Pool Card Arrow" />
                </NFTCardTextRight>
              </NftCardFooter>

            </NftCardCursorHover>
          </Link>
        </NftCard>


        
      </NftCards>
    </SectionContainer>
  )
}

export default NftSection
