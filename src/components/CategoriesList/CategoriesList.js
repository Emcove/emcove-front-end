import React from 'react';
import styled, { css } from 'styled-components'

import { colors } from '../../styles/palette';

const categoriesColors = [colors.primary, colors.success, colors.yellow, colors.warning, colors.error, colors.primary];

const getFontColor = (bgColor) => {
  if (bgColor === colors.yellow) {
    return colors.textColor;
  }

  return colors.white;
}

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
    color: ${getFontColor(props.color)};
  `}
`;


const CategoriesList = ({ categories }) => {
  if (!categories.length) return null; // Con esto no fallamos si categories viene vacío

  return (
    <Container>
      {categories.map((category, index) => 
        <CategoryTag key={`${category}-tag`} className="category-tag" color={categoriesColors[index]}>
          {category}
        </CategoryTag>
      )}
    </Container>
  );
}

export default CategoriesList;
