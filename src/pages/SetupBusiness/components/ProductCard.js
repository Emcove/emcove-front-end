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

const Name = styled.p`
  margin-bottom: 4px;
  font-weight: 600;
  color: ${colors.text};
`;

const Description = styled.p`
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
`;

const TagLabel = styled.p`
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

const ProductCard = ({ images, name, description, properties, hasStock, productionTime, index }) => {
  const { products, updateProducts } = useContext(BusinessContext);

  const deleteProductRow = () => {
    let auxProducts = [...products];
    auxProducts.splice(index, 1);

    updateProducts(auxProducts);
  }

  return (
    <Container key={name}>
      {/* El id lo hice así para cuando tengamos muchos productos no haya ids repetidos */}
      <Carrousel
        images={images}
      />
      <SmallContainer>
        <Name>{name}</Name>
        <Description>{description}</Description>
        { hasStock && <Tag success><TagLabel>En stock</TagLabel></Tag> }
        { !hasStock && <TagLabel info>Elaboración: {productionTime} días</TagLabel>}
      </SmallContainer>
      <SmallContainer>
        {properties.map(prop => <Dropdown key={`${prop.name}Dropdown`} options={prop.options} placeholder={prop.name} />)}
      </SmallContainer>
      <DeleteRowButton className="delete-row__button" onClick={deleteProductRow}><Icon type="cross" className="delete-row__icon" /></DeleteRowButton>
    </Container>
  );
}

export default ProductCard;
