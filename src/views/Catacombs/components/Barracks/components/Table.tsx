import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { BaseLayout } from '@catacombs-libs/uikit';
import TableList from './TableList';
import MintTimerPanel from './MintTimerPanel';
import DetailsPanel from './DetailsPanel';
import {useBarracksContract} from "../../../../../hooks/useContract";
import StakePanelBNB from "./StakePanelBNB";
import StakePanelTokens from "./StakePanelTokens";

const TableCards = styled(BaseLayout)`
    align-items: stretch;
    justify-content: stretch;

    & > div {
        grid-column: span 12;
        width: 100%;
    }
`

interface TableProps {
    id: number,
    updateResult: any
}

const Table: React.FC<TableProps> = ({ id, updateResult}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isbnb, setIsBNB] = useState(false);
    const barracksContract = useBarracksContract();

    useEffect(() => {
        barracksContract.methods.barrackInfo(id).call()
            .then((res) => {
                setIsBNB(res.bnb);
            })
    })

    const openInDetails = (data: boolean) => {
        setIsOpen(data);
    }

    return(
        <TableCards>
            <div className="barrack-card barrack-active-1">
                <div className="table-top">
                    <TableList id={id} openHandler={openInDetails} />
                </div>
                {isOpen
                    ? (<div className="table-bottom" style={{borderTop: '1px solid white'}}>
                        <div className="w-95 mx-auto mt-3">
                            <div className="flex-grow">
                                {
                                    isbnb ? <StakePanelBNB id={id} updateResult={updateResult} /> : <StakePanelTokens id={id} updateResult={updateResult} />
                                }
                                <MintTimerPanel id={id} updateResult={updateResult} />
                            </div>
                            <DetailsPanel id={id} />
                        </div>
                    </div>)
                    : null}
            </div>
        </TableCards>
    );
};

export default Table;