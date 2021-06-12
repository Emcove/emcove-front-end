
import React from 'react';
import styled from 'styled-components';

// import { colors } from '../../styles/palette';

import Icon from '../Icons';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  background-color: #000000ad;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalCard = styled.div`
  position: relative;
  display: flex;
  background-color: #fff;
  margin: 24px;
  padding: 32px 32px 0 32px;
  width: calc(70% - 64px);
  border-radius: 6px;
`;

const CloseModalButton = styled.button`
  position: absolute;
  display: flex !important;
  align-items: center;
  justify-content: center;
  top: 4px;
  right: 4px;
  width: 24px;
  height: 24px;
  border: none;
  background-color: transparent;
  border-radius: 100%;
  color: #fff;

  &:hover {
    cursor: pointer;
  }
`;

const Modal = ({ open, setVisibility, children }) => {
  if(!open) return null;
  return (
    <Container>
      <CardContainer>
        <ModalCard className="modal-card">
          <CloseModalButton onClick={() => setVisibility(false)}><Icon type="cross" className="close-modal__icon" /></CloseModalButton>
          {children}
        </ModalCard>
      </CardContainer>
    </Container>
  )
}


export default Modal;