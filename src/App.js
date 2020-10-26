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

const App = () => {
    const [orders, setOrders] = useState({ buys: {}, sells: {} });
    const [orderBookLoading, setOrderBookLoading] = useState(false);
    const [orderEntryLoading, setOrderEntryLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setOrderBookLoading(true);
        setError(null);
        callFetch('/book', { method: 'GET', headers: { 'Content-Type': 'application/json' }})
            .then(({ response, error }) => {
                if (error) {
                    setError(error);
                } else {
                    setOrders(response);
                }
                setOrderBookLoading(false);
            });

    }, []);

    const handleSubmit = (type, data) => {
        setOrderEntryLoading(true);
        callFetch(`/${type}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(({ _, error }) => {
                if (error) {
                    setError(error);
                } else {
                    // TODO load data
                }
                setOrderEntryLoading(false);
            });
    }

    return (
        <ThemeProvider theme={Theme}>
            <div className="App">
                <GlobalStyle/>
                <Container>
                    <OrderEntry loading={orderEntryLoading} onSubmit={handleSubmit} />
                    {orders && <OrderBook orders={orders} loading={orderBookLoading} />}
                </Container>
            </div>
        </ThemeProvider>
    );
}

export default App;
