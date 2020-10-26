import styled from 'styled-components';

export const Button = styled.button`
    -webkit-appearance: button;
    height: 32px;
    width: ${({ width }) => width || 'auto'};
    padding-left: 16px;
    padding-right: 16px;
    background-color: ${({ theme }) => theme.colors.primaryBlue};
    color: ${({ theme }) => theme.colors.white};
    font-weight: normal;
    font-size: 16px;
    line-height: 21px;
    box-shadow: 0px 1px 3px rgba(31, 50, 77, 0.2);
    border: none;
    border-radius: 2px;
    cursor: pointer;
    &:disabled {
        background-color: ${({ theme }) => theme.colors.lightGrey};
        cursor: not-allowed;
        &:hover {
            background-color: ${({ theme }) => theme.colors.lightGrey};
        }
    }
    &:hover {
        background-color: ${({ theme }) => theme.colors.darkBlue};
        color: ${({ theme }) => theme.colors.white};
    }
    &&&&:active,:focus {
       background-color: ${({ theme }) => theme.colors.darkBlue};
       box-shadow: box-shadow: 0px 1px 3px rgba(31, 50, 77, 0.2);
       outline: none;
    }
`;
