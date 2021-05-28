import React from 'react';
import styled from 'styled-components';

import { colors } from '../../../styles/palette';

import Icon from '../../../components/Icons';
import Dropdown from '../../../components/Dropdown';


const Container = styled.div`
  display: flex;
  padding-bottom: 20px;
  margin-bottom: 20px;
  width: 100%;
  border-radius: 3px;
  align-items: center;
  border-bottom: solid 1px rgba(0, 0, 0, 0.1);
`;

const ImageUploader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100px;
  max-width: 100px;
  height: 80px;
  border: solid 1px ${colors.grayBorder};
  border-radius: 3px;
  background-color: transparent;
  transition: box-shadow .08s linear,min-width .15s cubic-bezier(0.4,0.0,0.2,1);
  &:hover {
    cursor: pointer;
    box-shadow:  0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%);
  }
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
  color: rgba(0,0,0,0.4);
  font-size: 14px;
`;

const ProductCard = ({ image, name, description, properties }) => {
  return (
    <Container>
      <ImageUploader>
        { !image && <Icon type="upload" className="upload-product__icon" /> }
        { image &&  <img id="productImage" src={image} alt="business product" className="product-image" />}
      </ImageUploader>
      <SmallContainer>
        <Name>{name}</Name>
        <Description>{description}</Description>
      </SmallContainer>
      <SmallContainer>
        { Object.keys(properties).map(k => 
          <Dropdown placeholder="Elegí una opción" options={properties[k]} label={k} />
        )}
      </SmallContainer>
    </Container>
  );
}

export default ProductCard;
