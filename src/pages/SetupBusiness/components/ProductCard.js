import React, { useContext } from 'react';
import styled, { css } from 'styled-components';

import { colors } from '../../../styles/palette';

import Dropdown from '../../../components/Dropdown';
import Icon from '../../../components/Icons';
import Carrousel from '../../../components/Carrousel';

import BusinessContext from '../../../context/Business';

const Container = styled.div`
  display: flex;
  padding-bottom: 20px;
  margin-bottom: 20px;
  width: 100%;
  border-radius: 3px;
  align-items: center;
  border-bottom: solid 1px rgba(0, 0, 0, 0.1);
  position: relative;

  &:hover .delete-row__button {
    visibility: visible;
  }
`;

const SmallContainer = styled.div`
  padding: 0 0 0 20px;
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const Name = styled.span`
  margin-bottom: 4px;
  font-weight: 600;
  color: ${colors.text};
  font-size: 18px;
`;

const Description = styled.span`
  margin-bottom: 4px;
  color: rgba(0,0,0,0.6);
  font-size: 14px;
`;

const Tag = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  padding: 4px 6px;
  border-radius: 10px;
  
  ${props => props.success && css `
    background-color: ${colors.success};
  `}

  ${props => props.transparent && css `
    background-color: transparent;
  `}
`;

const TagLabel = styled.span`
  font-weight: 600;
  font-size: 12px;
  color: ${colors.white};

  ${props => props.info && css `
    color: ${colors.primary};
  `}
`;

const DeleteRowButton = styled.button`
  background-color: transparent;
  border: none;
  position: absolute;
  top: -8px;
  right: -10px;
  visibility: hidden;
  transition: visibility ease-in 0.3s;
  &:hover {
    cursor: pointer;
  }
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
`;

const Price = styled.span`
  font-size: 16px;
  color: rgba(0,0,0,0.6);
  margin-top: 12px;
  font-weight: 500;
`;

const ProductCard = ({ images, name, description, properties, hasStock, productionTime, index, basePrice }) => {
  const { products, updateProducts } = useContext(BusinessContext);

  const deleteProductRow = () => {
    let auxProducts = [...products];
    auxProducts.splice(index, 1);

    updateProducts(auxProducts);
  }

  return (
    <Container key={name}>
      {/* El id lo hice así para cuando tengamos muchos productos no haya ids repetidos */}
      <Group>
        <Carrousel
          images={images}
        />
        <Price>Desde ${basePrice}</Price>
      </Group>
      <SmallContainer>
        <Name>{name}</Name>
        <Description>{description}</Description>
        {hasStock && <Tag success><TagLabel>Entrega inmediata</TagLabel></Tag> }
        {productionTime && <Tag transparent><TagLabel info>Elaboración: {productionTime} días</TagLabel></Tag>}
      </SmallContainer>
      <SmallContainer>
        {properties.map(prop => <Dropdown key={`${prop.name}Dropdown`} options={prop.options.map(opt => `${opt.description} - $${opt.price}`)} placeholder={prop.name} />)}
      </SmallContainer>
      <DeleteRowButton className="delete-row__button" onClick={deleteProductRow}><Icon type="cross" className="delete-row__icon" /></DeleteRowButton>
    </Container>
  );
}

export default ProductCard;
