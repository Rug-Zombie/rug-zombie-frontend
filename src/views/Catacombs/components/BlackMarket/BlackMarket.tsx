import React, {useEffect} from 'react'
import styled from "styled-components";
import {Flex, useMatchBreakpoints} from "@catacombs-libs/uikit";
import Menu from '../../../../components/Catacombs/Menu'
import Page from '../../../../components/layout/Page'
import * as get from "../../../../redux/get";
import CatacombsBackgroundDesktopSVG from "../../../../images/CatacombsMain-1920x1080px.svg";
import CatacombsBackgroundMobileSVG from "../../../../images/CatacombsMain-414x720px.svg";
import Table from "./components/Table";
import {updateRugMarketListings} from "../../../../redux/fetch";

const Container = styled.div`
  text-align: center;
  position: absolute;
  width: 100%;
  background-repeat: repeat-y;
  @media (max-width: 479px) {
    left: 5%;
  }
`

const BlackMarket: React.FC = () => {
    const {isLg, isXl} = useMatchBreakpoints()
    const isDesktop = isLg || isXl

    useEffect(() => {
        updateRugMarketListings();
    })

    return (
        <Menu>
            <Flex justifyContent='center'>
                <Container
                    style={{backgroundImage: `url(${isDesktop ? CatacombsBackgroundDesktopSVG : CatacombsBackgroundMobileSVG})`}}>
                    <Page style={{paddingTop: '5%'}}>
                        <div>
                            {
                                get.rugMarketListings().map(listing => {
                                        return <Table id={listing.id} key={listing.id}/>
                                    }
                                )
                            }
                        </div>
                    </Page>
                </Container>
            </Flex>
        </Menu>
    )
}

export default BlackMarket
