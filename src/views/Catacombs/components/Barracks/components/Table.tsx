import React, { useState } from 'react';
import styled from 'styled-components';
import { BaseLayout } from '@catacombs-libs/uikit';
import TableList from './TableList';
import StakePanel from './StakePanel';
import MintTimerPanel from './MintTimerPanel';
import DetailsPanel from './DetailsPanel';

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
                    ? (<div className="table-bottom">
                        <div className="w-95 mx-auto mt-3">

                            <DetailsPanel id={id} />
                        </div>
                    </div>)
                    : null}
            </div>
        </TableCards>
    );
};

export default Table;