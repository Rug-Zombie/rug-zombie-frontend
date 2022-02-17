import React from 'react'

import './Profile.Styles.css'
import { Flex } from '@rug-zombie-libs/uikit'
import ProfilePage from './ProfilePage'
import { account } from '../../redux/get'

const Profile: React.FC = () => {
  return (
    <>
      {account() && account() !== "" ? <ProfilePage/> :  <Flex style={{ paddingTop: "10px", width: "100%", justifyContent: "center"}}>
        <div className="total-earned text-shadow">Connect Wallet to view your profile</div>
      </Flex>}

    </>
  )
}

export default Profile