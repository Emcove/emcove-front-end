
import React from 'react';
import styled from 'styled-components'

import Icons from '../Icons';

import { colors } from '../../styles/palette';

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.warning};
  border-radius: 100%;
  height: 210px;
  width: 210px;
`;

const Logo = () => {
  return (
    <LogoContainer>
      <Icons type="vertical-logo-color" />
    </LogoContainer>
  )
}


export default Logo;