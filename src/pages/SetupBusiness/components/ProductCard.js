import React from 'react';
import styled, { css } from 'styled-components';

import { colors } from '../../../styles/palette';

import Dropdown from '../../../components/Dropdown';
import ImageUploader from '../../../components/ImageUploader';

const Container = styled.div`
  display: flex;
  padding-bottom: 20px;
  margin-bottom: 20px;
  width: 100%;
  border-radius: 3px;
  align-items: center;
  border-bottom: solid 1px rgba(0, 0, 0, 0.1);
`;

const SmallContainer = styled.div`
  padding: 0 0 0 12px;
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const Name = styled.span`
  margin-bottom: 4px;
  font-weight: 600;
  color: ${colors.text};
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
`;

const TagLabel = styled.span`
  font-weight: 600;
  font-size: 12px;
  color: ${colors.white};

  ${props => props.info && css `
    color: ${colors.primary};
  `}
`;


const ProductCard = ({ images, name, description, properties, hasStock, productionTime }) => {
  return (
    <Container key={name}>
      {/* El id lo hice así para cuando tengamos muchos productos no haya ids repetidos */}
      <ImageUploader
        iconClass="upload-product__icon"
        id={`product-${name}-image`}
        shape="squared"
        image={images[0] || ''}
        disabled
      />
      <SmallContainer>
        <Name>{name}</Name>
        <Description>{description}</Description>
        { hasStock && <Tag success><TagLabel>En stock</TagLabel></Tag> }
        { !hasStock && <TagLabel info>Elaboración: {productionTime} días</TagLabel>}
      </SmallContainer>
      <SmallContainer>
        {properties.map(prop => Object.keys(prop).map(k => <Dropdown key={`${k}Dropdown`} options={prop[k]} />))}
      </SmallContainer>
    </Container>
  );
}

export default ProductCard;
