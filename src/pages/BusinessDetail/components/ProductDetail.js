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

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Subtitle = styled.h2`
  color: ${colors.textColor};
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 0;
  margin-top: 20px;
`;

const Text = styled.p`
  font-size: 18px;
  color: ${colors.textColor};
  margin: 0;

  ${props => props.info && css `
    color: ${colors.primary};
  `}
`;

const ImagesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0 12px -8px;

  @media (max-width: 768px) {
    width: 100%;
    overflow: scroll;
    justify-content: flex-start;
  }
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
  margin: 12px 0;

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

const Group = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProductDetail = ({ product }) => {
  const { name, description, productionTime, immediateDelivery, props, basePrice } = product;
  const images = product.images.map(image => image.image);

  const [orderDetail, setOrderDetail] = useState('');
  const [chosenProps, setChosenProps] = useState({});
  const [totalPrice, setTotalPrice] = useState(basePrice);

  const { setOrder, isUserBusiness, setProductModalInfo } = useContext(OrderContext);

  const persistChosenProps = (value, name) => {
    const props = { ...chosenProps };
    const chosenValues = value.split('-').map((word) => word.trim().replace("$", ""))
    
    props[name] = {
      price: parseFloat(chosenValues[1]) || 0,
      description: chosenValues[0],
    };

    const extraPrice = Object.keys(props).length === 1 ? props[Object.keys(props)[0]].price : Object.keys(props)
    .reduce((prevValue, currValue) => props[prevValue].price + props[currValue].price);

    const newTotalPrice = basePrice + extraPrice;

    setTotalPrice(newTotalPrice);
    setChosenProps(props);
  }

  const setOrderData = () => {
    const props = Object.keys(chosenProps).map(key => {
      const aux = {
        name: key,
        chosenOption: chosenProps[key].description,
        price: chosenProps[key].price,
      };
      return aux;
    });

    const orderObj = {
      product,
      productSnapshot: {
        productName: name,
        chosenProps: props,
        images,
      },
      totalPrice,
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
      {description && <Text key="descriptionText">{description}</Text>}
      {!immediateDelivery && <Tag info><TagLabel>{`${productionTime} días de elaboración`}</TagLabel></Tag>}
      {immediateDelivery && <Tag success><TagLabel>Entrega inmediata</TagLabel></Tag>}
      <Text>Precio base ${basePrice}</Text>
      <Subtitle>Características</Subtitle>
      <PropertiesContainer>
        {props.map(prop => (
          <DropdownContainer key={`${prop.name}Dropdown`} >
            <Dropdown
              options={prop.options.map(opt => opt.price > 0 ? `${opt.description} - $${opt.price}` : opt.description )}
              label={prop.name}
              placeholder="Elegí una opción"
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
      <Group>
        <Text>Total ${totalPrice}</Text>
        {!isUserBusiness && <Button primary onClick={() => setOrderData()}>Pedir este producto</Button>}
      </Group>
    </Container>
  );
}

export default ProductDetail;
