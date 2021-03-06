
import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components'

import { colors } from '../../styles/palette';

import Icon from '../Icons';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const DropdownDispatcher = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  background-color: ${colors.white};
  border: solid 1px ${colors.grayBorder};
  border-radius: 3px;
  text-align: left;
  margin: 0 0 16px 0;
  font-family: 'Raleway';

  &:hover {
    cursor: pointer;
  }
`;

const IconContainer = styled.div`
  margin-left: 10px;
`;

const Label = styled.span`
  margin: 0 0 .42857em .42857em;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.4);
`;

const Options = styled.div`
  position: absolute;
  margin-top: -17px;
  border: solid 1px ${colors.grayBorder};
  border-radius: 3px;
  background-color: ${colors.white};
  z-index: 10;
`;

const Option = styled.div`
  padding: 8px 32px 10px 10px;
  border: none;
  background-color: transparent;
  text-align: left;
  font-size: 14px;

  &:hover {
    cursor: pointer;
    background-color: ${colors.primaryHover};
  }

  ${props => props.disabled && css`
    background-color: ${colors.grayBorder};
    opacity: 0.5;

    &:hover {
      background-color: ${colors.grayBorder};
      cursor: default;
    }
  `}  
`;

const Dropdown = ({ label, options, placeholder, onClickOption, feedbackDropdown }) => {
  const [showingPlaceholder, setPlaceholder] = useState(placeholder || options[0]);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    document.addEventListener('click', () => {
      setShowOptions(false);
    });

    document.addEventListener('keydown', (event) => {
      if(event.key === "Escape") {
        setShowOptions(false);
      }
    });

    return () => {
      document.removeEventListener('keydown', () => {});
      document.removeEventListener('click', () => {});
    }
  }, [setShowOptions]);

  const optionClicked = (event, option) => {
    event.stopPropagation();
    
    setPlaceholder(option);
    onClickOption && onClickOption(option, label);
    setShowOptions(false);
  };

  return (
    <Container className="dropdown-component">
      <Label>{label}</Label>
      <div>
      <DropdownDispatcher onClick={(event) => { event.stopPropagation(); setShowOptions(!showOptions); }}>
        {showingPlaceholder}
        <IconContainer>
          <Icon type="arrow-down" className="dropdown-icon" />
        </IconContainer>
      </DropdownDispatcher>
      {showOptions && !feedbackDropdown &&
        <Options>
          {options.map(option => <Option key={option} onClick={(event) => optionClicked(event, option)}>{option}</Option>)}
        </Options>
      }

      {showOptions && feedbackDropdown &&
        <Options>
          {options.map(option => <Option key={option.text} disabled={!option.enabled} onClick={option.enabled ? (event) => optionClicked(event, option.text) : () => {}}>{option.text}</Option>)}
        </Options>
      }
      </div>
    </Container>
  );
}


export default Dropdown;