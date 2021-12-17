import React, {useState} from 'react';
import styled from 'styled-components';
import { BaseLayout } from '@catacombs-libs/uikit';
import TableList from './TableList';

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
}

const Table: React.FC<TableProps> = ({ id}) => {


    return(
        <TableCards>
            <div className="barrack-card barrack-active-1">
                <div className="table-top">
                    <TableList id={id} key={id} />
                </div>
            </div>
        </TableCards>
    );
};

export default Table;