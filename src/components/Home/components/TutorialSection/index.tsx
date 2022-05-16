import React, {useState} from 'react'

import SectionContainer from '../SectionContainer'
import SectionHeader from '../SectionHeader'

import { TutorialItems, TutorialItem, TutorialItemIconPlus, TutorialItemIconMinus, TutorialItemText, TutorialSelected, TutorialUnSelected, TutorialItemTextSelected, SubTitle } from './styles'








const TutorialSection: React.FC = () => {
  const [selected1, setSelected1] = useState(null)
  const [selected2, setSelected2] = useState(null)
  const [selected3, setSelected3] = useState(null)
  const [selected4, setSelected4] = useState(null)




  return (
    <SectionContainer backgroundColor="#0d1517">
      <SectionHeader title="How does RugZombie work" />
      <TutorialItems>

        <TutorialItem selected={selected1}>
          {selected1 === true ? (
              <TutorialSelected onClick={() => setSelected1(false)}>
                <TutorialItemIconMinus /><TutorialItemIconMinus />
                <TutorialItemTextSelected>
                  Use your ZMBE, LP tokens, and dead tokens to earn NFTs and ZMBE rewards
                  <br/>
                  <SubTitle>
                    Our GRAVES allow users to earn custom NFTs for their dead tokens! Never held a dead/rugged token? No problem! Stake LP tokens in our TOMBS to mint exclusive NFTs, or join our SPAWNING POOLS to receive partner tokens.
                  </SubTitle>
                </TutorialItemTextSelected>
              </TutorialSelected>
            ):
            (
              <TutorialUnSelected onClick={() => setSelected1(true)}>
                <TutorialItemIconPlus />
                <TutorialItemText>
                  Use your ZMBE, LP tokens, and dead tokens to earn NFTs and ZMBE rewards
                </TutorialItemText >
              </TutorialUnSelected>
            )
          }
        </TutorialItem>



        <TutorialItem selected={selected2}>
          {selected2 === true ? (
              <TutorialSelected onClick={() => setSelected2(false)}>
                <TutorialItemIconMinus /><TutorialItemIconMinus />
                <TutorialItemTextSelected>
                  Play and win assets in a variety of NFT powered games
                  <br/>
                  <SubTitle>
                    Through our gaming partner, Dead Games Studio, use your NFT to play and earn in our various games. Whether you venture into the catacombs, or find out more about Patient Zero, there are many ways to play using your NFTs.
                  </SubTitle>
                </TutorialItemTextSelected>
              </TutorialSelected>
            ):
            (
              <TutorialUnSelected onClick={() => setSelected2(true)}>
                <TutorialItemIconPlus />
                <TutorialItemText>
                  Play and win assets in a variety of NFT powered games
                </TutorialItemText >
              </TutorialUnSelected>
            )
          }
        </TutorialItem>
        <TutorialItem selected={selected3}>
          {selected3 === true ? (
              <TutorialSelected onClick={() => setSelected3(false)}>
                <TutorialItemIconMinus /><TutorialItemIconMinus />
                <TutorialItemTextSelected>
                  Earn passive income holding your NFTs
                  <br/>
                  <SubTitle>
                    While this feature is not implemented yet, ZMBE NFT holders will eventually benefit from passive earnings from their assets in our upcoming ecommerce partners.
                  </SubTitle>
                </TutorialItemTextSelected>
              </TutorialSelected>
            ):
            (
              <TutorialUnSelected onClick={() => setSelected3(true)}>
                <TutorialItemIconPlus />
                <TutorialItemText>
                  Earn passive income holding your NFTs
                </TutorialItemText >
              </TutorialUnSelected>
            )
          }
        </TutorialItem>



        <TutorialItem selected={selected4}>
          {selected4 === true ? (
              <TutorialSelected onClick={() => setSelected4(false)}>
                <TutorialItemIconMinus /><TutorialItemIconMinus />
                <TutorialItemTextSelected>
                  Trade on the Oblivion Marketplace
                  <br/>
                  <SubTitle>
                    Trade your NFTs on a sister project, the Oblivion Marketplace.
                    Earn passive income renting your NFTS to others, giving them others temporary ownership for use in our games.
                    Take advantage of low fees, ZMBE rebates and special NFT Drops.
                  </SubTitle>
                </TutorialItemTextSelected>
              </TutorialSelected>
            ):
            (
              <TutorialUnSelected onClick={() => setSelected4(true)}>
                <TutorialItemIconPlus />
                <TutorialItemText>
                  Trade on the Oblivion Marketplace
                </TutorialItemText >
              </TutorialUnSelected>
            )
          }
        </TutorialItem>




      </TutorialItems>
    </SectionContainer>
  )
}

export default TutorialSection
