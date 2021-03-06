
import React from 'react';
import styled, { css } from 'styled-components'

import { colors } from '../../styles/palette';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-flow: row wrap;
    align-items: center;
    padding: 24px;
    margin: 0 auto;
    max-width: 70%;
    position: fixed;
    z-index: 1021;
    bottom: 77px;
    left: 0;
    right: 0;
    color: ${colors.white};
    border-radius: .42857em;
    box-shadow: 0 8px 16px 0 rgb(0 0 0 / 10%);
    visibility: hidden;
    transition: visibility 0s linear 0s, opacity 300ms;

  ${props => props.type === 'success' && css`
    background: ${colors.success};
  `}

  ${props => props.type === 'info' && css`
    background: ${colors.primary};
  `}

  ${props => props.type === 'error' && css`
    background: ${colors.error};
  `}

  ${props => props.show && css`
    visibility: visible;
  `}

  &:hover {
    cursor: pointer;
  }
`;

const Text = styled.span`
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Snackbar = ({ message, show, type }) => {
  return (
    <Container type={type} show={show}>
      <Text>{message}</Text>
    </Container>
  );
}


export default Snackbar;