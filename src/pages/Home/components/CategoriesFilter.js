
import React from 'react';
import styled, { css }  from 'styled-components';

import { colors, categories } from '../../../styles/palette';

const Container = styled.div`
  display: flex;
  width: 100%;
  margin: 10px 0  20px;
  justify-content: center;
  flex-wrap: wrap;
`;

const CategoryButton = styled.button`
  display: flex;
  align-items: center;
  padding: 6px 10px;
  margin: 0 4px 8px;
  border-radius: 20px;
  font-family: 'Raleway';
  font-weight: 600;
  transition: box-shadow ease-in 0.3s;
  border: solid 2px transparent;

  ${props => props.categoryName && css`
    background-color: ${categories[props.categoryName].hover};
    color: ${categories[props.categoryName].primary};
  `}

  ${props => props.clicked && css`
    background-color: ${categories[props.categoryName].primary};
    color: ${colors.white};
  `}

  &:hover {
    cursor: pointer;
    box-shadow: 0 8px 16px 0 rgb(0 0 0 / 20%);
  }
`;


const CategoriesFilter = ({categories: categoriesList, onCategoryClicked }) => {
  return (
    <Container>
      {categoriesList.map((category, idx) => (
        <CategoryButton
          key={category.name}
          clicked={category.clicked}
          categoryName={category.name}
          onClick={() => onCategoryClicked(category)}
        >
          {category.name}
        </CategoryButton>
      ))}
    </Container>
  )
};


export default CategoriesFilter;