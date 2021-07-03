import React from 'react';
import styled, { css } from 'styled-components';

import { colors } from '../../styles/palette';

import Modal from '../Modal';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px 16px 64px; 
`;

const Title = styled.span`
  font-size: 24px;
  font-weight: 600;
`;

const Message = styled.span`
  font-size: 18px;
  font-weight: 400;
  margin-top: 32px;
`;

const ActionContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 56px;
`;

const Button = styled.button`
  padding: 12px 14px;
  font-size: 16px;
  font-family: 'Raleway';
  font-weight: 600;
  border: none;
  border-radius: 4px;

  ${props => props.cancel && css`
    color: white;
    background-color: ${colors.primary};
    transition: opacity ease-in 0.2;
    margin-right: 12px;
    &:hover {
      opacity: 0.6;
    }
  `};

  ${props => props.confirm && css `
    color: ${colors.primary};
    background-color: transparent;
    transition: background-color ease-in 0.2s;

    &:hover {
      background-color: ${colors.primaryHover};
    }
  `};

  &:hover {
    cursor: pointer;
  }
`;

const ConfirmationModal = ({ title, message, onAccept, onCancel, isVisible }) => {
  return (
    <Modal open={isVisible} setVisibility={onCancel} confirmation>
      <Container>
        <Title>{title}</Title>
        <Message>{message}</Message>
        <ActionContainer>
          <Button cancel onClick={() => onCancel(false)}>Cancelar</Button>
          <Button confirm onClick={() => onAccept()}>Aceptar</Button>
        </ActionContainer>
      </Container>
    </Modal>
  )
}


export default ConfirmationModal;