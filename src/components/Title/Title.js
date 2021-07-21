
import styled from 'styled-components'

import { colors } from '../../styles/palette';

const Title = styled.h1`
  color: ${colors.textColor};
  font-size: 32px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export default Title;
