import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'


const Card = styled.div`
  width: 630px;
  height: 450px;
  background-color: #151E21;
  border-radius: 10px;
  border: 2px solid #30C00D;
  opacity: 1;
  margin: 10px;
`

const ProfilePage: React.FC = () => {
  const { account } = useWeb3React()



  return (
    <Card>

    </Card>
  )
}

export default ProfilePage
