import React, { useEffect, useState } from 'react';
import './App.css';
import { GlobalStyle } from './GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { Theme } from './Theme';
import OrderBook from './components/OrderBook/OrderBook';
import { callFetch } from './helpers/call-fetch';
import OrderEntry from './components/OrderEntry/OrderEntry';
import styled from 'styled-components';

const Container = styled.div`
    width: 800px;
    height: 100vh;
    margin: auto;
`;

const ErrorBanner = styled.div`
    flex-direction: row;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.darkRed};
    box-shadow: 0px 3px 12px #00000033;
    padding: 8px 13px;
    align-items: center;
`;

const App = () => {
    const [orders, setOrders] = useState({ buys: {}, sells: {} });
    const [orderBookLoading, setOrderBookLoading] = useState(true);
    const [orderEntryLoading, setOrderEntryLoading] = useState(false);
    const [error, setError] = useState(null);
    const [fetchCount, setFetchCount] = useState(0);

    useEffect(() => {
        setError(null);
        const fetchOrders = async () => {
            const { response, error } = await callFetch('/book', { method: 'GET', headers: { 'Content-Type': 'application/json' } });
            if (error) {
                setError(error);
            } else {
                setOrders(response);
            }
            setOrderBookLoading(false);
            setOrderEntryLoading(false);
        };
        fetchOrders();

    }, [fetchCount]);

    const handleSubmit = async (type, data) => {
        setOrderEntryLoading(true);
        const { error } = await callFetch(`/${type}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }, false);

        if (error) {
            setError(error);
        } else {
            setFetchCount(fetchCount + 1);
        }
    }

    return (
        <ThemeProvider theme={Theme}>
            <div className="App">
                <GlobalStyle/>
                {error && <ErrorBanner data-testid="error-banner">Oops! Something went wrong. Please try again later.</ErrorBanner>}
                <Container>
                    <OrderEntry loading={orderEntryLoading} onSubmit={handleSubmit}/>
                    {orders && <OrderBook orders={orders} loading={orderBookLoading}/>}
                </Container>
            </div>
        </ThemeProvider>
    );
}

export default App;
