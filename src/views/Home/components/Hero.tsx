import React from 'react';
import styled from 'styled-components';
import {
  PrimaryButton,
  PrimaryButtonText,
  SecondaryButton,
  SecondaryButtonText
} from 'components/Buttons';
import numeral from 'numeral'
import tokens from 'config/constants/tokens'
import { getAddress } from 'utils/addressHelpers'
import HeroImage from 'images/backgrounds/home-section-1-background.svg'

const HeroContainer = styled.section`
  min-height: 100vh;
  max-width: 1920px;
  background-image: url(${HeroImage});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-color: #000000;
`;

const HeroContent = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-left: 10vw;
  flex-wrap: wrap;
  max-width: 55vw;
  @media (max-width: 599px) {
    max-width: 90vw
  }
`;

const TitleTextBox = styled.h1`
  padding: 2vh 0 1vh 0;
  text-align: left;
  font: normal normal 600 60px/72px Poppins, SemiBold;
  letter-spacing: 0px;
  color: #FFFFFF;
`;

const SubTextBox = styled.div`
  text-align: left;
  font: normal normal 300 20px/36px Poppins;
  letter-spacing: 0px;
  color: #6B7682;
  margin: 1vw 0 1vw 0;
`;

const TvlText = styled.p`
  text-align: left;
  font: normal normal 300 20px/36px Poppins;
  letter-spacing: 0px;
  color: #FFFFFF;
  margin: 1vw 0 1vw 0;
`;

const TvlNumber = styled.p`
  text-align: left;
  font: normal normal 300 36px/36px Poppins;
  letter-spacing: 0px;
  color: #30C00D;
  margin: 1vw 0 0 0;
`;

const ButtonsDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const PrimaryLinkButton = styled(PrimaryButton)`
  margin: .5vw .5vw .5vw .5vw;
  &:hover {
    cursor: pointer;
  }
`;

const StakeNowButton = styled(SecondaryButton)`
  margin: .5vw .5vw .5vw .5vw;
  &:hover {
    cursor: pointer;
  }
`;

const StakeNowButtonText = styled(SecondaryButtonText)`
  &:hover {
    text-shadow: 0 0 5px white;
  }
`;

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