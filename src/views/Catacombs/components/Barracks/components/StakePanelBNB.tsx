import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useModal, BaseLayout } from '@rug-zombie-libs/uikit';
import {account, barrackById} from 'redux/get';
import {useBarracksContract} from 'hooks/useContract';
import { getFullDisplayBalance } from 'utils/formatBalance';
import BigNumber from 'bignumber.js';
import IncreaseStakeModal from './IncreaseStakeModal';
import DecreaseStakeModal from './DecreaseStakeModal';
import DepositModalBNB from "./DepositModal";

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

const StakePanelBNB: React.FC<StakePanelProps> = ({ id, updateResult }) => {
    const [deposited, setDeposited] = useState(0);
    const wallet = account();
    // const { toastSuccess } = useToast();
    // const { t } = useTranslation();
    const barrack = barrackById(id);
    const barracksContract = useBarracksContract();

    useEffect(() => {
        if (wallet) {
            barracksContract.methods.checkDeposited(wallet).call()
                .then(res => {
                    console.log(res, ' <= has deposited');
                    setDeposited(res);
                })
        }
    })

    const [handleDeposit] = useModal(
        <DepositModalBNB id={id} updateResult={updateResult} />
    )

    const [handleIncreaseStake] = useModal(
        <IncreaseStakeModal id={id} updateResult={updateResult} />
    )

    const [handleDecreaseStake] = useModal(
        <DecreaseStakeModal id={id} updateResult={updateResult} />
    )

    const RenderButtons = () => {
        if (!wallet) {
            return (<span className="total-earned text-shadow">Connect Wallet</span>);
        }

        if (deposited > 0) {
            return (
                <div>
                    <DisplayFlex>
                        <span style={{ paddingRight: '50px' }} className="total-earned text-shadow">{getFullDisplayBalance(new BigNumber(deposited), barrack.token.decimals, 4)}</span>
                        <button onClick={handleDecreaseStake} style={{ marginRight: '10px' }} className="btn w-100" type="button">-</button>
                        <button onClick={handleIncreaseStake} className="btn w-100" type="button">+</button>
                    </DisplayFlex>
                </div>
            );
        }

        return (<button onClick={handleDeposit} className="btn btn-disabled w-100" type="button">Deposit {barrack.token.symbol}</button>)
    }

    return(
        <div className="barracks-frank-card">
            <div className="small-text">
                <span className="white-color">Deposit</span>
            </div>
            <div className="space-between">
                {RenderButtons()}
            </div>
        </div>
    )
};

export default StakePanelBNB;