import React from 'react'

import './Profile.Styles.css'
import { Flex } from '@rug-zombie-libs/uikit'
import { useWeb3React } from '@web3-react/core'
import ProfilePage from './ProfilePage'

const Profile: React.FC = () => {
  const { account } = useWeb3React()
  return (
    <>
      {account ? (
        <ProfilePage />
      ) : (
        <Flex style={{ paddingTop: '10px', width: '100%', justifyContent: 'center' }}>
          <div className='total-earned text-shadow'>Connect Wallet to view your profile</div>
        </Flex>
      )}
    </>
  )
}

export default Profile
