import React, {useEffect, useState} from 'react'
import styled from "styled-components";
import {Flex, useMatchBreakpoints} from "@catacombs-libs/uikit";
import Menu from '../../../../components/Catacombs/Menu'
import Page from '../../../../components/layout/Page'
import * as get from "../../../../redux/get";
import CatacombsBackgroundDesktopSVG from "../../../../images/CatacombsMain-1920x1080px.svg";
import CatacombsBackgroundMobileSVG from "../../../../images/CatacombsMain-414x720px.svg";
import Table from "./components/Table";
import {updateRugMarketListings, addRugMarketListings} from "../../../../redux/fetch";
import TabButtons from "./components/TabButtons";
import {account, cancelRugMarketListing, markRugMarketListingSold} from "../../../../redux/get";
import {useRugMarket} from "../../../../hooks/useContract";

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
    const wallet = account();
    const {isLg, isXl} = useMatchBreakpoints()
    const isDesktop = isLg || isXl
    const [filter, setFilter] = useState(0)
    const rugMarketContract = useRugMarket();
    const visibleListings = get.rugMarketListings(filter, wallet)

    useEffect(() => {
        addListingListener()
        cancelListingListener()
        soldListingListener()
    })

    const addListingListener = () => {
        rugMarketContract.events.ListingAdded({},
            (error, event) => {
                if (event?.returnValues) {
                    addRugMarketListings(Number(event.returnValues.id))

                }
            })
    }

    const cancelListingListener = () => {
        rugMarketContract.events.ListingCancelled({},
            (error, event) => {
                if (event?.returnValues) {
                    cancelRugMarketListing(Number(event.returnValues.id))
                }
            })
    }

    const soldListingListener = () => {
        rugMarketContract.events.ListingSold({},
            (error, event) => {
                if (event?.returnValues) {
                    markRugMarketListingSold(Number(event.returnValues.id))
                }
            })
    }

    useEffect(() => {
        updateRugMarketListings();
    })

    return (
        <Menu>
            <Flex justifyContent='center'>
                <Container
                    style={{backgroundImage: `url(${isDesktop ? CatacombsBackgroundDesktopSVG : CatacombsBackgroundMobileSVG})`}}>
                    <Page style={{paddingTop: '5%'}}>
                        <TabButtons setFilter={setFilter}/>
                        <div>
                            {
                                visibleListings.map((listing) => {
                                        return <Table id={listing.id}/>
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
