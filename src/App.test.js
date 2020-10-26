import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import 'mutationobserver-shim';
import App from './App';

let spy;

beforeEach(() => {
    spy = jest.spyOn(window, 'fetch');
});

afterEach(() => {
    spy.mockRestore();
});

const mockGetBook = () => {
    const mockResponse = { data: true };
    const mockJsonPromise = Promise.resolve(mockResponse);
    const mockFetchPromise = Promise.resolve({
        ok: true,
        json: () => mockJsonPromise
    });
    spy.mockImplementationOnce(() => mockFetchPromise);
};

const mockPost = () => {
    const mockResponse = 'Success';
    const mockFetchPromise = Promise.resolve({
        ok: true,
        body: mockResponse
    });
    spy.mockImplementationOnce(() => mockFetchPromise);
}

describe('App', () => {
    it('renders the OrderEntry and OrderBook components', async () => {
        mockGetBook();
        await act(async () => {
            render(<App />);
        });
        expect(screen.queryByTestId('order-entry-container')).not.toBeNull();
        expect(screen.queryByTestId('order-book-container')).not.toBeNull();
    });
    it('makes a GET request to retrieve order book data on page load', async () => {
        mockGetBook();
        await act(async () => {
            render(<App />);
        });
        expect(spy).toHaveBeenCalledWith('/book', { method: 'GET', headers: { 'Content-Type': 'application/json' }});
    });
    it('makes a POST request to /buy when user submits form with "buy" button toggled', async () => {
        mockGetBook();
        await act(async () => {
            render(<App />);
        });
        mockPost();
        mockGetBook();

        const price = '1.10';
        const quantity = '2';
        await userEvent.type(screen.queryByPlaceholderText('Price'), price);
        await userEvent.type(screen.queryByPlaceholderText('Quantity'), quantity);
        await act(async () => {
            userEvent.click(screen.queryByTestId('order-entry-submit-btn'));
        });
        expect(spy).toHaveBeenCalledTimes(3);
        expect(spy).toHaveBeenCalledWith('/buy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ price, quantity })
        });
    });
    it('makes a POST request to /sell when user submits form with "sell" button toggled', async () => {
        mockGetBook();
        await act(async () => {
            render(<App />);
        });
        mockPost();
        mockGetBook();

        const price = '1.10';
        const quantity = '4';
        userEvent.click(screen.getByTestId('sell-btn'));
        await userEvent.type(screen.queryByPlaceholderText('Price'), price);
        await userEvent.type(screen.queryByPlaceholderText('Quantity'), quantity);
        await act(async () => {
            userEvent.click(screen.queryByTestId('order-entry-submit-btn'));
        });
        expect(spy).toHaveBeenCalledTimes(3);
        expect(spy).toHaveBeenCalledWith('/sell', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ price, quantity })
        });
    });
    it('displays an error message if api request returns an error', async () => {
        const mockError = 'Network Error';
        const mockFetchPromise = Promise.reject(mockError);
        spy.mockImplementation(() => mockFetchPromise);

        await act(async () => {
            render(<App />);
        });
        expect(screen.queryByTestId('error-banner')).not.toBeNull();
    });
});
