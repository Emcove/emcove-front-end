
import React, { useEffect, useRef } from 'react';
import styled  from 'styled-components';

import { colors } from '../../styles/palette';

import Icon from '../Icons';

const Container = styled.div`
  display: flex;
  width: -webkit-fill-available;
  justify-content: center;
`;

const Input = styled.input`
  width: 100%;
  max-width: 530px;
  font-family: 'Raleway', sans-serif;
  padding: 8px 12px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border: solid 0.5px rgba(146, 145, 145, 0.8);
  border-right: none;
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const IconButton = styled.button`
  border: none;
  background-color: ${colors.primary};
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  padding: 8px 12px;

  &:hover {
    cursor: pointer;
  }

  &:focus-visible {
    border: none;
  }
`;

const Search = ({ searchFunction, placeholder, searchText, updateSearchText }) => {
  const submitButtonRef = useRef("submitButton");
  
  const searchBusiness = () => {
    searchFunction(searchText);
  };

  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      const submitButton = submitButtonRef.current;

      if (event.key === "Enter" && submitButton) {
        submitButton.click();
      }
    });

    return () => {
      document.removeEventListener('keydown', () => {});
    }
  }, []);

  return (
    <Container>
      <Input
        className="business-search"
        id="business-search"
        type="text"
        value={searchText}
        placeholder={placeholder}
        onChange={(e) => updateSearchText(e.currentTarget.value)}
      />
      <IconButton onClick={searchBusiness} id="submitButton" ref={submitButtonRef}>
        <Icon type="white-magnifying-glass" className="magnifying-glass-button" />
      </IconButton>
    </Container>
  )
}


export default Search;