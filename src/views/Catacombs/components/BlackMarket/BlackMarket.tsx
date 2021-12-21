import React, {useEffect, useState} from 'react'
import styled from "styled-components";
import {Flex, useMatchBreakpoints} from "@catacombs-libs/uikit";
import Menu from '../../../../components/Catacombs/Menu'
import Page from '../../../../components/layout/Page'
import * as get from "../../../../redux/get";
import CatacombsBackgroundDesktopSVG from "../../../../images/CatacombsMain-1920x1080px.svg";
import CatacombsBackgroundMobileSVG from "../../../../images/CatacombsMain-414x720px.svg";
import Table from "./components/Table";
import {updateRugMarketListings} from "../../../../redux/fetch";
import TabButtons from "./components/TabButtons";
import {account} from "../../../../redux/get";

const Container = styled.div`
  text-align: center;
  position: absolute;
  width: 100%;
  background-repeat: repeat-y;
  @media (max-width: 479px) {
    left: 5%;
  }
`

// const filterListings = (filter, wallet) => {
//     console.log(get.rugMarketListings(), ' =====')
//     switch (filter) {
//         case 0:
//             console.log('in case 0')
//             return get.rugMarketListings().filter(listing => listing.state === "0" && listing.owner !== wallet); // open and not owned
//             break
//         case 1:
//             // get.rugMarketListings().filter(listing => {
//             //     console.log('in case 1')
//             //     console.log(listing.owner)
//             //     console.log(wallet)
//             //     console.log(listing.owner === wallet)
//             //     return listing.owner === wallet
//             // })
//             return get.rugMarketListings().filter(listing => listing.owner === wallet); // my listings
//             break
//         case 2:
//             console.log('in case 2')
//             return get.rugMarketListings().filter(listing => listing.state === "1"); // expired/sold
//             break
//         default:
//             console.log('in default case')
//             return get.rugMarketListings().filter(listing => listing.state === "0"); // open
//     }
// }

const BlackMarket: React.FC = () => {
    const wallet = account();
    const {isLg, isXl} = useMatchBreakpoints()
    const isDesktop = isLg || isXl
    const [filter, setFilter] = useState(0)

    useEffect(() => {
        updateRugMarketListings();
    })

    const visibleListings = get.rugMarketListings(filter, wallet)

    return (
        <Menu>
            <Flex justifyContent='center'>
                <Container style={{backgroundImage: `url(${isDesktop ? CatacombsBackgroundDesktopSVG : CatacombsBackgroundMobileSVG})`}}>
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
