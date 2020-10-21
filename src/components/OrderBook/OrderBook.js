import React from 'react';
import PropTypes from 'prop-types';
import { Column, Table } from 'react-virtualized';
import styled from 'styled-components';

const TableCell = styled.div`
    display: flex;
    justify-content: center;
`;

const cellRenderer = ({ cellData }) => (<TableCell>{cellData}</TableCell>);

const headerRenderer = ({ label }) => (<TableCell><span>{label}</span></TableCell>);

const rowStyle = {
    display: 'flex',
    padding: 0
}

const OrderBook = ({ rows }) => {

    return (
        <Table rowCount={rows.length} rowGetter={({ index }) => rows[index]} height={600} width={800} rowHeight={56} headerHeight={56} rowStyle={rowStyle}>
            <Column dataKey="buyQuantity" headerRenderer={() => headerRenderer({ label: 'Quantity' })} cellRenderer={cellRenderer}
                    width={200}/>
            <Column dataKey="buyPrice" headerRenderer={() => headerRenderer({ label: 'Price ($)' })} cellRenderer={cellRenderer}
                    width={200}/>
            <Column dataKey="sellQuantity" headerRenderer={() => headerRenderer({ label: 'Quantity' })} cellRenderer={cellRenderer}
                    width={200}/>
            <Column dataKey="sellPrice" headerRenderer={() => headerRenderer({ label: 'Price ($)' })} cellRenderer={cellRenderer}
                    width={200}/>
        </Table>
    );
};

OrderBook.propTypes = {
    rows: PropTypes.array
};

OrderBook.defaultProps = {
    rows: []
}

export default OrderBook;
