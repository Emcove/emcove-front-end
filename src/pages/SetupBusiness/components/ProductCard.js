import React, {useState} from 'react';
import styled from 'styled-components';

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
  color: rgba(0,0,0,0.4);
  font-size: 14px;
`;


const ProductCard = ({ image, name, description, properties }) => {
  const [logo, setLogo] = useState(image);

  return (
    <Container>
      {/* El id lo hice así para cuando tengamos muchos productos no haya ids repetidos */}
      <ImageUploader
        iconClass="upload-product__icon"
        id={`product-${name}-image`}
        shape="squared"
        onChange={setLogo}
        image={logo}
      />
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
