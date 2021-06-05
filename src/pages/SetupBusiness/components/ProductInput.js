import React, { useState } from 'react';
import styled from 'styled-components'

import ImageUploader from '../../../components/ImageUploader';
import TextInput from '../../../components/TextInput';
import Dropdown from '../../../components/Dropdown';

import { colors } from '../../../styles/palette';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  margin-bottom: 20px; 
  width: 100%;
`;

const Group = styled.div`
  display: flex;
  width: 100%;
  border-bottom: solid 1px ${colors.grayBorder};
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 20px;
`;

const PropertiesContainer = styled.div`
  width: 100%;
  padding: 12px 0;
`;

const Label = styled.span`
  font-size: 18px;
  font-family: 'Roboto';
  color: ${colors.textColor};
`;

const Properties = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: solid 1px ${colors.grayBorder};
`;

const Property = styled.div``;

const NewProduct = () => {
  const [name, setProductName] = useState('');
  const [image, setProductImage] = useState('');
  const [description, setProductDescription] = useState('');
  const [properties, setProductProperties] = useState([]);
  
  return (
    <Container>
      <Group>
        <ImageUploader
          id="productImage"
          shape="squared"
          iconClass="new-product__icon"
          label="Subir imagen"
          image={image}
          onChange={setProductImage}
        />
        <InputContainer>
          <TextInput
            type="text"
            value={name}
            label="Nombre del producto"
            placeholder="Nombre del producto"
            id="productName"
            onChange={setProductName}
          />
          <TextInput
            type="text"
            value={description}
            label="Descripción del producto"
            placeholder="Descripción del producto"
            id="productDescription"
            onChange={setProductDescription}
            multiline
          />
        </InputContainer>
      </Group>
      <PropertiesContainer>
        <Label>Características</Label>
        <Properties>
          {/* Agregar boton de add more properties y el mostrado de las propiedades */}
        </Properties>
      </PropertiesContainer>
    </Container>
  );
}

export default NewProduct;
