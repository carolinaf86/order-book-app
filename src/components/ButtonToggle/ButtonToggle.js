import React from 'react';
import { Button } from '../common';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled(Button)`
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.darkGrey};
    border: 1px solid ${({ theme }) => theme.colors.mediumGrey};
    box-shadow: none;
    &&:hover {
        border: 1px solid ${({ theme, dark }) => theme.colors[dark]};
        background-color: ${({ theme, dark }) => theme.colors[dark]};
    }
    &&&&:active,:focus {
       background-color: ${({ theme, dark }) => theme.colors[dark]};
    }
    &&.selected {
        border: 1px solid ${({ theme, primary }) => theme.colors[primary]};
        color: ${({ theme }) => theme.colors.white};
        background-color: ${({ theme, primary }) => theme.colors[primary]};
        box-shadow: none;
        font-weight: bold;
    }
`;

const BuyButton = styled(StyledButton)`
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
`;

const SellButton = styled(StyledButton)`
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
`;

const ButtonToggle = ({ value, onChange }) => {
    return (
        <div>
            <BuyButton type="button"
                        data-testid="buy-btn"
                        primary="primaryGreen"
                        dark="darkGreen"
                        className={ value === 'buy' ? 'selected' : ''}
                        onClick={() => onChange('buy')}>
                Buy
            </BuyButton>
            <SellButton type="button"
                         data-testid="sell-btn"
                         primary="primaryRed"
                         dark="darkRed"
                         className={ value === 'sell' ? 'selected' : ''}
                         onClick={() => onChange('sell')}>
                Sell
            </SellButton>
        </div>
    )
};

ButtonToggle.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

ButtonToggle.defaultProps = {
    value: 'buy'
};

export default ButtonToggle;
