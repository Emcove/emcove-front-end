
import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';

import Icon from '../Icons';

const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  background-color: #000000ad;
  z-index: 20;
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
  padding: 32px 40px 0 40px;
  width: fit-content;
  border-radius: 6px;

  ${props => props.minWidth && css `
      min-width: ${props.minWidth};
  `}

  @media (max-width: 768px) {
    width: calc(100% - 40px);
    min-height: calc(100vh - 28px - 20px);
    border-radius: 0;
    margin: 0;
    padding: 28px 20px 20px;
  }
`;

const CloseModalButton = styled.button`
  position: absolute;
  display: flex !important;
  align-items: center;
  justify-content: center;
  top: 10px;
  right: 12px;
  width: 24px;
  height: 24px;
  border: none;
  background-color: transparent;
  border-radius: 100%;
  color: #fff;

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 768px) {
    height: 28px;
    width: 28px;
  }
`;

const Modal = ({ open, setVisibility, children, minWidth }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.addEventListener('keydown', (event) => {
      if(event.key === "Escape") {
        setVisibility(false);
      }
    });

    return () => {
      document.removeEventListener('keydown', () => {});
    }
  }, [setVisibility]);

  if(!open) return null;
  return (
    <Container>
      <CardContainer>
        <ModalCard minWidth={minWidth} className="modal-card">
          <CloseModalButton onClick={() => setVisibility(false)}><Icon type="cross" className="close-modal__icon" /></CloseModalButton>
          {children}
        </ModalCard>
      </CardContainer>
    </Container>
  )
}


export default Modal;