
import React, {useState} from 'react';
import styled from 'styled-components'

import { colors } from '../../styles/palette';

import Icon from '../Icons';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
`;

const DropdownDispatcher = styled.button`
  min-width: 170px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  background-color: ${colors.white};
  border: solid 1px ${colors.grayBorder};
  font-family: 'Roboto';
  text-align: left;

  &:hover {
    cursor: pointer;
  }
`;

const IconContainer = styled.div``;

const Label = styled.span`
  margin-bottom: 4px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.4);
`;

const Options = styled.div`
  border: solid 1px ${colors.grayBorder};
  border-radius: 3px;
  background-color: ${colors.white};
  width: 170px;
  height: 40px;
`;

const Dropdown = ({ label, options, placeholder }) => {
  const [showingPlaceholder, setPlaceholder] = useState(placeholder);
  const [showOptions, setShowOptions] = useState(false);
  return (
    <Container className="dropdown-component">
      <Label>{label}</Label>
      <DropdownDispatcher onClick={() => setShowOptions(!showOptions)}>
        {showingPlaceholder}
        <IconContainer>
          <Icon type="arrow-down" className="dropdown-icon" />
        </IconContainer>
      </DropdownDispatcher>
      {showOptions &&
        <Options>

        </Options>
      }
    </Container>
  );
}


export default Dropdown;