import React from 'react';
import tombsLogo from 'images/home/Tombs.svg';
import tombsArrow from 'images/home/TombArrow.svg';
import gravesLogo from 'images/home/Graves.svg';
import gravesArrow from 'images/home/GraveArrow.svg';
import spLogo from 'images/home/SpawningPools.svg';
import spArrow from 'images/home/SpawningPoolArrow.svg';

import {
  NftContainer,
  NftTitle,
  Hr,
  NftCards,
  NftCard,
  HalfLine,
  NftCardImg,
  NftCardContent,
  NftCardTitleText,
  NftCardSubText,
  NftCardText,
  NftCardFooter,
  NftCardFooterAction,
} from './styles';

interface NftSectionProps {
  history: any;
}

const NftSection: React.FC<NftSectionProps> = ({ history }) => {
  return (
    <NftContainer>
      <NftTitle>
        Farm NFTs in multiple ways
      </NftTitle>
      <Hr />
      <NftCards>
        <NftCard>
          <HalfLine color='#AE32AA' />
          <NftCardImg src={gravesLogo} alt='Graves Logo' />
          <NftCardContent>
            <NftCardTitleText>
              Graves
            </NftCardTitleText>
            <NftCardSubText>
              Create NFTs from the dead tokens lingering in your wallet
            </NftCardSubText>
            <NftCardText>
              Unlock graves using rugged tokens in your wallet to earn NFTs on top of regular ZMBE rewards
            </NftCardText>
          </NftCardContent>
          <NftCardFooter>
            <NftCardFooterAction onClick={() => {
              history.push('/graves')
            }}>
              <NftCardText color='#AE32AA'>enter graves </NftCardText>
              <img src={gravesArrow} alt='Grave Card Arrow' />
            </NftCardFooterAction>
          </NftCardFooter>
        </NftCard>
        <NftCard>
          <HalfLine color='#4B7BDC' />
          <NftCardImg src={tombsLogo} alt='Tombs Logo' />
          <NftCardContent>
            <NftCardTitleText>
              Tombs
            </NftCardTitleText>
            <NftCardSubText>
              Boost NFT rarity by providing liquidity
            </NftCardSubText>
            <NftCardText>
              Roll for NFTs of varying rarity while earning ZMBE by staking LP tokens. Increase your odds by
              increasing your stake in the tombs
            </NftCardText>
          </NftCardContent>
          <NftCardFooter>
            <NftCardFooterAction onClick={() => {
              history.push('/tombs')
            }}>
              <NftCardText color='#4B7BDC'>enter tombs </NftCardText>
              <img src={tombsArrow} alt='Tomb Card Arrow' />
            </NftCardFooterAction>
          </NftCardFooter>
        </NftCard>
        <NftCard>
          <HalfLine color='#30C00D' />
          <NftCardImg src={spLogo} alt='Spawning Pools Logo' />
          <NftCardContent>
            <NftCardTitleText>
              Spawning Pools
            </NftCardTitleText>
            <NftCardSubText>
              Earn NFTs and returns in partnered project tokens
            </NftCardSubText>
            <NftCardText>
              Farm NFTs by staking ZMBE, while earning rewards in tokens from RugZombie partners
            </NftCardText>
          </NftCardContent>
          <NftCardFooter>
            <NftCardFooterAction onClick={() => {
              history.push('/spawning_pools')
            }}>
              <NftCardText color='#30C00D'>enter spawning pools </NftCardText>
              <img src={spArrow} alt='Spawning Pool Card Arrow' />
            </NftCardFooterAction>
          </NftCardFooter>
        </NftCard>
      </NftCards>
    </NftContainer>
  );
};

export default NftSection;