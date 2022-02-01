/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react'
import { LinkExternal } from '@rug-zombie-libs/uikit'
import styled from 'styled-components'
import { formatDuration } from '../../utils/timerHelpers'

const SubText = styled.p`
  text-align: left;
  font: normal normal normal 14px/30px Poppins;
  letter-spacing: 0px;
  color: #30C00D;
  display: flex;
`

const Marketplace: React.FC = () => {
  const feb12th = 1644642000
  const [remaining, setRemaining] = useState(0)

    useEffect(() => {
      setInterval(() => {
        const now = Math.floor(Date.now() / 1000)
        setRemaining(feb12th - now)
      },1000)
      /* eslint-disable react-hooks/exhaustive-deps */
    }, [])
  return <div style={{
    width: '100%',
    paddingTop: '15%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'

  }}>
    <text className="total-earned text-shadow">{formatDuration(remaining, true)} #zombieon</text>
    <div style={{paddingTop: '20px'}}/>
    <SubText className='text-shadow'>
      Want to whitelist your project on our secondary market place? Let us know
      <LinkExternal external href='https://docs.google.com/forms/d/e/1FAIpQLSdkKJRBugKWdVOryendbJVfLoNX7VB8UKNjH0g6xavDafUKRA/viewform?usp=send_form' style={{paddingLeft: '10px'}}>here</LinkExternal>

    </SubText>
  </div>

}

export default Marketplace
