import React from 'react'
import styled from 'styled-components'
import tokens from '../../../../../../config/constants/tokens'
import GraveItem, { GraveItemType } from './components/GraveItem'
import downpointer from '../../../../../../images/FullDownPointer.png'
import { graveByPid } from '../../../../../../redux/get'
import { Token } from '../../../../../../config/constants/types'
import ProgressBar from './components/ProgressBar'
import TableDetails from './components/TableDetails'

const Separator = styled.div`
  height: 0px;
  border: 1px dashed #6B7682;
`

const StakingFlex = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
const StakingInput = styled.input`
  width: 22%;
  height: 60px;
  background: #0D1417 0% 0% no-repeat padding-box;
  border-radius: 10px;
  padding-left: 20px;
  border: none;
  text-align: left;
  font: normal normal normal 14px/30px Poppins;
  letter-spacing: 0px;
  color: #FFFFFF;
`

const PrimaryStakeButton = styled.button`
  width: 22%;
  background: #B8C00D 0% 0% no-repeat padding-box;
  border-radius: 10px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
`


const SecondaryStakeButton = styled.button`
  width: 22%;
  border: 2px solid #B8C00D;
  border-radius: 10px;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
`

const PrimaryStakeButtonText = styled.text`
  text-align: center;
  font: normal normal medium 16px/25px Poppins;
  letter-spacing: 0px;
  color: #010202;
  font-weight: bolder;
`

const SecondaryStakeButtonText = styled.text`
  text-align: center;
  font: normal normal medium 16px/25px Poppins;
  letter-spacing: 0px;
  color: #FFFFFF;
  font-weight: bold;
`

interface BottomProps {
  pid: number;
}

const Bottom: React.FC<BottomProps> = ({ pid }) => {
  const { name, rug, isNew, poolInfo: { allocPoint } } = graveByPid(pid)

  return <>
    <div style={{ paddingTop: '25px' }} />
    <Separator />
    <div style={{ paddingBottom: '30px' }} />
    <StakingFlex>
        <StakingInput placeholder='Stake amount' type='number' />
        <StakingInput placeholder='Unstake amount' type='number' />
      <PrimaryStakeButton>
        <PrimaryStakeButtonText>Approve</PrimaryStakeButtonText>
      </PrimaryStakeButton>
      <SecondaryStakeButton>
        <SecondaryStakeButtonText>Unstake</SecondaryStakeButtonText>
      </SecondaryStakeButton>
    </StakingFlex>
    <ProgressBar pid={pid} />
    <div style={{ paddingTop: '28px' }} />
    <Separator />
    <div style={{ paddingTop: '30px' }} />
    <TableDetails pid={pid} />
  </>
}

export default Bottom