import React from 'react';
import SectionContainer from '../SectionContainer';
import SectionHeader from '../SectionHeader';

import {
  TutorialItems,
  TutorialItem,
  TutorialItemIcon,
  TutorialItemText,
} from './styles';

const TutorialSection: React.FC = () => {
  return (
    <SectionContainer backgroundColor='#0d1517'>
      <SectionHeader
        title='How does RugZombie work'
      />
      <TutorialItems>
        <TutorialItem>
          <TutorialItemIcon />
          <TutorialItemText>
            Use your ZMBE, LP tokens and dead tokens to earn NFTs and ZMBE rewards
          </TutorialItemText>
        </TutorialItem>
        <TutorialItem>
          <TutorialItemIcon />
          <TutorialItemText>
            Play and win assets in a variety of NFT powered games
          </TutorialItemText>
        </TutorialItem>
        <TutorialItem>
          <TutorialItemIcon />
          <TutorialItemText>
            Earn passive income holding your NFTs
          </TutorialItemText>
        </TutorialItem>
        <TutorialItem>
          <TutorialItemIcon />
          <TutorialItemText>
            Trade your NFTs on a sister project, the Oblivion Marketplace and take advantage of low fees, ZMBE rebates and special NFT Drops.
          </TutorialItemText>
        </TutorialItem>
      </TutorialItems>
    </SectionContainer>
  );
};

export default TutorialSection;