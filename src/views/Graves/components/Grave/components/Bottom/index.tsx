import React from 'react'
import styled from 'styled-components'
import { graveByPid } from '../../../../../../redux/get'
import ProgressBar from './components/ProgressBar'
import TableDetails from './components/TableDetails'

const Separator = styled.div`
  height: 0px;
  border: 1px dashed #6B7682;
  margin: 25px 0 0 0;
`

const StakingContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: stretch;
  flex-wrap: wrap;
`;

const Inputs = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-evenly;
  margin: 25px 0 0 0;
`;

const Buttons = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-evenly;
  margin: 25px 0 0 0;
`;

const StakingInput = styled.input`
  width: 125px;
  height: 60px;
  background: #0D1417 0% 0% no-repeat padding-box;
  border-radius: 10px;
  padding-left: 20px;
  border: none;
  text-align: left;
  font: normal normal normal 14px/30px Poppins;
  color: #FFFFFF;
  margin: 0 5px;
`;

const PrimaryStakeButton = styled.button`
  height: 60px;
  width: 125px;
  background: #B8C00D 0% 0% no-repeat padding-box;
  border-radius: 10px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  &:hover { cursor: pointer; };
`;

const SecondaryStakeButton = styled.button`
  height: 60px;
  width: 125px;
  border: 2px solid #B8C00D;
  border-radius: 10px;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  &:hover { cursor: pointer; };
`;

const PrimaryStakeButtonText = styled.text`
  text-align: center;
  font: normal normal normal 16px/25px Poppins;
  color: #010202;
`;

const SecondaryStakeButtonText = styled.text`
  text-align: center;
  font: normal normal normal 16px/25px Poppins;
  color: #FFFFFF;
`;

interface BottomProps {
  pid: number;
}

const Bottom: React.FC<BottomProps> = ({ pid }) => {
  const { name, rug, isNew, poolInfo: { allocPoint } } = graveByPid(pid)

  return <>
    <Separator />
    <StakingContainer>
      <Inputs>
        <StakingInput placeholder='Stake amount' type='number' />
        <StakingInput placeholder='Unstake amount' type='number' />
      </Inputs>
      <Buttons>
        <PrimaryStakeButton>
          <PrimaryStakeButtonText>Approve</PrimaryStakeButtonText>
        </PrimaryStakeButton>
        <SecondaryStakeButton>
          <SecondaryStakeButtonText>Unstake</SecondaryStakeButtonText>
        </SecondaryStakeButton>
      </Buttons>
    </StakingContainer>
    <ProgressBar pid={pid} />
    <Separator />
    <TableDetails pid={pid} />
  </>
}

export default Bottom
