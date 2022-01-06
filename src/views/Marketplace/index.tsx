/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react'
import PageHeader from 'components/PageHeader'
import { Flex, Heading } from '@rug-zombie-libs/uikit'
import header from 'images/MarketplaceHeader.jpg'
import footer from 'images/Footer.svg'
import { formatDuration } from '../../utils/timerHelpers'

const Marketplace: React.FC = () => {
  const jan30th = 1643605200
  const [remaining, setRemaining] = useState(0)

    useEffect(() => {
      setInterval(() => {
        const now = Math.floor(Date.now() / 1000)
        setRemaining(jan30th - now)
      },1000)
      /* eslint-disable react-hooks/exhaustive-deps */
    }, [])
  return <div style={{
    width: '100%',
    paddingTop: '15%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }} className="total-earned text-shadow">{formatDuration(remaining, true)} #zombieon</div>

}

export default Marketplace
