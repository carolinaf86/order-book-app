import styled, { keyframes } from 'styled-components';
import React from 'react';

const BounceAnimation = keyframes`
  50% { opacity: 0; }
`;
const DotWrapper = styled.div`
  display: flex;
`;
const Dot = styled.div`
  margin: 0 1px;
  /* Animation */
  animation: ${BounceAnimation} 1s linear infinite;
  animation-delay: ${props => props.delay};
`;

const LoadingDots = () => (
    <DotWrapper>
        <Dot delay="0s">.</Dot>
        <Dot delay=".1s">.</Dot>
        <Dot delay=".2s">.</Dot>
    </DotWrapper>
);

export default LoadingDots;
