
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
    background: ${colors.cyan};
    color: white;
    &:hover {
      cursor: pointer;
      d
    }
  `}
  ${props => props.secondary && css `
    background: transparent;
    color: ${colors.cyan};
    border: solid 2px ${colors.cyan};

    &:hover {
      cursor: pointer;
      background-color: ${colors.cyanTen};
    }
  `}
`;

export default Button;