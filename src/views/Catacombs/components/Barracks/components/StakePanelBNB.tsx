import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useModal, BaseLayout} from '@rug-zombie-libs/uikit';
import {account, barrackById} from 'redux/get';
import {getBalanceAmount, getFullDisplayBalance} from 'utils/formatBalance';
import IncreaseStakeModal from './IncreaseStakeModal';
import DecreaseStakeModal from './DecreaseStakeModal';
import DepositModalBNB from "./DepositModalBNB";
import web3 from "../../../../../utils/web3";

const DisplayFlex = styled(BaseLayout)`
    display: flex;
    flex-direction: row;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    grid-gap: 0px;    
`

interface StakePanelProps {
    id: number,
    updateResult: any
}

const StakePanelBNB: React.FC<StakePanelProps> = ({id, updateResult}) => {
    const wallet = account();
    const barrack = barrackById(id);
    const [increaseStake, setIncreaseStake] = useState(false);

    useEffect(() => {
        if (Number(barrack.barrackUserInfo.depositedAmount) > 0) {
            setIncreaseStake(true);
        }
    },  [barrack.barrackUserInfo.depositedAmount] )

    const [handleDeposit] = useModal(
        <DepositModalBNB id={id} increaseStake={increaseStake} updateResult={updateResult}/>
    )

    const [handleIncreaseStake] = useModal(
        <DepositModalBNB id={id} increaseStake={increaseStake} updateResult={updateResult}/>
    )

    const [handleDecreaseStake] = useModal(
        <DecreaseStakeModal id={id} updateResult={updateResult}/>
    )

    const RenderButtons = () => {
        if (!wallet) {
            return (<span className="total-earned text-shadow">Connect Wallet</span>);
        }

        if (Number(barrack.barrackUserInfo.depositedAmount) > 0) {
            return (
                <div>
                    <DisplayFlex>
                        <button onClick={handleDecreaseStake}
                                style={{marginRight: '10px', color: 'white', border: '2px solid white'}}
                                className="btn w-100" type="button">-
                        </button>
                        <button onClick={handleIncreaseStake} className="btn w-100"
                                style={{color: 'white', border: '2px solid white'}} type="button">+
                        </button>
                    </DisplayFlex>
                </div>
            );
        }

        return (<button onClick={handleDeposit} className="btn btn-disabled w-100" type="button">Stake {barrack.token.symbol}</button>)
    }

    return (
        <div className="barracks-frank-card">
            <div className="small-text">
                {
                    Number(barrack.barrackUserInfo.depositedAmount) > 0 ?
                        <span className="white-color" style={{fontSize: "large"}}>You Staked : {getBalanceAmount(barrack.barrackUserInfo.depositedAmount).toString()} {barrack.token.symbol}</span>
                    : <span/>
                }
            </div>
            <div className="space-center">
                {RenderButtons()}
            </div>
        </div>
    )
};

export default StakePanelBNB;