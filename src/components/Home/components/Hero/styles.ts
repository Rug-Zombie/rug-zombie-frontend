import styled from 'styled-components'
import { PrimaryButton, SecondaryButton, SecondaryButtonText } from 'components/Buttons'
import HeroImage from 'images/backgrounds/home-section-1-background.svg'

export const HeroContainer = styled.section`
  min-height: 100vh;
  max-width: 1920px;
  background-image: url(${HeroImage});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-color: #000000;
`

export const HeroContent = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-left: 16vw;
  padding-top: 8vw;
  flex-wrap: wrap;
  max-width: 55vw;
  @media (max-width: 599px) {
    max-width: 90vw;
  }
`

export const TitleTextBox = styled.h1`
  padding: 2vh 0 1vh 0;
  text-align: left;
  font: normal normal 600 60px/72px Poppins, SemiBold;
  letter-spacing: 0px;
  color: #ffffff;
`

export const SubTextBox = styled.div`
  text-align: left;
  font: normal normal 300 20px/36px Poppins;
  letter-spacing: 0px;
  color: #6b7682;
  margin: 1vw 0 1vw 0;
`

export const TvlText = styled.p`
  text-align: left;
  font: normal normal 300 20px/36px Poppins;
  letter-spacing: 0px;
  color: #ffffff;
  margin: 1vw 0 1vw 0;
`

export const TvlNumber = styled.p`
  text-align: left;
  font: normal normal 300 36px/36px Poppins;
  letter-spacing: 0px;
  color: #30c00d;
  margin: 1vw 0 0 0;
`

export const ButtonsDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`

export const PrimaryLinkButton = styled(PrimaryButton)`
  margin: 0.5vw 0.5vw 0.5vw 0.5vw;

  &:hover {
    cursor: pointer;
  }
`

export const StakeNowButton = styled(SecondaryButton)`
  margin: 0.5vw 0.5vw 0.5vw 0.5vw;

  &:hover {
    cursor: pointer;
  }
`

export const StakeNowButtonText = styled(SecondaryButtonText)`
  &:hover {
    text-shadow: 0 0 5px white;
  }
`
