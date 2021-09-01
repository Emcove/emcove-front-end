
import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import classNames from 'classnames';

import { colors } from '../../styles/palette';
import Icons from '../Icons';

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;
  width: 100%;
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
    background-color: ${colors.primaryTen};
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
  font-size: 16px;

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

const FilterGroup = styled.div`
  margin-left: 12px;
  display: flex;
  align-items: center;
`;

const OrdersFilter = ({ filterOrders, orderByDate }) => {
  const [showingStatus, setShowingStatus] = useState('Todos');
  const [showOptions, setShowOptions] = useState(false);
  const [dateOrder, setDateOrder] = useState('Descendente');
  const [showDateOptions, setShowDateOptions] = useState(false);

  useEffect(() => {
    document.addEventListener('click', () => {
      setShowOptions(false);
    });

    document.addEventListener('keydown', (event) => {
      if(event.key === "Escape") {
        setShowOptions(false);
      }
    });

    return () => {
      document.removeEventListener('keydown', () => {});
      document.removeEventListener('click', () => {});
    }
  }, [setShowOptions]);


  const updateFilter = (option, e) => {
    e.stopPropagation();
    setShowingStatus(option);
    if (filterOrders) filterOrders(option.replace(' ', '_').toUpperCase());
    setShowOptions(false);
  }

  const showOptionsFunc = (event, showOptionsFunction, prevState) => {
    event.stopPropagation();
    showOptionsFunction(!prevState);
  }

  const updateOrder = (option, e) => {
    e.stopPropagation();
    setDateOrder(option);
    if (orderByDate) orderByDate(option);
    setShowDateOptions(false);
  }

  return (
    <Container className="filter-orders__container">
      <>
        <Wording>Mostrar: </Wording>
        <DropdownContainer>
          <DropdownButton onClick={(event) => showOptionsFunc(event, setShowOptions, showOptions)}>
            <DropdownWording type={showingStatus}>{showingStatus}</DropdownWording>
            <Icons type="arrow-down" className={classNames("filter-orders__dropdown-icon", { "filter-orders__dropdown-icon--open": showOptions })} />
          </DropdownButton>
        {showOptions && 
          <Options>
            <Status key="PENDIENTE" type="PENDIENTE" onClick={(event) => updateFilter("Pendientes", event)}>Pendientes</Status>
            <Status key="RECHAZADO" type="RECHAZADO" onClick={(event) => updateFilter("Rechazados", event)}>Rechazados</Status>
            <Status key="CANCELADO" type="CANCELADO" onClick={(event) => updateFilter("Cancelados", event)}>Cancelados</Status>
            <Status key="EN_PREPARACION" type="EN_PREPARACION" onClick={(event) => updateFilter("En preparación", event)}>En preparación</Status>
            <Status key="ENTREGADO" type="ENTREGADO" onClick={(event) => updateFilter("Entregados", event)}>Entregados</Status>
          </Options>
          }
        </DropdownContainer>
      </>
      <FilterGroup>
        <Wording>Ordernar por fecha: </Wording>
        <DropdownContainer>
          <DropdownButton onClick={(event) => showOptionsFunc(event, setShowDateOptions, showDateOptions)}>
            <DropdownWording>{dateOrder}</DropdownWording>
            <Icons type="arrow-down" className={classNames("order-date__dropdown-icon", { "order-date__dropdown-icon--open": showDateOptions })} />
          </DropdownButton>
          {showDateOptions && 
          <Options>
            <Status key="Descendente" onClick={(event) => updateOrder("Descendente", event)}>Descendente</Status>
            <Status key="Ascendente" onClick={(event) => updateOrder("Ascendente", event)}>Ascendente</Status>
          </Options>
          }
        </DropdownContainer>
      </FilterGroup>
    </Container>
  )
}


export default OrdersFilter;
