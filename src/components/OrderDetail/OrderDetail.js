
import React from 'react';
import styled, { css } from 'styled-components';

import { colors } from '../../styles/palette';

import OrderStatusEvolution from '../OrderStatusEvolution';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
  width: 100%;
`;

const Group = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${props => props.flexStart && css `
    justify-content: flex-start;
  `}
`;

const OrderTitle = styled.h1`
  font-size: 24px;
  margin: 0 0 4px;
  color: ${colors.textColor};
`;

const OrderSubtitle = styled.h2`
  font-size: 20px;
  margin: 0 0 20px;
  color: ${colors.textColor};
`;

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${colors.grayBorder};
  margin: 16px 0 20px;
`;

const Text = styled.span`
  font-size: 14px;
  color: ${colors.textColor};
  margin: 4px 0 4px;

  ${props => props.bold && css `
    font-weight: 600;
  `}

  ${props => props.important && css `
    font-size: 20px;
  `}
`;

const PropsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PropText = styled.span`
  font-size: 16px;
  color: ${colors.textColor};
  margin: 6px 0;
`;

const ImagesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0 20px -8px;
`;

const ImageContainer = styled.div`
  display: flex;
  position: relative;
  overflow: hidden;
  border: solid 1px #b3aeae14;
  background-color: #fff;
  min-width: 100px;
  max-width: 100px;
  height: 80px;
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

const InfoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: ${colors.white};
  background-color: ${colors.primary};
  padding: 4px;
  width: 14px;
  border-radius: 100%;
  font-size: 11px;
  margin-right: 12px;
`;

const OrderDetail = ({ order, buyerView = false }) => {
  const {
    id,
    product,
    createDate,
    updateDate,
    currentState,
    details,
    totalPrice,
    productSnapshot,
    user,
    entrepreneurship,
    userDeliveryPoint,
    entrepreneurshipDeliveryPoint,
  } = order;

  const images = product.images.map(image => image.image);
  console.log(order);
  return (
    <Container>
      <OrderTitle>Pedido {id} - {product.name}</OrderTitle>
      {!buyerView && <OrderSubtitle>Hecho por {user.name} {user.surname}</OrderSubtitle>}
      {buyerView && <OrderSubtitle>Pedido para {entrepreneurship.name}</OrderSubtitle>}
      <Text>{buyerView ? "Enviado" : "Recibido"} el {createDate}</Text>
      <Text>Última actualización <strong>{updateDate}</strong> a <strong>{currentState.replaceAll('_', ' ')}</strong></Text>
      {buyerView && entrepreneurshipDeliveryPoint && currentState === "LISTO_PARA_ENTREGAR" && (!entrepreneurship.doesShipments || (entrepreneurship.doesShipments && !userDeliveryPoint)) &&
        <Group flexStart>
          <InfoIcon>!</InfoIcon>
          <PropText>Retirar en <strong>{entrepreneurshipDeliveryPoint.address.street} {entrepreneurshipDeliveryPoint.address.number}, {entrepreneurshipDeliveryPoint.address.department} {entrepreneurshipDeliveryPoint.address.state}</strong></PropText>
        </Group>
      }
      { buyerView &&
        <>
          <Separator />
          <OrderStatusEvolution orderTrackingData={order.orderTrackingData} />
        </>
      }
      { !buyerView && entrepreneurship.doesShipments && userDeliveryPoint &&
        <Group flexStart>
          <InfoIcon>!</InfoIcon>
          <PropText>A entregar en <strong>{userDeliveryPoint.address.street} {userDeliveryPoint.address.number}, {userDeliveryPoint.address.department} {userDeliveryPoint.address.state}</strong></PropText>
        </Group>
      }
      <Separator />
      <OrderSubtitle>Detalles</OrderSubtitle>
      {buyerView && !!images.length && (
        <ImagesContainer>
          {images.map((image, idx) => (
            <ImageContainer key={`${product.name}Image${idx}`}>
              <Image
                src={image}
                alt="viewProduct"
              />
            </ImageContainer>
          ))}
        </ImagesContainer>
      )}
      <PropsContainer>
        {productSnapshot.chosenProps.map(prop => <PropText key={`${prop.name}-${prop.chosenOption}`}>{prop.name}: <strong>{prop.chosenOption}</strong></PropText>)}
        <PropText key="order-details">Aclaraciones: <strong>{details ? details : "Sin aclaraciones"}</strong></PropText>
      </PropsContainer>
      {totalPrice &&
      <>
        <Separator />
        <Group>
          <Text important>Precio total:</Text>
          <Text bold important>${totalPrice}</Text>
        </Group>
      </>
      }
    </Container>
);
}


export default OrderDetail;
