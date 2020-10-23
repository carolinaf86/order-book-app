import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Theme } from '../../Theme';
import { Default } from './OrderBook.stories';

describe('OrderBook', () => {
    it('renders the order book', () => {
        render(<ThemeProvider theme={Theme}><Default {...Default.args} /></ThemeProvider>);
        expect(screen.queryByTestId('order-book-container')).not.toBeNull();
    });
});
