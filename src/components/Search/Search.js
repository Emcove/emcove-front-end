
import React, { useState, useEffect, useRef } from 'react';
import styled  from 'styled-components';

import { colors } from '../../styles/palette';

import Icon from '../Icons';

const Container = styled.div`
  display: flex;
  width: -webkit-fill-available;
  margin: 20px 0 32px;
`;

const Input = styled.input`
  width: 100%;
  font-family: 'Raleway', sans-serif;
  padding: 8px 12px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border: solid 0.5px rgba(146, 145, 145, 0.8);
  border-right: none;
  font-size: 16px;
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

const Search = () => {
  const submitButtonRef = useRef("submitButton");
  const [searchText, setSearchText] = useState('');
  
  const searchBusiness = () => {
    console.log('search');
    console.log(searchText);
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
        placeholder="Buscar emprendimientos por nombre o productos"
        onChange={(e) => setSearchText(e.currentTarget.value)}
      />
      <IconButton onClick={searchBusiness} id="submitButton" ref={submitButtonRef}>
        <Icon type="white-magnifying-glass" className="magnifying-glass-button" />
      </IconButton>
    </Container>
  )
}


export default Search;