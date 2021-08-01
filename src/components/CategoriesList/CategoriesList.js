import React from 'react';
import styled, { css } from 'styled-components'

import { categories } from '../../styles/palette';

const Container = styled.div `
  display: flex;
  flex-wrap: wrap;
`;

const CategoryTag = styled.div`
  padding: 4px 6px;
  margin: 8px 4px 0 0;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;

  ${props => props.color && css `
    background-color: ${props.color};
    color: #fff;
  `}
`;


const CategoriesList = ({ categories: categoriesList }) => {
  if (!categoriesList.length) return null; // Con esto no fallamos si categories viene vacío
  
  return (
    <Container>
      {categoriesList.map((category) => 
        <CategoryTag key={`${category}-tag`} className="category-tag" color={categories[category].primary}>
          {category}
        </CategoryTag>
      )}
    </Container>
  );
}

export default CategoriesList;
