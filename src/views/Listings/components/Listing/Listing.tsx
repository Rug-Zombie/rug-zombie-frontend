import React, {useState} from 'react'
import Page from "../../../../components/layout/Page";
import "../../MarketPlace.Styles.css"
import Image from "./components/Image";
import Details from './components/Details'
import Description from './components/Description'
import InWallet from './components/InWallet'
import PreviousListing from './components/PreviousListings'
import Offers from './components/Offers'


const Listing: React.FC = () => {
    const nftTokenNum = 5
    const [remaining, setRemaining] = useState(0)

    return (
        <>
            <Page>
                <div className="flex-container">
                    <Image/>
                    <Details/>
                    <Description/>
                    <InWallet/>
                    <PreviousListing/>
                    <Offers/>
                </div>
            </Page>
        </>
    )

}

export default Listing
