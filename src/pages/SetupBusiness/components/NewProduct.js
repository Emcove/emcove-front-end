import React from 'react';
import styled from 'styled-components'

import Icon from '../../../components/Icons';

const Container = styled.div`
  display: flex;
  width: 100%;
  border-radius: 3px;
  align-items: center;
`;

const CreateProduct = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 80px;
  border: solid 1px #b3aeae82;
  border-radius: 3px;
  background-color: transparent;
  transition: box-shadow .08s linear,min-width .15s cubic-bezier(0.4,0.0,0.2,1);
  &:hover {
    cursor: pointer;
    box-shadow:  0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%);
  }
`;

const Text = styled.span`
  margin-left: 16px;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.4);
`;

const NewProduct = ({ onClickNewProduct }) => (
  <Container>
    <CreateProduct onClick={() => onClickNewProduct()}>
      <Icon type="add" className="add-icon" />
    </CreateProduct>
    <Text>Agregar producto</Text>
  </Container>
);

export default NewProduct;
