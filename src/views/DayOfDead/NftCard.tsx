import React from 'react'
import { CardBody, Heading, LinkExternal, useModal } from '@rug-zombie-libs/uikit'
import nfts from 'redux/nfts'
import { Artist } from 'redux/types'
import ConvertNftModal from './ConvertNftModal'

interface NftCardProps {
    name: string;
    rznftid: number;
    dodnftid: number;
    artist: Artist;
}

const NftCard: React.FC<NftCardProps> = ({ name, rznftid, dodnftid, artist }: NftCardProps) => {
    const rznft = nfts.find(a => a.id === rznftid);
    const dodnft = nfts.find(a => a.id === dodnftid);

    const [onConvertNftModal] = useModal(
        <ConvertNftModal
          rznftid={rznftid}
        />
    )

    return (
        <div className="test-card active-1">
                <CardBody>
                    <Heading size='lg' mb='24px'>{name} NFT Swap</Heading>
                    <div className="rug-indetails">
                        <div className="direction-column imageColumn">
                            <div className="sc-iwajpm dcRUtg">
                                {dodnft.type === 'image' 
                                ? (<img src={dodnft.path} alt="NFT" className="sc-cxNHIi bjMxQn" />) 
                                : (<video width="100%" autoPlay loop><source src={dodnft.path} type="video/mp4"/></video>)}
                            </div>
                        </div>
                        <div className="direction-column">
                            <span className="indetails-type">{dodnft.name}</span>
                            <span className="indetails-title">
                                <LinkExternal bold={false} small href={artist.twitter ? artist.twitter : artist.instagram}>
                                    View NFT Artist
                                </LinkExternal>
                            </span>
                            <br/>
                        </div>
                        <div className="direction-column">
                            <span className="indetails-type">
                                You can convert your {rznft.name} into this special edition Day of the Dead NFT!
                            </span>
                            <button onClick={onConvertNftModal} className="btn btn-disabled w-100" type="button">Convert {rznft.symbol}</button>                               
                        </div>
                    </div>
                </CardBody>                
        </div>
    )
}

export default NftCard
