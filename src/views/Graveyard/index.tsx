/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import header from 'images/GraveyardHeader.jpeg'
import SectionHeader from 'views/Home/components/SectionHeader'
import Footer from 'components/Footer'
import { useNftOwnership } from 'hooks/useContract'
import { FooterImage } from 'components/Footer/styles'
import Collections from './components/Collections'

const Banner = styled.div`
  max-width: 1920px;
  min-height: 350px;
  max-height: 370px;
  background-image: url(${header});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px 0 0 0;
`;

const SubTextBox = styled.p`
  width: 45%;
  text-align: center;
  font: normal normal 300 20px/30px Poppins;
  color: #6B7682;
  margin: 25px 0;
  @media (max-width: 999px) {
    width: 70%;
  }
  @media (max-width: 499px) {
    width: 90%
  }
`;

const SectionEnd = styled(FooterImage)`
  top: -200px;
  width: 100%;
`;

const Graveyard: React.FC = () => {
  const contract = useNftOwnership()
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    nftUserInfo(contract).then(() => {
      setUpdate(prev => !prev);
    });
  }, [contract]);

  return (
    <>
      <Banner />
      <TitleSection>
        <SectionHeader 
          title="Explore the Graveyard"
        />
        <SubTextBox>
          View our NFT collection powering the RugZombie gaming ecosystem… Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
        </SubTextBox>
        <SectionEnd />
      </TitleSection>
      <Collections />
      <Footer />
    </>
  );
}

export default Graveyard
