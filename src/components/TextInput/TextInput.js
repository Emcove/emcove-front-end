
import styled, { css } from 'styled-components'

import { colors } from '../../styles/palette';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 8px 10px;
  border: solid 1px ${colors.lightGray};
  border-radius: 3px;
  color: ${colors.textColor};
  
  ${props => props.required && css `
    border: solid 1px ${colors.redOrange};
  `}
`;

const WarningMessage = styled.span`
  font-size: 12px;
  color: ${colors.redOrange};
  margin-top: 8px;
`;

const TextInput = ({ required }) => {
  if (required) {
   return ( 
      <InputContainer>
        <Input required/>
        <WarningMessage>Campo requerido</WarningMessage>
      </InputContainer>
    );
  }

  return (
    <Input />
  )
}


export default TextInput;