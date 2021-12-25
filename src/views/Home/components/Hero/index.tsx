import React from 'react';
import { PrimaryButtonText } from 'components/Buttons';
import numeral from 'numeral'
import tokens from 'config/constants/tokens'
import { getAddress } from 'utils/addressHelpers'

import {
  HeroContainer,
  HeroContent,
  TitleTextBox,
  SubTextBox,
  TvlText,
  TvlNumber,
  ButtonsDiv,
  PrimaryLinkButton,
  StakeNowButton,
  StakeNowButtonText,
} from './styles';

interface HeroProps {
  tvl: any;
  history: any;
}

const Hero: React.FC<HeroProps> = ({ tvl, history }) => {
  return (
    <HeroContainer>
      <HeroContent>
        <TitleTextBox>
          Resurrect Your Dead Tokens
        </TitleTextBox>
        <SubTextBox>
          Turn your worthless tokens into assets. RugZombie is introducing the next generation of NFT utility, with
          GameFi, E-Commerce and metaverse features.
        </SubTextBox>
        <TvlText>
          Total value locked: 
        </TvlText>
        <TvlNumber>
          {` $ ${numeral(tvl).format('(0.00 a)')}`}
        </TvlNumber>
        <ButtonsDiv>
          <PrimaryLinkButton onClick={() => {
            window.location.href = `https://swap.rugzombie.io/swap?outputCurrency=${getAddress(tokens.zmbe.address)}`
          }}>
            <PrimaryButtonText>
              Buy $ZMBE
            </PrimaryButtonText>
          </PrimaryLinkButton>
          <PrimaryLinkButton onClick={() => {
            history.push('/graveyard')
          }}>
            <PrimaryButtonText>
              View NFTs
            </PrimaryButtonText>
          </PrimaryLinkButton>
          <StakeNowButton onClick={() => {
            history.push('/graves')
          }}>
            <StakeNowButtonText>
              Stake Now
            </StakeNowButtonText>
          </StakeNowButton>
        </ButtonsDiv>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;