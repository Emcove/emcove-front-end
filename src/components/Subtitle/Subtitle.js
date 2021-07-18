
import styled from 'styled-components'

import { colors } from '../../styles/palette';

const Subtitle = styled.h2`
  color: ${colors.textColor};
  font-size: 28px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export default Subtitle;
