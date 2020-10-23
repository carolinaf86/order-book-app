import React from 'react';
import './App.css';
import { GlobalStyle } from './GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { Theme } from './Theme';

const App = () => {
    return (
        <ThemeProvider theme={Theme}>
            <div className="App">
                <GlobalStyle/>
                Add components here
            </div>
        </ThemeProvider>
    );
}

export default App;
