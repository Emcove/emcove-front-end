
import styled, { css } from 'styled-components'

import { colors } from '../../styles/palette';

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  padding: 8px 10px;
  border: none;
  width: 100%;
  font-size: 14px;
  
  ${props => props.primary && css`
    background: ${colors.primary};
    color: white;
    &:hover {
      cursor: pointer;
    }
  `}
  ${props => props.secondary && css `
    background: transparent;
    color: ${colors.primary};
    border: solid 2px ${colors.primary};

    &:hover {
      cursor: pointer;
      background-color: ${colors.primaryTen};
    }
  `}
`;

export default Button;