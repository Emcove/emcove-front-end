
import styled, { css } from 'styled-components'

import { colors } from '../../styles/palette';

const Link = styled.button`
  border: none;
  background-color: transparent;
  color: ${colors.primary};
  font-family: 'Raleway';
  
  &:hover {
    cursor: pointer;
  }

  ${props => props.bold && css `
    font-size: 14px;
    font-weight: 600;
  `}

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export default Link;