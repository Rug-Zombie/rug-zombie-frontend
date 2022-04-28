import React, {useMemo} from 'react'
import styled from 'styled-components'
import {LinkExternal} from '@rug-zombie-libs/uikit'
import {WhalePool} from '../../../../../../state/types'
import {useERC721, useWhalePoolContract} from '../../../../../../hooks/useContract'
import useToast from '../../../../../../hooks/useToast'
import {getNftConfigById} from "../../../../../../state/nfts/hooks";
import {getAddress} from "../../../../../../utils/addressHelpers";
import {getBalanceNumber, getFullDisplayBalance} from "../../../../../../utils/formatBalance";
import ProgressBar from "../../../../../Graves/components/GraveTable/components/Bottom/components/ProgressBar";
import PreApprovalProgressBar
    from "../../../../../Graves/components/GraveTable/components/Bottom/components/PreApprovalProgressBar";
import TableDetails from "../../../../../Graves/components/GraveTable/components/Bottom/components/TableDetails";
import PoolDetails from "./components/PoolDetails";

const Separator = styled.div`
  height: 0px;
  border: 1px dashed #6b7682;
  margin: 25px 0 0 0;
`

const StakingContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: stretch;
  flex-wrap: wrap;
`

const Inputs = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-evenly;
  margin: 10px 0 0 0;
`

const Buttons = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-evenly;
  margin: 54px 0 0 0;
  @media (max-width: 723px) {
    margin: 10px 0 0 0;
  }
`

const InputControl = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 104px;
`

const Link = styled(LinkExternal)`
  text-align: left;
  text-decoration: underline;
  font: normal normal normal 16px/30px Poppins;
  letter-spacing: 0px;
  color: #ae32aa;
`

const StakingInput = styled.input`
  width: 150px;
  height: 60px;
  background: #0d1417 0% 0% no-repeat padding-box;
  border-radius: 10px;
  padding-left: 20px;
  border: none;
  text-align: left;
  font: normal normal normal 14px/30px Poppins;
  color: #ffffff;
  margin: 0 2px;
`

const PrimaryStakeButton = styled.button`
  height: 60px;
  width: 150px;
  background: #b8c00d 0% 0% no-repeat padding-box;
  border-radius: 10px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 2px;

  &:hover {
    cursor: pointer;
  }
`

const SecondaryStakeButton = styled.button`
  height: 60px;
  width: 150px;
  border: 2px solid #b8c00d;
  border-radius: 10px;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 2px;

  &:hover {
    cursor: pointer;
  }
`

const PrimaryStakeButtonText = styled.div`
  text-align: center;
  font: normal normal normal 16px/25px Poppins;
  color: #010202;
`

const SecondaryStakeButtonText = styled.div`
  text-align: center;
  font: normal normal normal 16px/25px Poppins;
  color: #ffffff;
`

const BalanceText = styled.button`
  font: normal normal normal 14px/21px Poppins;
  color: #6b7682;
  background: none;
  border: none;
  width: 150px;

  &:hover {
    cursor: pointer;
  }
`

const AmountText = styled.p`
  font: normal normal normal 14px/21px Poppins;
  margin: 0;
`

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const FlexRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`

interface BottomProps {
    pool: WhalePool
}

const Bottom: React.FC<BottomProps> = ({pool}) => {

    const {toastGraves} = useToast()
    const nftContract = useERC721(getAddress(getNftConfigById(pool.nftId).address))
    const whalePoolContract = useWhalePoolContract()
    const stakingSteps = useMemo(() => [], [])
    const unstakingSteps = useMemo(() => [], [])

    return (
        <>
            <Separator />
            <StakingContainer>
                <Inputs/>
            </StakingContainer>
            <Separator />
            <PoolDetails pool={pool} />
        </>
    )
}

export default Bottom
