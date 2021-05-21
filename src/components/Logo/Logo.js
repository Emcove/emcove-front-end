
import React from 'react';
import styled from 'styled-components'

import Icons from '../Icons';

import { colors } from '../../styles/palette';

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.orange};
  border-radius: 100%;
  height: 186px;
  width: 186px;
`;

const Logo = () => {
  return (
    <LogoContainer>
      <Icons type="logo" />
    </LogoContainer>
  )
}


export default Logo;