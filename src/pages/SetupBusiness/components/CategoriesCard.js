import React from 'react';
import styled from 'styled-components'

import Subtitle from '../../../components/Subtitle';
import Checkbox from '../../../components/Checkbox';

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
  width: 50%;
  margin-right: 8%;
`;

const Text = styled.span`
    color: rgba(0,0,0,0.4);
    font-size: 14px;
`;

const CategoriesCard = ({ categories, onClick }) => {
  const possibleCategories = ['Belleza', 'Artesanal', 'Cocina', 'Servicios', 'Herramientas', 'Deco'];
  return (
    <Container>
      <Subtitle>Categorías</Subtitle>
      <Card>
        <Text>Elegí las categorías que apliquen a tu emprendimiento</Text>
        {possibleCategories.map( category => 
          <Checkbox
            key={`${category}-checkbox`}
            id={category}
            label={category}
            checked={categories.includes(category)}
            onClick={() => onClick(category)}
          />
        )}
      </Card>
    </Container>
  );
}

export default CategoriesCard;
