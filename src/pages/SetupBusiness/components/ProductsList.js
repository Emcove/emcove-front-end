import React, { useContext } from 'react';
import styled from 'styled-components'

import Subtitle from '../../../components/Subtitle';

import NewProduct from './NewProduct';
import ProductCard from './ProductCard';

import BusinessContext from '../../../context/Business';

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

const ProductsList = ({ onClickNewProduct }) => {
  const { products } = useContext(BusinessContext);

  return (
    <Container>
      <Subtitle>Productos</Subtitle>
      <Card>
        {products.map((product, index) => 
          <ProductCard
            name={product.name}
            description={product.description}
            properties={product.props}
            images={product.images}
            hasStock={product.hasStock}
            productionTime={product.productionTime}
            index={index}
          />
        )}
        <NewProduct onClickNewProduct={onClickNewProduct} />
      </Card>
    </Container>
  );
}

export default ProductsList;
