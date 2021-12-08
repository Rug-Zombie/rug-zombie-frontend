import React from 'react';
import styled from 'styled-components';
import {useModal, BaseLayout} from '@rug-zombie-libs/uikit';
import {account, barrackById} from 'redux/get';
import {getBalanceAmount} from 'utils/formatBalance';
import DecreaseStakeModalBNB from "./DecreaseStakeModalBNB";
import IncreaseStakeModalBNB from "./IncreaseStakeModalBNB";
import IncreaseStakeModalToken from "./IncreaseStakeModalToken";
import StakeModalToken from "./StakeModalTokens";
import StakeModalBNB from "./StakeModalBNB";
import DecreaseStakeModalToken from "./DecreaseStakeModalToken";

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

const StakePanel: React.FC<StakePanelProps> = ({id, updateResult}) => {
    const wallet = account();
    const barrack = barrackById(id);

    const [handleDeposit] = useModal(
        barrack.barrackInfo.bnb ? <StakeModalBNB id={id} updateResult={updateResult}/> :
            <StakeModalToken id={id} updateResult={updateResult}/>
    )

    const [handleIncreaseStake] = useModal(
        barrack.barrackInfo.bnb ? <IncreaseStakeModalBNB id={id} key={32} updateResult={updateResult}/> :
            <IncreaseStakeModalToken id={id} updateResult={updateResult}/>
    )

    const [handleDecreaseStake] = useModal(
        barrack.barrackInfo.bnb ? <DecreaseStakeModalBNB id={id} updateResult={updateResult}/> :
            <DecreaseStakeModalToken id={id} updateResult={updateResult}/>
    )

    const RenderButtons = () => {
        if (!wallet) {
            return (<span className="total-earned text-shadow">Connect Wallet</span>);
        }

        if (Number(barrack.barrackUserInfo.depositedAmount) > 0) {
            if (barrack.barrackInfo.locked) {
                return (
                    <div>
                        <DisplayFlex>
                            <button style={{marginRight: '10px'}} className="btn w-100 white-color" type="button" disabled>-</button>
                            <button className="btn w-100 white-color"  type="button" disabled>+</button>
                        </DisplayFlex>
                    </div>
                )
            }
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
        if (barrack.barrackInfo.locked)  {
            return (
                <button className="btn btn-disabled w-100" type="button" disabled>Stake {barrack.token.symbol}</button>
            )
        }
        return (<button onClick={handleDeposit} className="btn btn-disabled w-100"
                        type="button">Stake {barrack.token.symbol}</button>)
    }

    return (
        <div className="barracks-frank-card">
            <div className="small-text">
                {
                    Number(barrack.barrackUserInfo.depositedAmount) > 0 ?
                        <span className="white-color"
                              style={{fontSize: "large"}}>You Staked : {getBalanceAmount(barrack.barrackUserInfo.depositedAmount).toString()} {barrack.token.symbol}</span>
                        : <span/>
                }
            </div>
            <div className="space-center">
                {RenderButtons()}
            </div>
        </div>
    )
};

export default StakePanel;