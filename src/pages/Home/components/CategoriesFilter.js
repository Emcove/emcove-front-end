
import React from 'react';
import styled, { css }  from 'styled-components';

import { colors } from '../../../styles/palette';

const Container = styled.div`
  display: flex;
  width: 100%;
  margin: 10px 0  20px;
  justify-content: center;
`;

const CategoryButton = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  margin: 0 4px;
  border: none;
  border-radius: 20px;
  font-family: 'Raleway';
  font-weight: 600;

  ${props => props.bgColor && css`
    background-color: ${props.bgColor};
    color: ${props.bgColor === colors.yellow ? colors.textColor : colors.white};
  `}
`;


const CategoriesFilter = ({categories, onCategoryClicked }) => {
  const getTagBgColor = (index) => {
    const colorsArray = [colors.primary, colors.success, colors.yellow, colors.warning, colors.error];

      if (index < colorsArray.length) return colorsArray[index];
      return colorsArray[index % colorsArray.length];
    }; 

  return (
    <Container>
      {categories.map((category, idx) => (
        <CategoryButton
          key={category.name}
          clicked={categories.clicked}
          bgColor={() => getTagBgColor(idx)}
          onClick={() => onCategoryClicked(category)}
        >
          {category.name}
        </CategoryButton>
      ))}
    </Container>
  )
};


export default CategoriesFilter;