import React from 'react';
import styled from 'styled-components'

import Subtitle from '../../../components/Subtitle';
import Checkbox from '../../../components/Checkbox';
import CategoriesList from '../../../components/CategoriesList';

const Card = styled.div`
  padding: 20px;
  margin-bottom: 8px;
  border-radius: 4px;
  background-color: #fff;
  transition: box-shadow 0.2s ease-in-out;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 12%);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  margin-right: 8%;
`;

const ChecksContainer = styled.div`
  margin-bottom: 12px;
`;

const Text = styled.p`
  color: rgba(0,0,0,0.4);
  font-size: 14px;
  font-weight: 500;
`;

const CategoriesPlaceholder = styled.div`
  height: 32px;
`;

const CategoriesCard = ({ categories, onClick }) => {
  const possibleCategories = ['Belleza', 'Artesanal', 'Cocina', 'Servicios', 'Herramientas', 'Deco'];
  return (
    <Container>
      <Subtitle>Categorías</Subtitle>
      <Card>
        <Text>Elegí las categorías que apliquen a tu emprendimiento</Text>
        <ChecksContainer>
          {possibleCategories.map( category => 
            <Checkbox
              key={`${category}-checkbox`}
              id={category}
              label={category}
              checked={categories.includes(category)}
              onClick={() => onClick(category)}
              className="setup-business__category-checkbox"
            />
          )}
        </ChecksContainer>
        {!categories.length && <CategoriesPlaceholder/>}
        {categories && <CategoriesList categories={categories} />}
      </Card>
    </Container>
  );
}

export default CategoriesCard;
