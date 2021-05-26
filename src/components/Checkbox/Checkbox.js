import React from 'react';
import styled, { css } from 'styled-components'

import { colors } from '../../styles/palette';

import Icon from '../Icons';

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 24px;
  margin-top: 16px;
`;

const CheckboxLabel = styled.span`
  font-size: 16px;
  color: ${colors.textColor};
  margin-left: 8px;
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

  ${props => props.checked && css `
    width: 18px;
    height: 18px;
    background-color: ${colors.primary};
    border: none;
  `}
`;

const Checkbox = ({ id, label, checked, onClick }) => {
  return (
    <CheckboxContainer>
      <CheckboxInput id={id} type="checkbox" checked={checked} onClick={onClick}>
        {checked && <Icon type="check" className="input-check" />}
      </CheckboxInput>
      <CheckboxLabel>{label}</CheckboxLabel>
    </CheckboxContainer>
  );
}

export default Checkbox;
