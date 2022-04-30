/* eslint-disable no-param-reassign */
import React from 'react'
import styled from 'styled-components'
import {WhalePool} from "state/types";
import {BigNumber} from "bignumber.js";
import Page from '../../components/layout/Page'
import HeaderCard from './components/HeaderCard'
import Footer from '../../components/Footer'
import WhalePoolCard from "./components/WhalePoolCard";
import {useWhalePoolContract} from "../../hooks/useContract";

const WhalePoolPage = styled(Page)`
  min-width: 80vw;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  @media (max-width: 1279px) {
    max-width: 748px;
  }
`

const Header = styled.div`
  max-width: 15vw;
  min-width: 266px;
  margin: 0 20px 0 0;
  display: flex;
  flex-direction: column;

  @media (max-width: 1279px) {
    max-width: 100vw;
    margin: 10px auto;
  }
`

const DetailsColumn = styled.div`
  max-width: 70vw;
  min-width: 50vw;
  display: flex;
  flex-direction: column;
  z-index: 1;
  @media (max-width: 1279px) {
    max-width: 100%;
    flex-grow: 1;
    margin: 0 auto;
  }
`

const WhalePools: React.FC = () => {

    return (
        <>
            <WhalePoolPage>
                <Row>
                    <Header>
                        <HeaderCard/>
                    </Header>
                    <DetailsColumn>
                        <WhalePoolCard/>
                    </DetailsColumn>
                </Row>
            </WhalePoolPage>
            <Footer/>
        </>
    )
}

export default WhalePools
