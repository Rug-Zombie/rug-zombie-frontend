import React from 'react'
import styled from 'styled-components'
import { BigNumber } from 'bignumber.js'
import numeral from 'numeral'
import { useGetNfts, useGetUserActivities } from '../../../../state/hooks'
import { UserActivity } from '../../../../state/types'
import { UserActivityType } from '../../../../config/constants/types'
import { getBalanceNumber } from '../../../../utils/formatBalance'
import { equalAddresses, getDrFPoolName, tombPids } from '../../../../utils'
import { formatDuration, now } from '../../../../utils/timerHelpers'
import { getAddress } from '../../../../utils/addressHelpers'
import '../../Profile.Styles.css'

const Card = styled.div`
  min-width: 317px;
  max-width: 630px;
  width: 100%;
  height: 450px;
  background-color: #151e21;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 15px 25px;
  margin: 25px;
  box-shadow: 0 20px 20px -20px #000000;
`

const CardTitle = styled.p`
  text-align: left;
  font: normal normal normal 20px/36px Poppins;
  letter-spacing: 0px;
  color: #ffffff;
  padding-bottom: 35px;
`

const InnerCardDiv = styled.div`
  display: flex;
`

const ActivitiesFlex = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const ActivityDiv = styled.div`
  display: flex;
  width: 100%;
`

const DateText = styled.p`
  text-align: right;
  font: normal normal 300 14px/40px Poppins;
  letter-spacing: 0px;
  color: #6b7682;
  width: 35%;
  white-space: nowrap;
  padding-right: 25px;
`

const ActivityText = styled.p`
  text-align: left;
  font: normal normal 300 14px/40px Poppins;
  letter-spacing: 0px;
  color: #ffffff;
  flex-shrink: 2;
  width: 65%;;
`

const Loading = styled.p`
  text-align: left;
  font: normal normal 300 14px/40px Poppins;
  letter-spacing: 0px;
  color: #ffffff;
  flex-shrink: 2;
  width: 65%;;
  padding-left: 50px;
`

const ProfilePage: React.FC = () => {
  const nfts = useGetNfts().data

  const getNftByAddress = (address: string) => nfts.find((n) => equalAddresses(getAddress(n.address), address))

  const activityState = useGetUserActivities()
  const activities = activityState.data
  const loaded = activityState.userDataLoaded

  const activityText = ({ type, data }: UserActivity) => {
    const amount = new BigNumber(data.amount)
    const amountWithdrawn = new BigNumber(data.amountWithdrawn)
    const pid = new BigNumber(data.pid).toNumber()

    switch (type) {
      case UserActivityType.DrFDeposit:
        if (tombPids().includes(pid)) {
          return (
            <ActivityText>
              Staked {numeral(getBalanceNumber(amount)).format('(0.00 a)')} LP in {getDrFPoolName(pid)} tomb
            </ActivityText>
          )
        }
        return (
          <ActivityText>
            Staked {numeral(getBalanceNumber(amount)).format('(0.00 a)')} ZMBE in {getDrFPoolName(pid)} grave
          </ActivityText>
        )
      case UserActivityType.DrFHarvest:
        if (tombPids().includes(pid)) {
          return <ActivityText>Harvested {getDrFPoolName(pid)} tomb</ActivityText>
        }
        return <ActivityText>Harvested {getDrFPoolName(pid)} grave</ActivityText>
      case UserActivityType.DrFWithdraw:
        if (tombPids().includes(pid)) {
          return (
            <ActivityText>
              Unstaked {numeral(getBalanceNumber(amountWithdrawn)).format('(0.00 a)')} LP
              from {getDrFPoolName(pid)}{' '}
              tomb
            </ActivityText>
          )
        }
        return (
          <ActivityText>
            Withdrew {numeral(getBalanceNumber(amountWithdrawn)).format('(0.00 a)')} ZMBE
            from {getDrFPoolName(pid)}{' '}
            grave
          </ActivityText>
        )
      case UserActivityType.DrFWithdrawEarly:
        if (tombPids().includes(pid)) {
          return (
            <ActivityText>
              Unstaked {numeral(getBalanceNumber(amountWithdrawn)).format('(0.00 a)')} LP Early from{' '}
              {getDrFPoolName(pid)} tomb
            </ActivityText>
          )
        }
        return (
          <ActivityText>
            Unstaked {numeral(getBalanceNumber(amountWithdrawn)).format('(0.00 a)')} ZMBE Early from{' '}
            {getDrFPoolName(pid)} grave
          </ActivityText>
        )

      case UserActivityType.DrFMintNft:
        return <ActivityText>Minted {getNftByAddress(data.nft).name} NFT</ActivityText>
      default:
        return <ActivityText>Unknown Action</ActivityText>
    }
  }

  return (
    <Card>
      <CardTitle>Activity</CardTitle>
      <InnerCardDiv className='scroll'>
        <ActivitiesFlex>
          {/* eslint-disable-next-line no-nested-ternary */}
          {loaded ? activities.length > 0 ? activities.map((activity) => {
              // if (activity.type === UserActivityType.DrFHarvest) {
              //   return null
              // }
              return (
                <ActivityDiv>
                  <DateText>{formatDuration(now() - activity.timestamp, false, true)} ago</DateText>
                  <ActivityText>{activityText(activity)}</ActivityText>
                </ActivityDiv>
              )
            }) : <Loading>No recent activity...</Loading>
            : <Loading>Loading your activity...</Loading>}
        </ActivitiesFlex>
      </InnerCardDiv>
    </Card>
  )
}

export default ProfilePage
