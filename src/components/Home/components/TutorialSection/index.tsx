import React, {useState} from 'react'

import SectionContainer from '../SectionContainer'
import SectionHeader from '../SectionHeader'

import { TutorialItems, TutorialItem, TutorialItemIconPlus, TutorialItemIconMinus, TutorialItemText, TutorialSelected, TutorialUnSelected, SubTitle } from './styles'








const TutorialSection: React.FC = () => {
  const [selected1, setSelected1] = useState(null)
  const [selected2, setSelected2] = useState(null)
  const [selected3, setSelected3] = useState(null)
  const [selected4, setSelected4] = useState(null)


  return (
    <SectionContainer backgroundColor="#0d1517">
      <SectionHeader title="How does RugZombie work" />
      <TutorialItems>




        <TutorialItem>
          {selected1 === true ? (
              <TutorialSelected onClick={() => setSelected1(false)}>
                <TutorialItemIconMinus /><TutorialItemIconMinus />
                <TutorialItemText>
                  Use your ZMBE, LP tokens, and dead tokens to earn NFTs and ZMBE rewards
                  <br/>
                  <SubTitle>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad beatae distinctio doloribus est fugit ipsam libero, saepe ullam! Eos illo, rerum? Dolores error facere fuga illo magnam voluptate voluptates voluptatum!
                  </SubTitle>
                </TutorialItemText>
              </TutorialSelected>
            ):
            (<TutorialUnSelected onClick={() => setSelected1(true)}>
                <TutorialItemIconPlus />
                <TutorialItemText>
                  Use your ZMBE, LP tokens, and dead tokens to earn NFTs and ZMBE rewards
                </TutorialItemText >
              </TutorialUnSelected>
            )
          }
        </TutorialItem>



        <TutorialItem>
          {selected2 === true ? (
              <TutorialSelected onClick={() => setSelected2(false)}>
                <TutorialItemIconMinus /><TutorialItemIconMinus />
                <TutorialItemText>
                  Play and win assets in a variety of NFT powered games
                  <br/>
                  <SubTitle>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad beatae distinctio doloribus est fugit ipsam libero, saepe ullam! Eos illo, rerum? Dolores error facere fuga illo magnam voluptate voluptates voluptatum!
                  </SubTitle>
                </TutorialItemText>
              </TutorialSelected>
            ):
            (<TutorialUnSelected onClick={() => setSelected2(true)}>
                <TutorialItemIconPlus />
                <TutorialItemText>
                  Play and win assets in a variety of NFT powered games
                </TutorialItemText >
              </TutorialUnSelected>
            )
          }
        </TutorialItem>



        <TutorialItem>
          {selected3 === true ? (
              <TutorialSelected onClick={() => setSelected3(false)}>
                <TutorialItemIconMinus /><TutorialItemIconMinus />
                <TutorialItemText>
                  Earn passive income holding your NFTs
                  <br/>
                  <SubTitle>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad beatae distinctio doloribus est fugit ipsam libero, saepe ullam! Eos illo, rerum? Dolores error facere fuga illo magnam voluptate voluptates voluptatum!
                  </SubTitle>
                </TutorialItemText>
              </TutorialSelected>
            ):
            (<TutorialUnSelected onClick={() => setSelected3(true)}>
                <TutorialItemIconPlus />
                <TutorialItemText>
                  Earn passive income holding your NFTs
                </TutorialItemText >
              </TutorialUnSelected>
            )
          }
        </TutorialItem>



        <TutorialItem>
          {selected4 === true ? (
              <TutorialSelected onClick={() => setSelected4(false)}>
                <TutorialItemIconMinus /><TutorialItemIconMinus />
                <TutorialItemText>
                  Trade your NFTs on a sister project, the Oblivion Marketplace; and take advantage of low fees, ZMBE rebates
                  and special NFT Drops
                  <br/>
                  <SubTitle>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad beatae distinctio doloribus est fugit ipsam libero, saepe ullam! Eos illo, rerum? Dolores error facere fuga illo magnam voluptate voluptates voluptatum!
                  </SubTitle>
                </TutorialItemText>
              </TutorialSelected>
            ):
            (<TutorialUnSelected onClick={() => setSelected4(true)}>
                <TutorialItemIconPlus />
                <TutorialItemText>
                  Trade your NFTs on a sister project, the Oblivion Marketplace; and take advantage of low fees, ZMBE rebates
                  and special NFT Drops
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
