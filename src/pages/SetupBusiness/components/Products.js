import React from 'react';
import styled from 'styled-components'

import Subtitle from '../../../components/Subtitle';

import NewProduct from './NewProduct';
import ProductCard from './ProductCard';

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

const ProductsCard = ({ products }) => {
  const properties = {
    Color: ['Azul', 'Rojo', 'Amarillo'],
    Sabor: ['Limón', 'Chocolate', 'Vainilla'], 
  };
  return (
    <Container>
      <Subtitle>Productos</Subtitle>
      <Card>
        <ProductCard
          name="Producto Ejemplo"
          description="esta es la descripcion"
          properties={properties}
        />
        <NewProduct />
      </Card>
    </Container>
  );
}

export default ProductsCard;
