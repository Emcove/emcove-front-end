
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import classNames from 'classnames';

import { colors } from '../../styles/palette';
import Icons from '../Icons';

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;
`;

const Wording = styled.span`
  font-size: 16px;
  color: ${colors.textColor};
`;

const DropdownContainer = styled.div`
  margin-left: 8px;
`;

const DropdownWording = styled.span`
  font-size: 16px;
`;

const Status = styled.button`
  font-size: 16px;
  background: none;
  border: unset;
  padding: 10px 12px;
  width: 100%;
  text-align: left;

  &:hover {
    cursor: pointer;
  }

  ${props => props.type === "PENDIENTE" && css`
    color: ${colors.warning};

    &:hover {
      background-color: ${colors.warningHover};
    }
  `}

  ${props => props.type === "RECHAZADO" && css`
    color: ${colors.error};

    &:hover {
      background-color: ${colors.errorHover};
    }
  `}
  
  ${props => props.type === "CANCELADO" && css`
    color: ${colors.error};

    &:hover {
      background-color: ${colors.errorHover};
    }
  `}

  ${props => props.type === "EN_PREPARACION" && css`
    color: ${colors.success};

    &:hover {
      background-color: ${colors.successHover};
    }
  `}
  
  ${props => props.type === "ENTREGADO" && css`
    color: ${colors.primary};

    &:hover {
      background-color: ${colors.primaryTen};
    }
  `}
`;

const DropdownButton = styled.button`
  border: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: ${colors.white};
  padding: 8px 12px;
  border-radius: 2px;

  &:hover {
    cursor: pointer;
  } 
`;

const Options = styled.div`
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${colors.white};
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 12%);
  border-radius: 4px;
  border: solid 1px ${colors.grayBorder};
`;

const OrdersFilter = ({ filterOrders }) => {
  const [showingStatus, setShowingStatus] = useState('TODOS');
  const [showOptions, setShowOptions] = useState(false);

  const updateFilter = (option) => {
    setShowingStatus(option);
    if (filterOrders) filterOrders(option.replace(' ', '_'));
    setShowOptions(false);
  }

  return (
    <Container className="filter-orders__container">
      <Wording>Mostrar: </Wording>
      <DropdownContainer>
        <DropdownButton onClick={() => setShowOptions(!showOptions)}>
          <DropdownWording type={showingStatus}>{showingStatus}</DropdownWording>
          <Icons type="arrow-down" className={classNames("filter-orders__dropdown-icon", { "filter-orders__dropdown-icon--open": showOptions })} />
        </DropdownButton>
      {showOptions && 
        <Options>
          <Status type="PENDIENTE" onClick={() => updateFilter("PENDIENTE")}>PENDIENTE</Status>
          <Status type="RECHAZADO" onClick={() => updateFilter("RECHAZADO")}>RECHAZADO</Status>
          <Status type="CANCELADO" onClick={() => updateFilter("CANCELADO")}>CANCELADO</Status>
          <Status type="EN_PREPARACION" onClick={() => updateFilter("EN PREPARACION")}>EN PREPARACION</Status>
          <Status type="ENTREGADO" onClick={() => updateFilter("ENTREGADO")}>ENTREGADO</Status>
        </Options>
        }
      </DropdownContainer>
    </Container>
  )
}


export default OrdersFilter;
