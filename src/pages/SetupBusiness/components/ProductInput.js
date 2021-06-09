import React, { useState } from 'react';
import styled from 'styled-components'

import ImageUploader from '../../../components/ImageUploader';
import TextInput from '../../../components/TextInput';
import Checkbox from '../../../components/Checkbox';
import Button from '../../../components/Button';
import Icon from '../../../components/Icons';
import Dropdown from '../../../components/Dropdown';
import Link from '../../../components/Link';

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

const ProductionDataContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px 0;
`;

const ProductionTimeContainer = styled.div`
  display: flex;
  align-items: center;
`;

const PropertiesContainer = styled.div`
  width: 100%;
  padding: 12px 0;
`;

const Subtitle = styled.span`
  font-size: 18px;
  font-family: 'Roboto';
  color: ${colors.textColor};
`;

const Label = styled.span`
  font-size: 14px;
  color: ${colors.lightGray};
  margin-right: 8px;
`;

const Properties = styled.div`
  height: 244px;
  max-height: 244px;
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  overflow: scroll;
  border-top: solid 1px #b3aeae3b;
`;

const PropertyData = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
`;

const PropertyGroup = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: flex-start;
`;

const NewProduct = () => {
  const [name, setProductName] = useState('');
  const [image, setProductImage] = useState('');
  const [description, setProductDescription] = useState('');

  const [productionTime, setProductionTime] = useState('');
  const [stockCheckbox, setStockCheckbox] = useState(true);

  const [newProperty, setNewProperty] = useState({ name: '', values: '' });

  const [properties, setProductProperties] = useState([]);

  const [addNew, showAddNewProp] = useState(properties.length === 0);

  const handleNamePropertyChange = (name) => {
    setNewProperty({ ...newProperty, name });
  }

  const handleValuePropertyChange = (values) => {
    setNewProperty({ ...newProperty, values });
  }

  const addNewProperty = () => {
    if ( newProperty.name !== '' && newProperty.values !== '') {
      const newProp = {};
      newProp[newProperty.name] = newProperty.values.replace(/\s/g, '').split(",");

      let existentKey = false;

      const newProperties = properties.map(prop => {
        if(Object.keys(prop)[0] === newProperty.name) {
          prop = newProp;
          existentKey = true;
        }

        return prop;
      });

      if (existentKey) {
        setProductProperties(newProperties);
      } else {
        setProductProperties([ ...newProperties, newProp]);
      }

      setNewProperty({name: '', values: ''});
      showAddNewProp(false);
    }
  }

  const deleteRow = (index) => {
    properties.splice(index, 1);
    setProductProperties();
  }

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
      <Group>
      <ProductionDataContainer>
        <Checkbox
            id="stockCheckbox"
            label="Tengo el producto en stock"
            checked={stockCheckbox}
            onClick={() => setStockCheckbox(!stockCheckbox)}
          />
         {!stockCheckbox && <ProductionTimeContainer>
            <Label>Días de producción:</Label>
            <TextInput
              type="number"
              value={productionTime}
              id="productionTime"
              onChange={setProductionTime}
              className="production-time__input"
            />
          </ProductionTimeContainer>}
      </ProductionDataContainer>
      </Group>
      <PropertiesContainer>
        <Subtitle>Características</Subtitle>
        <Properties>
          { !!properties && properties.map((property, index) => {
            return Object.keys(property).map(objKey => (
              <PropertyData>
                <TextInput 
                  type="text"
                  value={objKey}
                  id={`${objKey}Preview`}
                  label="Característica"
                  disabled
                />
                <TextInput 
                  type="text"
                  value={property[objKey].join(', ')}
                  id={`${objKey}ValuesPreview`}
                  label="Valores"
                  disabled
                />
                <Dropdown
                  label={objKey}
                  placeholder={objKey}
                  options={property[objKey]}
                />
                <Button backgroundColor="transparent" alignment="center" onClick={() => deleteRow(index)}><Icon type="cross" className="delete-row__icon" /></Button>
              </PropertyData>
            ))
          })}
          {addNew && 
            <PropertyData>
              <PropertyGroup>
                <TextInput 
                  type="text"
                  value={newProperty.name}
                  id="propertyName"
                  onChange={handleNamePropertyChange}
                  hint="Color, sabor, aroma, tamaño, talle, etc."
                  placeholder="Nombre"
                  className="new-property__name"
                />
                <TextInput 
                  type="text"
                  value={newProperty.values}
                  id="propertyValues"
                  onChange={handleValuePropertyChange}
                  hint="Valores posibles separados por coma"
                  placeholder="Valores posibles"
                />
              </PropertyGroup>
              <Button backgroundColor={colors.success} onClick={addNewProperty} alignment="flex-start">
                <Icon type="check" className="done-button__icon"/>
              </Button>
            </PropertyData>
          }
          {!addNew && <Link onClick={() => showAddNewProp(true)}>Agregar característica</Link>}
        </Properties>
      </PropertiesContainer>
    </Container> 
  );
}

export default NewProduct;
