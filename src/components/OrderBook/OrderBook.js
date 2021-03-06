import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { processOrders } from '../../helpers/process-orders';
import { FixedSizeGrid as Grid } from 'react-window';
import LoadingDots from '../LoadingDots/LoadingDots';

const Container = styled.div`
    & .grid-container {
        border: 1px solid ${({ theme }) => theme.colors.lightGrey};
    }
`;

const HeadersContainer = styled.div`
    width: ${({ width }) => width || '800px'};
    height: 80px;
    display: flex;
    border-top: 1px solid ${({ theme }) => theme.colors.lightGrey};
    border-left: 1px solid ${({ theme }) => theme.colors.lightGrey};
    border-right: 1px solid ${({ theme }) => theme.colors.lightGrey};
`;

const Header = styled.div`
    display: flex;
    flex-wrap: wrap;
    font-weight: 700;
    &.left-header {
        width: ${({ width }) => width};
        border-right: 1px solid ${({ theme }) => theme.colors.lightGrey};
    }
    &.right-header {
        flex-grow: 1;
    }
`;

const HeaderTitle = styled.div`
    height: 40px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const HeaderSubtitle = styled(HeaderTitle)`
    width: 50%;
`;

const TableCell = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.colors.lightGrey};
    &.border-right {
        border-right: 1px solid ${({ theme }) => theme.colors.lightGrey};
    }
    &.buy {
        color: ${({ theme }) => theme.colors.darkGreen};
    }
    &.sell {
        color: ${({ theme }) => theme.colors.darkRed};
    }
`;

const Cell = ({ columnIndex, rowIndex, style, data }) => {
    let className;
    switch (columnIndex) {
        case 1:
            className = 'border-right buy';
            break;
        case 2:
            className = 'sell';
            break;
        default:
            className = '';
    }
    return (
        <TableCell className={className} style={style}>
            {data[rowIndex]?.[columnIndex]}
        </TableCell>
    );
}

const CellPlaceholder = ({ columnIndex, style }) => (
    <TableCell className={columnIndex === 1 ? 'border-right' : ''} style={style}>
        <LoadingDots />
    </TableCell>
);

const OrderBook = ({ orders, loading }) => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        setRows(processOrders(orders));
    }, [orders]);

    const gridHeight = 600;
    const gridWidth = 800;
    const rowHeight = 50;
    const numRows = Math.max(rows?.length || 0, Math.round(gridHeight / rowHeight));
    const columnWidth = (gridWidth) / 4 - 4.5;

    return (
        <Container data-testid="order-book-container">
            <HeadersContainer width={`${gridWidth}px`}>
                <Header className="left-header" width={`${columnWidth * 2}px`}>
                    <HeaderTitle>Buys</HeaderTitle>
                    <HeaderSubtitle>Quantity</HeaderSubtitle>
                    <HeaderSubtitle>Price ($)</HeaderSubtitle>
                </Header>
                <Header className="right-header">
                    <HeaderTitle>Sells</HeaderTitle>
                    <HeaderSubtitle>Price ($)</HeaderSubtitle>
                    <HeaderSubtitle>Quantity</HeaderSubtitle>
                </Header>
            </HeadersContainer>
            <Grid columnCount={4} columnWidth={columnWidth} height={gridHeight} width={gridWidth} rowCount={numRows} rowHeight={rowHeight}
                  itemData={rows}
                  className="grid-container">
                {loading ? CellPlaceholder : Cell}
            </Grid>
        </Container>
    );
};

OrderBook.propTypes = {
    orders: PropTypes.object.isRequired,
    loading: PropTypes.bool
};

OrderBook.defaultProps = {
    loading: false
}

export default OrderBook;
