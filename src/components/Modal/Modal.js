
import React from 'react';
import styled from 'styled-components';

// import { colors } from '../../styles/palette';

import Card from '../Card';
// import Icons from '../Icons';
import Link from '../Link';

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
  if(!open) return null;
  return (
    <Container>
      <CardContainer>
        <Card className={className} vertical minWidth="532px" minHeight="400px" paddingSize="48px">
          {children}
          <Link onClick={setVisibility}>Cerrar</Link>
        </Card>
      </CardContainer>
    </Container>
  )
}


export default Modal;