
import React from 'react';
import styled, { css } from 'styled-components'

import { colors } from '../../styles/palette';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
`;

const WarningMessage = styled.span`
  font-family: 'Roboto';
  font-size: 12px;
  color: ${colors.redOrange};
  margin-top: 8px;
`;

const Label = styled.span`
  font-family: 'Roboto';
  color: #808080;
  font-size: 14px;
  margin-bottom: 4px;
`;

const TextInput = ({ label, required, value, placeholder, type, id, onChange }) => {
  return (
    <InputContainer>
      { label && value && <Label>{label}</Label> }
      { label && !value && <div className="label-space" />}
      <input
        className="text-input"
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
      />
    </InputContainer>
  )
}


export default TextInput;