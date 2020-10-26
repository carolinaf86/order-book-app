import React, { useEffect, useState } from 'react';
import './App.css';
import { GlobalStyle } from './GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { Theme } from './Theme';
import OrderBook from './components/OrderBook/OrderBook';
import { callFetch } from './helpers/call-fetch';

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

    return (
        <ThemeProvider theme={Theme}>
            <div className="App">
                <GlobalStyle/>
                {orders && <OrderBook orders={orders} loading={loading} />}
            </div>
        </ThemeProvider>
    );
}

export default App;
