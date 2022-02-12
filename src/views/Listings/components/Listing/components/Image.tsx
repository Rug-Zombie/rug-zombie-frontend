import React from 'react'
import FallbackZombieIcon from "../../../../../images/BasicZombie.png"
import HeartIcon from "../../../../../images/icons/Icon open-heart.svg"
import "../../../MarketPlace.Styles.css"

const Image = () => {

    const srcImage = "https://ipfs.io/ipfs/QmYpCbnuBr54EpSixQn5g6XFcjuLbVRLYBeiuQSDe8qJUA"

    return (
        <>
            <div className="nft-Image">
                <img src={srcImage} alt={FallbackZombieIcon}/>
                <div className="mark-favourite">
                    <button type="button" className="favourite-heart-button">
                        <img src={HeartIcon} className="favourite-svg" alt="Favourite"/>
                    </button>
                </div>
            </div>
        </>
    )

}

export default Image
