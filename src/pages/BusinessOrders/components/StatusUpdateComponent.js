import React, { useState } from "react";

import styled, { css } from "styled-components";

import Subtitle from "../../../components/Subtitle";
import Dropdown from "../../../components/Dropdown";
import Button from "../../../components/Button";

import { buildPossibleStatusForOrder } from "../utils";
import { colors } from "../../../styles/palette";
import OrderStatusEvolution from "../../../components/OrderStatusEvolution";

const ModalContent = styled.div`
  padding: 12px 0 40px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const Text = styled.div`
  color: ${colors.textColor};
  font-size: 16px;
  margin: 24px 0;

  ${props => props.item && css `
    font-weight: 500;
    margin: 0;
  `}

  ${props => props.address && css `
    font-weight: 500;
    font-size: 14px;
    line-height: 1.25;
    margin: 12px 0;
  `}
`;

const DeliveryPointsList = styled.div`
  
`;

const AddressItem = styled.div`
  display: flex;
  align-items: center;
  border-bottom: solid 1px ${colors.grayBorder};
  padding: 12px 0;
`;

const RadioButton = styled.div`
  height: 14px;
  width: 14px;
  border-radius: 100%;
  border: solid 1px ${colors.grayBorder};
  margin-right: 16px;

  &:hover {
    cursor: pointer;
  }

  ${props => props.selected && css `
    background-color: ${colors.primary};
  `}
`;

const ShipmentBox = styled.div`
  padding: 8px 20px;
  border-radius: 6px;
  border: solid 1px ${colors.lightGray};
`;

const StatusUpdateComponent = ({ order, handleCancel, handleAccept, deliveryPoints }) => {
  const [selectedStatus, updateSelectedStatus] = useState('');
  const [selectedAddressIdx, setSelectedAddressIdx] = useState(deliveryPoints.length === 1 ? 0 : -1);

  const onAcceptClick = () => {
    let deliveryPointId = deliveryPoints[selectedAddressIdx]?.id; 
    
    if (selectedStatus === 'LISTO PARA ENTREGAR' && order.userDeliveryPoint && order.entrepreneurship.doesShipments) {
      deliveryPointId = order.userDeliveryPoint.id;
    }

    handleAccept(selectedStatus.replaceAll(' ', '_'), deliveryPointId);
  }

  return (
    <ModalContent>
      <Subtitle fontSize="24px">Actualizar estado del pedido Nº {order.id}</Subtitle>
      <Text>Recibiste el pedido el <strong>{order.createDate}</strong></Text>
      <OrderStatusEvolution orderTrackingData={order.orderTrackingData} />
      <Dropdown
        label="Próximo estado"
        placeholder="Elegí el próximo estado"
        options={buildPossibleStatusForOrder(order)}
        onClickOption={(status) => updateSelectedStatus(status)}
      />
      {selectedStatus === 'LISTO PARA ENTREGAR' && !!deliveryPoints.length && !order.userDeliveryPoint &&
      <>
      <Text>Elegí la dirección en donde deben retirar el pedido:</Text>
      <DeliveryPointsList>
        { deliveryPoints.map((add, idx) => (
          <AddressItem>
            <RadioButton selected={selectedAddressIdx === idx} onClick={() => setSelectedAddressIdx(idx)} />
            <Text item>{add.address.street} {add.address.number}, {add.address.department} {add.address.state}</Text>
          </AddressItem>
        ))}
      </DeliveryPointsList>
      </>
      }
      {selectedStatus === 'LISTO PARA ENTREGAR' && order.userDeliveryPoint && order.entrepreneurship.doesShipments && 
        <ShipmentBox>
          <Text address>Dirección de entrega:</Text>
          <Text address>
            {order.userDeliveryPoint.address.street} {order.userDeliveryPoint.address.number}, {order.userDeliveryPoint.address.department} {order.userDeliveryPoint.address.state}
          </Text>
        </ShipmentBox>
      }      
      <ButtonsContainer>
        <Button
          backgroundColor="transparent"
          color={colors.primary}
          large
          onClick={() => handleCancel()}
        >
          Cancelar
        </Button>
        <Button
          primary
          large
          onClick={()=> onAcceptClick()}
        >
          Aceptar
        </Button>
      </ButtonsContainer>
    </ModalContent>
  );
}

export default StatusUpdateComponent;
