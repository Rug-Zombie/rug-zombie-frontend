import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { fetchUserActivityAsync } from '../../../../state/userActivites'
import { fetchGravesUserDataAsync } from '../../../../state/graves'
import { useAppDispatch } from '../../../../state'


const Card = styled.div`
  width: 100%;
  height: 450px;
  background-color: #151E21;
  border-radius: 10px;
  border: 2px solid #30C00D;
  opacity: 1;
  margin: 10px;
  display: flex;
  flex-direction: column;
  padding-top: 15px;
  padding-left: 25px;
`

const CardTitle = styled.text`
  text-align: left;
  font: normal normal normal 20px/36px Poppins;
  letter-spacing: 0px;
  color: #FFFFFF;
  opacity: 1;
`

const ProfilePage: React.FC = () => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if(account) {
      dispatch(fetchUserActivityAsync(account))
    }

  }, [account, dispatch])

  return (
    <Card>
      <CardTitle>
        Activity
      </CardTitle>
    </Card>
  )
}

export default ProfilePage
