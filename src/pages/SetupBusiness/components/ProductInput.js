import React, { useState, useRef, useContext } from 'react';
import styled, { css } from 'styled-components'

import TextInput from '../../../components/TextInput';
import Checkbox from '../../../components/Checkbox';
import Button from '../../../components/Button';
import Icon from '../../../components/Icons';
import Dropdown from '../../../components/Dropdown';
import Link from '../../../components/Link';

import { colors } from '../../../styles/palette';

import BusinessContext from '../../../context/Business';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  margin-bottom: 20px; 
  width: 100%;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: solid 1px ${colors.grayBorder};
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ProductionDataContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 6px 0;
`;

const ProductionTimeContainer = styled.div`
  display: flex;
  align-items: center;
`;

const PropertiesContainer = styled.div`
  width: 100%;
  border-bottom: solid 1px #b3aeae3b;
`;

const Subtitle = styled.p`
  font-size: 18px;
  font-family: 'Raleway', sans-serif;
  color: ${colors.textColor};
`;

const Label = styled.p`
  font-size: 14px;
  color: ${colors.lightGray};
  margin-right: 8px;
`;

const Properties = styled.div`
  max-height: 180px;
  height: 180px;
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
  padding-top: 12px;
`;

const PropertyGroup = styled.div`
  display: flex;
  width: 50%;
  align-items: flex-start;
  justify-content: flex-start;

  ${props => props.alignment && css `
    justify-content: ${props.alignment};
  `}

  ${props => props.width && css `
    width: ${props.width};
  `}
`;

const PreviewImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; 
  position: relative;
  overflow: hidden;
  margin: 0 6px 6px;
  width: 100px;
  height: 80px;
  border: solid 1px ${colors.grayBorder};
  color: ${colors.textColor};
  border-radius: 3px;
  transition: box-shadow .08s linear,min-width .15s cubic-bezier(0.4,0.0,0.2,1);
  
  &:hover {
    cursor: pointer;
    box-shadow:  0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%);
  }
`;

const Preview = styled.img`
  height: 100%;
  width: auto;
  display: inline;
`;

const ImagesContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const MultiFilesInput = styled.input`
  visibility: hidden;
  width: 0;
  height: 0;
`;

const AddImageButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px;
  margin-bottom: 8px;
  margin-right: 6px;
  width: 100px;
  height: 80px;
  border: solid 1px #b3aeae82;
  border-radius: 3px;
  background-color: transparent;
  transition: box-shadow .08s linear,min-width .15s cubic-bezier(0.4,0.0,0.2,1);
  font-size: 10px;
  color: ${colors.textColor};
  font-family: 'Raleway', sans-serif;
  
  &:hover {
    cursor: pointer;
    box-shadow:  0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%);
  }
`;

const NewImageGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const DeleteImageButton = styled.button`
  position: absolute;
  display: flex !important;
  align-items: center;
  justify-content: center;
  top: 4px;
  right: 4px;
  width: 14px;
  height: 14px;
  border: none;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 100%;
  color: #fff;

  &:hover {
    cursor: pointer;
  }
`;

const NewProduct = () => {
  const imagesUploaderRef = useRef('multipleUploader');
  const { addNewProduct } = useContext(BusinessContext);

  const [name, setProductName] = useState('');
  const [description, setProductDescription] = useState('');
  const [basePrice, setBasePrice] = useState('');
  
  const [productImages, setProductImages] = useState([]);
  const [showAddNewImage, setShowAddImage] = useState(productImages.length < 4);

  const [productionTime, setProductionTime] = useState('');
  const [stockCheckbox, setStockCheckbox] = useState(true);

  const [newProperty, setNewProperty] = useState({ name: '', options: { descriptions: '', prices: '' } });

  const [properties, setProductProperties] = useState([]);

  const [addNew, showAddNewProp] = useState(properties.length === 0);


  const handleNamePropertyChange = (name) => {
    setNewProperty({ ...newProperty, name });
  }

  const handleValuePropertyChange = (values) => {
    setNewProperty({ ...newProperty, options: { ...newProperty.options, descriptions: values } });
  }

  const handlePricePropertyChange = (values) => {
    setNewProperty({ ...newProperty, options: { ...newProperty.options, prices: values } });
  }

  const addNewProperty = () => {
    if ( newProperty.name !== '' && newProperty.options !== '') {
      const options = newProperty.options.descriptions.replace(/\s/g, '').split(",");
      const prices = newProperty.options.prices.replace(/\s/g, '').split(",");

      const newProp = { name: newProperty.name };
      newProp.options = options.map((option, idx) => {
        const obj = {
          description: option,
          price: parseFloat(prices[idx]) || 0.0,
        };

        return obj;
      });

      let existentKey = false;

      // Esta lógica es para evitar que agreguen características con el mismo nombre,
      // si lo hacen, se acumulan los valores con la propiedad anterior
      const newProperties = properties.map(prop => {
        if (prop.name === newProperty.name) {
          prop.options = [ ...prop.options, ...newProp.options ];
          existentKey = true;
        }

        return prop;
      });

      if (existentKey) {
        setProductProperties(newProperties);
      } else {
        setProductProperties([ ...newProperties, newProp]);
      }
  
      setNewProperty({ name: '', options: { descriptions: '', prices: '' } });
      showAddNewProp(false);
    }
  }

  const deleteRow = (index) => {
    setProductProperties(prevState => {
      let auxProps = [...prevState];
      auxProps.splice(index, 1);

      if (auxProps.length === 0) showAddNewProp(true);
      return auxProps;
    });
  }

  const handleAddClick = (e) => {
    e.preventDefault();
    const input = imagesUploaderRef.current;

    if (input) {
      input.click();
    }
  }

  const handleImagesInput = (event) => {
    const file = event.currentTarget.files[0];
    var reader = new FileReader();  
    reader.onload = () => {
      setProductImages(prevState => {
        const images = [ reader.result, ...prevState];

        // Seteo cantidad máxima de 4 imágenes
        if (images.length === 4) setShowAddImage(false);
        return images;
      });
    }
    
    reader.readAsDataURL(file);
  }

  const deleteImage = (index) => {
    setProductImages(prevState => {
      let images = [...prevState];
      images.splice(index, 1);

      if (images.length < 4 ) setShowAddImage(true);
      return images;
    });
  }

  const createProduct = () => {
    const product = {
      name,
      description,
      images: productImages,
      immediateDelivery: stockCheckbox,
      newProduct: true,
      productionTime,
      props: properties,
      basePrice,
    };

    addNewProduct(product);
  }

  return (
    <Container>
      <Group>
        <ImagesContainer>
          {showAddNewImage && 
          <NewImageGroup>
            <AddImageButton onClick={(e) =>handleAddClick(e)}>
              <Icon type="add" className="add-icon" />
              Agregar imagen
            </AddImageButton>
            <MultiFilesInput
              type="file"
              accept="image/*"
              id="multipleUploader"
              data-required={false}
              onChange={(e) => handleImagesInput(e)}
              ref={imagesUploaderRef}
            />
          </NewImageGroup>
          }
          {productImages.length > 0 && productImages.map((image, idx) => 
            <PreviewImgContainer key={`image-preview-${idx}`}>
              <DeleteImageButton onClick={() => deleteImage(idx)}><Icon type="white-cross" className="delete-image__icon" /></DeleteImageButton>
              <Preview id={`productImage${idx}`} alt={`${idx}product`} src={image} />
            </PreviewImgContainer>
          )}
        </ImagesContainer>
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
          <PropertyGroup width="25%">
            <TextInput
              type="text"
              value={basePrice}
              label="Precio base"
              placeholder="Precio base"
              id="productDescription"
              onChange={setBasePrice}
            />
          </PropertyGroup>
        </InputContainer>
      </Group>
      <Group>
      <ProductionDataContainer>
        <Checkbox
            id="stockCheckbox"
            label="Entrega inmediata"
            checked={stockCheckbox}
            onClick={() => setStockCheckbox(!stockCheckbox)}
          />
         <ProductionTimeContainer>
            <Label>Días de producción:</Label>
            <TextInput
              type="number"
              value={productionTime}
              id="productionTime"
              onChange={setProductionTime}
              className="production-time__input"
            />
          </ProductionTimeContainer>
      </ProductionDataContainer>
      </Group>
      <PropertiesContainer>
        <Subtitle>Características</Subtitle>
        <Properties>
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
                value={newProperty.options.descriptions}
                id="propertyValues"
                onChange={handleValuePropertyChange}
                hint="Valores posibles separados por coma"
                placeholder="Valores posibles"
              />
              <TextInput 
                type="text"
                value={newProperty.options.prices}
                id="propertyPrice"
                onChange={handlePricePropertyChange}
                hint="Separados por coma usá el punto para centavos (10.50)"
                placeholder="Precios"
              />
            </PropertyGroup>
            <Button backgroundColor={colors.success} onClick={addNewProperty} alignment="flex-start">
              <Icon type="check" className="done-button__icon"/>
            </Button>
          </PropertyData>
          }
          {!addNew && <Link onClick={() => showAddNewProp(true)} className="add-prop__button">+ Nueva característica</Link>}
          {!!properties && properties.map((property, index) => (
              <PropertyData key={property.name}>
                <PropertyGroup>
                  <TextInput 
                    type="text"
                    value={property.name}
                    id={`${property.name}Preview`}
                    label="Característica"
                    disabled
                  />
                  <TextInput 
                    type="text"
                    value={property.options.map(option => option.description).join(', ')}
                    id={`${property.name}ValuesPreview`}
                    label="Valores"
                    disabled
                  />
                </PropertyGroup>
                <PropertyGroup alignment="flex-end">
                  <Dropdown
                    label={property.name}
                    options={property.options.map(option => `${option.description} - $${option.price}`)}
                  />
                  <Button
                    backgroundColor="transparent"
                    alignment="center"
                    onClick={() => deleteRow(index)}
                  >
                      <Icon type="cross" className="delete-row__icon" />
                  </Button>
                </PropertyGroup>
              </PropertyData>
          ))}
        </Properties>
      </PropertiesContainer>
      <Button primary onClick={createProduct} style={{"width": "25%", "alignSelf": "center", "marginTop": "20px" }}>Aceptar</Button>
    </Container>
  );
}

export default NewProduct;
