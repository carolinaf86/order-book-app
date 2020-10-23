import React from 'react';
import PropTypes from 'prop-types';
import { Column, Table } from 'react-virtualized';
import styled from 'styled-components';

const HeadersContainer = styled.div`
    width: ${({ width}) => width || '798px'};
    height: 40px;
    display: flex;
    & div:nth-child(1) {
        border-right: 1px solid ${({ theme }) => theme.colors.lightGrey};
`;

const Header = styled.div`
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
`;

const VirtualizedTable = styled(Table)`
    & .ReactVirtualized__Table__headerColumn,.ReactVirtualized__Table__rowColumn {
        border-bottom: 1px solid ${({ theme }) => theme.colors.lightGrey};
    }
`;

const TableCell = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    &.border-right {
        border-right: 1px solid ${({ theme }) => theme.colors.lightGrey};
    }
`;

const TableHeaderCell = styled(TableCell)`
    font-weight: 700;
`;

const cellRenderer = ({ cellData, columnIndex }) => (<TableCell className={columnIndex === 1 ? 'border-right' : ''}>{cellData}</TableCell>);

const headerRenderer = ({ label, className }) => (<TableHeaderCell className={className}>{label}</TableHeaderCell>);

const OrderBook = ({ rows }) => {

    return (
        <>
            <HeadersContainer>
                <Header>Buys</Header>
                <Header>Sells</Header>
            </HeadersContainer>
            <VirtualizedTable rowCount={rows.length} rowGetter={({ index }) => rows[index]} height={600} width={800} rowHeight={56}
                              headerHeight={56} rowStyle={{ display: 'flex' }}>
                <Column dataKey="buyQuantity"
                        headerRenderer={() => headerRenderer({ label: 'Quantity' })}
                        cellRenderer={cellRenderer}
                        width={200}
                />
                <Column dataKey="buyPrice"
                        headerRenderer={() => headerRenderer({ className: 'border-right', label: 'Price ($)' })}
                        cellRenderer={cellRenderer}
                        width={200}
                />
                <Column dataKey="sellQuantity"
                        headerRenderer={() => headerRenderer({ label: 'Quantity' })}
                        cellRenderer={cellRenderer}
                        width={200}
                />
                <Column dataKey="sellPrice"
                        headerRenderer={() => headerRenderer({ label: 'Price ($)' })}
                        cellRenderer={cellRenderer}
                        width={200}
                />
            </VirtualizedTable>
        </>
    );
};

OrderBook.propTypes = {
    rows: PropTypes.array
};

OrderBook.defaultProps = {
    rows: []
}

export default OrderBook;
