
import React from 'react';
import styled, { css } from 'styled-components';
import ReactLoading from 'react-loading';

import { colors } from '../../styles/palette';


const Container = styled.div`
  height: 100%;
  width: 100vw;
  position: absolute;
  top: 0;
  background-color: #000000ad;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 16;
  ${props => props.component && css `
    width: 100%;
    height: 100%;
    position: relative;
  `}

  ${props => props.backgroundColor && css `
    background-color: ${props.backgroundColor};
  `}
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loading = ({ component, backgroundColor }) => {
  if (component) {
    return (
      <LoadingContainer>
        <ReactLoading className="login-button__loading" color={colors.white} height="20px" width="20px" />
      </LoadingContainer>
    );
  }
  return (
    <Container backgroundColor={backgroundColor}>
      <ReactLoading type="spin" color={colors.primary} height="10%" width="10%" />
    </Container>
  )
}


export default Loading;