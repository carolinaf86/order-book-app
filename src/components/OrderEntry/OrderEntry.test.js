import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Theme } from '../../Theme';
import userEvent from '@testing-library/user-event';
import { Default } from './OrderEntry.stories';
import 'mutationobserver-shim';

let onSubmit;

beforeEach(() => {
    onSubmit = jest.fn();
    render(<ThemeProvider theme={Theme}><Default {...Default.args} onSubmit={onSubmit} /></ThemeProvider>);
});

afterEach(() => {
    onSubmit = null;
});

describe('OrderEntry', () => {
    it('calls "onSubmit" with type and form data when user enters valid data and clicks submit', async () => {
        const price = '1.10';
        const quantity = '2';
        userEvent.click(screen.getByTestId('sell-btn'));
        await userEvent.type(screen.queryByPlaceholderText('Price'), price);
        await userEvent.type(screen.queryByPlaceholderText('Quantity'), quantity);

        await act(async () => {
            userEvent.click(screen.queryByTestId('order-entry-submit-btn'));
        });
        expect(onSubmit).toHaveBeenCalledWith('sell', { price, quantity });
    });
    it('does not call "onSubmit" and displays error text when user does not enter a price', async () => {
        await userEvent.type(screen.queryByPlaceholderText('Quantity'), '2');
        await act(async () => {
            userEvent.click(screen.queryByTestId('order-entry-submit-btn'));
        });
        expect(onSubmit).not.toHaveBeenCalled();
        expect(screen.getByText('Price is required')).not.toBeNull();
    });
    it('does not call "onSubmit" and displays error text when user does not enter a quantity', async () => {
        await userEvent.type(screen.queryByPlaceholderText('Price'), '2');
        await act(async () => {
            userEvent.click(screen.queryByTestId('order-entry-submit-btn'));
        });
        expect(onSubmit).not.toHaveBeenCalled();
        expect(screen.getByText('Quantity is required')).not.toBeNull();
    });
    it('does not call "onSubmit" and displays error text when user enters a price with more than 2 decimals', async () => {
        await userEvent.type(screen.queryByPlaceholderText('Price'), '1.111');
        await userEvent.type(screen.queryByPlaceholderText('Quantity'), '2');
        await act(async () => {
            userEvent.click(screen.queryByTestId('order-entry-submit-btn'));
        });
        expect(onSubmit).not.toHaveBeenCalled();
        expect(screen.getByText('Price must be a number with up to 2 decimal places')).not.toBeNull();
    });
    it('does not call "onSubmit" and displays error text when user enters a quantity with decimal places', async () => {
        await userEvent.type(screen.queryByPlaceholderText('Price'), '1');
        await userEvent.type(screen.queryByPlaceholderText('Quantity'), '2.5');
        await act(async () => {
            userEvent.click(screen.queryByTestId('order-entry-submit-btn'));
        });
        expect(onSubmit).not.toHaveBeenCalled();
        expect(screen.getByText('Quantity must be a whole number')).not.toBeNull();
    });
});
