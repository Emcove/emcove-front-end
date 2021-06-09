
import React from 'react';
import styled, { css } from 'styled-components'
import classNames from 'classnames';

import { colors } from '../../styles/palette';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  margin-right: 16px;
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

const Input = styled.input`
  color: ${colors.textColor};

  ${props => props.multiline && css `
    min-height: 40px;
  `}
`;

const TextArea = styled.textarea`
  color: ${colors.textColor};
  height: 80px;
  font-family: 'Roboto';
  padding: 10px;
  resize: none;
`;

const Hint = styled.span`
  color: ${colors.lightGray};
  font-size: 10px;
  margin-top: 4px;
`;

const TextInput = ({ id, label, value, required, placeholder, type, onChange, disabled, className, multiline, hint }) => {

  const handleFieldChange = (e) => {
    onChange(e.currentTarget.value);
  }

  return (
    <InputContainer className={className}>
      {label && value && <Label>{label}</Label>}
      {label && !value && <div className="label-space" />}
      {!multiline &&
        <Input
          className={classNames("text-input", {"text-input__required": required})}
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => handleFieldChange(e)}
          disabled={disabled}
        />
      }
      {multiline &&
        <TextArea
          className={classNames("text-input", {"text-input__required": required})}
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={(e) => handleFieldChange(e)}
          disabled={disabled}
        />
      }
      {required && <WarningMessage>Campo requerido</WarningMessage>}
      {!required && hint && <Hint>{hint}</Hint>}
    </InputContainer>
  )
}


export default TextInput;