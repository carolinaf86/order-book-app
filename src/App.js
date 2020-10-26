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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        callFetch('/book', { method: 'GET', headers: { 'Content-Type': 'application/json' }})
            .then(({ response, error }) => {
                if (error) {
                    setError(error);
                } else {
                    setOrders(response);
                }
                setLoading(false);
            });

    }, []);

    const handleSubmit = (type, data) => {
        // TODO make POST request, reload data
        console.log('Type', type, 'data', data);
    }

    return (
        <ThemeProvider theme={Theme}>
            <div className="App">
                <GlobalStyle/>
                <Container>
                    <OrderEntry onSubmit={handleSubmit} />
                    {orders && <OrderBook orders={orders} loading={loading} />}
                </Container>
            </div>
        </ThemeProvider>
    );
}

export default App;
