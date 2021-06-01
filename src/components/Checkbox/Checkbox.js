import React from 'react';
import styled, { css } from 'styled-components'

import { colors } from '../../styles/palette';

import Icon from '../Icons';

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CheckboxLabel = styled.span`
  font-size: 16px;
  color: ${colors.textColor};
  margin-left: 8px;
  opacity: 1;

  ${props => props.disabled && css `
    opacity: 0.7;
  `}
`;

const CheckboxInput = styled.div`
  width: 16px;
  height: 16px;
  background-color: ${colors.white};
  border: solid 1px rgba(0,0,0,0.2);
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;

  &:hover {
    cursor: pointer;
  }

  ${props => props.checked && css `
    width: 18px;
    height: 18px;
    background-color: ${colors.primary};
    border: none;
  `}

  ${props => props.disabled && css `
    opacity: 0.7;
  `}
`;

const Checkbox = ({ id, label, checked, onClick, className, disabled }) => {
  console.log(disabled);
  const handleClick = () => {
    if (!disabled) onClick();
  }
  return (
    <CheckboxContainer className={className}>
      <CheckboxInput disabled={disabled} id={id} type="checkbox" checked={checked} onClick={() => handleClick()}>
        {checked && <Icon type="check" className="input-check" />}
      </CheckboxInput>
      <CheckboxLabel disabled={disabled}>{label}</CheckboxLabel>
    </CheckboxContainer>
  );
}

export default Checkbox;
