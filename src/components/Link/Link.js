
import styled from 'styled-components'

import { colors } from '../../styles/palette';

const Link = styled.button`
  border: none;
  background-color: transparent;
  color: ${colors.primary};
  &:hover {
    cursor: pointer;
  }
`;

export default Link;