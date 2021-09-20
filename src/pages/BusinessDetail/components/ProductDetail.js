import React, { useContext, useState } from "react";
import styled, { css } from "styled-components";

import Title from "../../../components/Title";
import Dropdown from "../../../components/Dropdown";
import TextInput from "../../../components/TextInput";

import { colors } from "../../../styles/palette";
import OrderContext from "../../../context/Order";
import Button from "../../../components/Button";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 32px;
`;

const Subtitle = styled.h2`
  color: ${colors.textColor};
  font-size: 18px;
  font-weight: 500;
`;

const Text = styled.p`
  font-size: 18px;
  color: ${colors.textColor};

  ${props => props.info && css `
    color: ${colors.primary};
  `}
`;

const ImagesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-left: -8px;
`;

const ImageContainer = styled.div`
  display: flex;
  position: relative;
  overflow: hidden;
  border: solid 1px #b3aeae14;
  background-color: #fff;
  min-width: 200px;
  max-width: 200px;
  height: 180px;
  border-radius: 3px;
  margin: 0 8px;
  justify-content: center;
`;

const Image = styled.img`
  height: 100%;
  max-width: 100%;
  width: auto;
  display: inline;
`;

const Tag = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  padding: 6px;
  border-radius: 10px;
  
  ${props => props.success && css `
    background-color: ${colors.success};
  `}

  ${props => props.info && css `
    background-color: ${colors.primary};
  `}
`;

const TagLabel = styled.span`
  font-weight: 600;
  font-size: 14px;
  color: ${colors.white};
`;

const PropertiesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-left: -17px;
`;

const DropdownContainer = styled.div`
  margin: 16px;
`;

const ProductDetail = ({ product }) => {
  const { name, description, productionTime, hasStock, props } = product;
  const images = product.images.map(image => image.image);

  const [orderDetail, setOrderDetail] = useState('');
  const [chosenProps, setChosenProps] = useState([]);

  const { setOrder, isUserBusiness, setProductModalInfo } = useContext(OrderContext);

  const persistChosenProps = (value, name) => {
    let props = [ ...chosenProps ];
    const newProp = props.find(prop => prop.name === name);

    if (newProp) {
      const index = props.findIndex((prop, index) => {
        if (prop.name === name) return index;

        return -1;
      });
      newProp.chosenOption = value;

      props.splice((index - 1), 1, newProp);
    } else {
      props = [ ...props, { name, chosenOption: value }]
    }

    setChosenProps(props);
  }

  const setOrderData = () => {
    const orderObj = {
      product,
      productSnapshot: {
        productName: name,
        chosenProps,
        images,
      },
      details: orderDetail, 
    };

    setOrder(orderObj);
    setProductModalInfo({ visible: false });
  }

  return (
    <Container>
      <Title>{name}</Title>
      {!!images.length && (
        <ImagesContainer>
          {images.map((image, idx) => (
            <ImageContainer key={`${name}Image${idx}`}>
              <Image
                src={image}
                alt="viewProduct"
              />
            </ImageContainer>
          ))}
        </ImagesContainer>
      )}
      <Text key="descriptionText">{description}</Text>
      {!hasStock && <Tag info><TagLabel>{`${productionTime} días de elaboración`}</TagLabel></Tag>}
      {hasStock && <Tag success><TagLabel>Entrega inmediata</TagLabel></Tag>}
      <Subtitle>Características</Subtitle>
      <PropertiesContainer>
        {props.map(prop => (
          <DropdownContainer key={`${prop.name}Dropdown`} >
            <Dropdown
              options={prop.options.map(opt => opt.price > 0 ? `${opt.description} - $${opt.price}` : opt.description )}
              label={prop.name}
              placeholder="Seleccioná una opción"
              onClickOption={persistChosenProps}
            />
          </DropdownContainer>
        ))}
      </PropertiesContainer>
      {!isUserBusiness &&
        <TextInput
          id="order-details"
          label="Observaciones"
          placeholder="Agregá cualquier aclaración que consideres necesaria"
          type="text"
          value={orderDetail}
          onChange={setOrderDetail}
          full
          multiline
        />}
      {!isUserBusiness && <Button primary onClick={() => setOrderData()}>Pedir este producto</Button>}
    </Container>
  );
}

export default ProductDetail;
