
import React from 'react';
import styled, { css }  from 'styled-components';

import { colors } from '../../../styles/palette';

const getFontColor = (bgColor) => {
  return bgColor === colors.yellow ? colors.textColor : colors.white;
}

const Container = styled.div`
  display: flex;
  width: 100%;
  margin: 10px 0  20px;
  justify-content: center;
`;

const CategoryButton = styled.button`
  display: flex;
  align-items: center;
  padding: 6px 10px;
  margin: 0 4px;
  border-radius: 20px;
  font-family: 'Raleway';
  font-weight: 600;
  transition: box-shadow ease-in 0.3s;
  border: solid 2px transparent;

  ${props => props.bgColor && css`
    background-color: ${props.bgColor};
    color: ${getFontColor(props.bgColor)};
  `}

  ${props => props.clicked && css`
    background-color: transparent;
    border: solid 2px ${props.bgColor};
    color: ${props.bgColor === colors.yellow ? props.textColor : props.bgColor};
  `}

  &:hover {
    cursor: pointer;
    box-shadow: 0 8px 16px 0 rgb(0 0 0 / 20%);
  }
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
          clicked={!category.clicked}
          bgColor={getTagBgColor(idx)}
          onClick={() => onCategoryClicked(category)}
        >
          {category.name}
        </CategoryButton>
      ))}
    </Container>
  )
};


export default CategoriesFilter;