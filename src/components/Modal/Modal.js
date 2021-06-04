
import React from 'react';
import styled from 'styled-components';

// import { colors } from '../../styles/palette';

import Card from '../Card';
// import Icons from '../Icons';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  background-color: #000000ad;
`;

const CardContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Modal = ({ className, open, setVisibility, children }) => {
  console.log('open modal: ', open);
  if(!open) return null;
  return (
    <Container className={className}>
      <CardContainer>
        <Card vertical minWidth="532px" minHeight="400px" paddingSize="48px">
          {children}
        </Card>
      </CardContainer>
    </Container>
  )
}


export default Modal;