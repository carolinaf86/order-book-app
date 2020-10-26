import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Theme } from '../../Theme';
import { Default } from './ButtonToggle.stories';
import userEvent from '@testing-library/user-event';

let onChange;

beforeEach(() => {
    onChange = jest.fn();
    render(<ThemeProvider theme={Theme}><Default {...Default.args} onChange={onChange} /></ThemeProvider>);
});

afterEach(() => {
    onChange = null;
});

describe('ButtonToggle', () => {
    it('renders with "buy" button selected by default', () => {
        expect(screen.queryByTestId('buy-btn')).toHaveClass('selected');
    });
    it('calls "onChange" when "sell" button is clicked', () => {
         userEvent.click(screen.queryByTestId('sell-btn'));
         expect(onChange).toHaveBeenCalledWith('sell');
    });
});
