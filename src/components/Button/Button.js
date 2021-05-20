
import styled, { css } from 'styled-components'

import { colors } from '../../styles/palette';

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  margin: 0.5em 1em;
  padding: 8px 10px;
  border: none;

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