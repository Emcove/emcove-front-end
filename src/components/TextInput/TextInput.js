
import React from 'react';
import styled, { css } from 'styled-components'
import classNames from 'classnames';

import { colors } from '../../styles/palette';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const WarningMessage = styled.span`
  font-family: 'Roboto';
  font-size: 10px;
  color: ${colors.redOrange};
  margin-top: 4px;
`;

const Label = styled.span`
  font-family: 'Roboto';
  color: #808080;
  font-size: 14px;
  margin-bottom: 4px;
`;

const TextInput = ({ id, label, value, required, placeholder, type, onChange }) => {

  const handleFieldChange = (e) => {
    onChange(e.currentTarget.value);
  }

  return (
    <InputContainer>
      {label && value && <Label>{label}</Label>}
      {label && !value && <div className="label-space" />}
      <input
        className={classNames("text-input", {"text-input__required": required})}
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => handleFieldChange(e)}
      />
      {required && <WarningMessage>Campo requerido</WarningMessage>}
    </InputContainer>
  )
}


export default TextInput;