import React from 'react'
import { Flex } from '@catacombs-libs/uikit'
import styled from 'styled-components'
import { useMatchBreakpoints } from '@rug-zombie-libs/uikit' // requires a loader
import Menu from '../../../../components/Catacombs/Menu'
import CatacombsBackgroundDesktopSVG from '../../../../images/CatacombsMain-1920x1080px.svg'
import CatacombsBackgroundMobileSVG from '../../../../images/CatacombsMain-414x720px.svg'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Page from '../../../../components/layout/Page'
import InstabuyCard from './InstabuyCard'

const StyledDiv = styled.div`
  text-align: center;
  position: relative;
  color: white;
  height: 100%;
  width: 100%;
`

const Container = styled.div`
  text-align: center;
  position: absolute;
  top: 15%;
  width: 25%;
  min-width: 300px;
  height: 50%;
  @media (max-width: 479px) {
    height: 40%;
    top: 2%;
    width: 90%;
    left: 5%;
  }
`

interface DataLabProps {
  modalObj: {modal: boolean, setModal: any};
}

const DataLab: React.FC<DataLabProps>  = ({ modalObj }) => {
  const { isLg, isXl } = useMatchBreakpoints()
  const isDesktop = isLg || isXl

  return (
    <Menu>
      <StyledDiv>
        {isDesktop ? <img src={CatacombsBackgroundDesktopSVG} alt='catacombs-rug-zombie' /> :
          <img src={CatacombsBackgroundMobileSVG} alt='catacombs-rug-zombie' />
        }
        <Flex justifyContent='center'>
        <Container>
          <Page >
              <InstabuyCard id={43} refresh={() => {
                // eslint-disable-next-line
                console.log('refresh')
              }} modalObj={modalObj}/>
          </Page>
        </Container>
        </Flex>
      </StyledDiv>
    </Menu>
  )
}

export default DataLab
