import React, { useState } from 'react';
import styled from 'styled-components';
import { BaseLayout } from '@rug-zombie-libs/uikit';
import { burnGraveById } from 'redux/get'
import GraveTop from '../GraveTop';
import DepositToken from '../DepositToken';
import StakePanel from '../StakePanel'
import DetailsPanel from '../DetailsPanel'
import BurnPanel from '../BurnPanel'
import DepositNftPanel from '../DepositNftPanel'

const TableCards = styled(BaseLayout)`
    align-items: stretch;
    justify-content: stretch;

    & > div {
        grid-column: span 12;
        width: 100%;
    }
`

export interface TableProps {
    id: number,
    zmbePrice: number,
    updateResult: any
}

const Table: React.FC<TableProps> = ({ id, zmbePrice, updateResult }) => {
    const [isOpen, setIsOpen] = useState(false);

    const grave = burnGraveById(id);

    const openInDetails = (data: boolean) => {
        setIsOpen(data);
    }

    const depositPanel = () => {
        switch (grave.poolInfo.depositType) {
            // case 0: return

            case 1: return (<DepositToken id={id} updateResult={updateResult} />)
            case 2: return (<DepositNftPanel id={id} updateResult={updateResult} />)
            default: return (<div/>);
        }
    }

    return (
        <TableCards>
            <div className="test-card active-1">
                <div className="table-top">
                    <GraveTop id={id} zmbePrice={zmbePrice} openHandler={openInDetails} />
                </div>
                {isOpen 
                    ? (<div className="table-bottom">
                        <div className="w-95 mx-auto mt-3">
                            <div className="flex-grow">
                                {depositPanel()}
                                <StakePanel id={id} updateResult={updateResult} />
                                <BurnPanel id={id} updateResult={updateResult} />
                            </div>
                            <DetailsPanel id={id} />
                        </div>
                      </div>) 
                    : null}
            </div>
        </TableCards>
    );
}

export default Table;