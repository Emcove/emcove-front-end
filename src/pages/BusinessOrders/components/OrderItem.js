import React, { useState } from "react";

import styled, { css } from "styled-components";

import { useHistory } from "react-router-dom";

import Button from "../../../components/Button";
import Card from "../../../components/Card";
import Icon from "../../../components/Icons";

import { colors } from "../../../styles/palette";

const SingleOrder = styled.div`
  margin-bottom: 12px;
`;

const ProductImageContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin-right: 12px;
`;

const ProductImage = styled.img`
  height: 100%;
  width: fit-content;
  display: inline;
  font-size: 12px;
`;

const OrderData = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

const Buyer = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.textColor};
  margin: 0;
`;

const OrderDate = styled.span`
  font-size: 12px;
  color: ${colors.textColor};
  margin-bottom: 4px;
`;

const Product = styled.p`
  font-size: 16px;
  color: ${colors.textColor};
  margin: 4px 0;
`;

const PropertiesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ProductProps = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.lightGray};
  margin: 4px 4px 4px 4px;
`;

const OrderStatus = styled.div`
  display: flex;
  align-items: center;
  width: 15%;
`;

const Status = styled.p`
  font-size: 16px;
  font-weight: 600;
  text-align: right;
  

  ${props => props.type === "Pendiente" && css`
    color: ${colors.warning};
  `}

  ${props => props.type === "Rechazado" && css`
    color: ${colors.error};
  `}
  
  ${props => props.type === "Cancelado" && css`
    color: ${colors.error};
  `}

  ${props => props.type === "Aprobado" && css`
    color: ${colors.success};
  `}
  
  ${props => props.type === "En progreso" && css`
    color: ${colors.success};
  `}
  
  ${props => props.type === "Finalizado" && css`
    color: ${colors.primary};
  `}
`;

const MoreOptions = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Options = styled.div`
  position: absolute;
  left: 22px;
  top: 12px;
  display: flex;
  flex-direction: column;
  border: solid 0.5px ${colors.grayBorder};
  background-color: ${colors.white};
  border-radius: 3px;
  transition: box-shadow 0.2s ease-in-out;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 4%);
`;

const OrderOption = styled.div`
  padding: 12px 8px;
  font-size: 14px;
  font-weight: 600;
  color: ${colors.primary};

  &:hover {
    cursor: pointer;
    background-color: ${colors.primaryHover};
  }
`;

const OrderItem = ({ order, openEvaluationModal }) => {
  const history = useHistory();
  const [options, showOptions] = useState(false);

  return (
    <SingleOrder key={order.id}>
      <Card alignment="flex-start">
        <ProductImageContainer>
          <ProductImage
            src={""}
            alt="product image"
          />
        </ProductImageContainer>
        <OrderData>
          <OrderDate>{order.sendDate}</OrderDate>
          <Buyer>{order.user.name} {order.user.surname}</Buyer>
          <Product>{order.product.name}</Product>
          <PropertiesContainer>
            {order.product.properties.map(prop => 
              <ProductProps>{prop.name}: {prop.value}</ProductProps>
            )}
          </PropertiesContainer>
        </OrderData>
        <>
        <OrderStatus>
          <Status type={order.status[order.status.length - 1].name}>{order.status[order.status.length - 1].name}</Status>
          <MoreOptions>
            <Button backgroundColor="transparent" onClick={() => showOptions(!options)}>
              <Icon className="orders__more-options--icon" type="more-options"/>
            </Button>
            {options &&
              <Options>
                {order.status[order.status.length - 1].name === 'Pendiente' &&
                  <OrderOption onClick={() => history.push(`/reputation?from=businessOrders&user=${order.user.username}`)}>
                    Ver reputación de usuario
                  </OrderOption>}
                {order.status[order.status.length - 1].name !== 'Finalizado' &&
                  <OrderOption>Actualizar estado</OrderOption>}
                {order.status[order.status.length - 1].name === 'Finalizado' &&
                  <OrderOption onClick={() => openEvaluationModal(order.business.id)}>Calificar comprador</OrderOption>
                }
              </Options>
            }
          </MoreOptions>
        </OrderStatus>
        </>
      </Card>
    </SingleOrder>
  );
}

export default OrderItem;
