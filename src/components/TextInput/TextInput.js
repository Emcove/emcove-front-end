
import React from 'react';
import styled from 'styled-components'
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
  color: ${colors.error};
  margin: .61538em 0 0 .46154em;
`;

const Label = styled.span`
  font-family: 'Roboto';
  color: #808080;
  font-size: 14px;
  margin: 0 0 .42857em .42857em;
`;

const TextInput = ({ id, label, value, required, placeholder, type, onChange, disabled, className }) => {

  const handleFieldChange = (e) => {
    onChange(e.currentTarget.value);
  }

  return (
    <InputContainer className={className}>
      {label && value && <Label>{label}</Label>}
      {label && !value && <div className="label-space" />}
      <input
        className={classNames("text-input", {"text-input__required": required})}
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => handleFieldChange(e)}
        disabled={disabled}
      />
      {required && <WarningMessage>Campo requerido</WarningMessage>}
    </InputContainer>
  )
}


export default TextInput;