import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Button } from '../common';
import ButtonToggle from '../ButtonToggle/ButtonToggle';
import PropTypes from 'prop-types';
import { Dot } from 'react-animated-dots';

const Container = styled.div`
    display: flex;
    padding: 40px;
    justify-content: center;
`;

const FormGroup = styled.div`
    margin-right: 16px;
    & input {
        height: 22px;
        font-size: 16px;
        padding: 4px 6px;
        border-radius: 2px;
        border: 1px solid ${({ theme }) => theme.colors.mediumGrey};
        color: ${({ theme }) => theme.colors.darkGrey};
        &::placeholder {
            color: ${({ theme }) => theme.colors.mediumGrey};
        }
        &&&&:focus,:active {
            outline: none;
            background-color: transparent;
            border: 1px solid ${({ theme }) => theme.colors.primaryBlue};
        }
    }
`;

const Feedback = styled.div`
    color: ${({ theme }) => theme.colors.darkRed};
    font-size: 12px;
    width: 170px;
    margin-top: 8px;
    min-width: 2px;
    height: 15px;
    text-align: left;
    margin-left: 2px;
`;

const LoadingDots = styled.div`
    font-weight: bold;
    font-size: 26px;
`;

const OrderEntry = ({ loading, onSubmit }) => {
    const { register, handleSubmit, errors, reset } = useForm();
    const [type, setType] = useState('buy');

    useEffect(() => {
        if (!loading) {
            reset();
        }
    }, [loading]);

    const onSubmitForm = value => onSubmit(type, value);

    return (
        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmitForm)}>
            <Container data-testid="order-entry-container">
                <FormGroup>
                    <ButtonToggle onChange={setType} value={type} />
                </FormGroup>
                <FormGroup>
                    <input name="price" type="number" step="0.01" placeholder="Price"
                           ref={register({ required: true, pattern: /^\d+(\.\d{1,2})?$/ })}/>
                    <Feedback>
                        {errors.price?.type === 'required' && <span>Price is required</span>}
                        {errors.price?.type === 'pattern' && <span>Price must be a number with up to 2 decimal places</span>}
                    </Feedback>
                </FormGroup>
                <FormGroup>
                    <input name="quantity" type="number" step="1" placeholder="Quantity"
                           ref={register({ required: true, pattern: /^\d+$/ })}/>
                    <Feedback>
                        {errors.quantity?.type === 'required' && <span>Quantity is required</span>}
                        {errors.quantity?.type === 'pattern' && <span>Quantity must be a whole number</span>}
                    </Feedback>
                </FormGroup>
                { loading && <Button width="82px" disabled>
                    <LoadingDots>
                        <Dot>.</Dot>
                        <Dot>.</Dot>
                        <Dot>.</Dot>
                    </LoadingDots>
                </Button>}
                { !loading && <Button type="submit" data-testid="order-entry-submit-btn">Submit</Button>}
            </Container>
        </form>
    )
};

OrderEntry.propTypes = {
    loading: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired
};

OrderEntry.defaultProps = {
    loading: false
};

export default OrderEntry;
