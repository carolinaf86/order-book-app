import React from 'react';
import { Button } from '../common';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const LeftButton = styled(Button)`
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
`;

const RightButton = styled(Button)`
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
`;

const ButtonToggle = ({ value, onChange }) => {
    return (
        <div>
            <LeftButton type="button" data-testid="buy-btn" className={ value === 'buy' ? 'selected' : ''} onClick={() => onChange('buy')}>Buy</LeftButton>
            <RightButton type="button" data-testid="sell-btn" className={ value === 'sell' ? 'selected' : ''} onClick={() => onChange('sell')}>Sell</RightButton>
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
