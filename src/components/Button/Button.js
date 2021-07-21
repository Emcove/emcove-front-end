
import styled, { css } from 'styled-components'

import { colors } from '../../styles/palette';

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  padding: 8px 10px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  border: solid 2px ${colors.primary};
  margin: 0 4px;
  font-family: 'Raleway';

  ${props => props.large && css`
    width: 100%;
  `}
  
  ${props => props.primary && css`
    background: ${colors.primary};
    color: white;
  `}

  ${props => props.secondary && css `
    background: transparent;
    color: ${colors.primary};

    &:hover {
      background-color: ${colors.primaryTen};
    }
  `}

  ${props => props.backgroundColor && css`
    background: ${props.backgroundColor};
    border: none;
    color: white;
  `}

  ${props => props.alignment && css`
    align-self: ${props.alignment};
  `}

  ${props => props.color && css`
    color: ${props.color};
  `}

  &:hover {
    cursor: pointer;
  }
`;

export default Button;