import React from "react";
import styled, { css } from "styled-components";

import Title from "../../../components/Title";
import Dropdown from "../../../components/Dropdown";

import { colors } from "../../../styles/palette";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 32px;
`;

const Subtitle = styled.h2`
  color: ${colors.textColor};
  font-size: 18px;
  font-weight: 500;
`;

const Text = styled.p`
  font-size: 18px;
  color: ${colors.textColor};

  ${props => props.info && css `
    color: ${colors.primary};
  `}
`;

const ImagesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-left: -8px;
`;

const ImageContainer = styled.div`
  display: flex;
  position: relative;
  overflow: hidden;
  border: solid 1px #b3aeae14;
  background-color: #fff;
  min-width: 200px;
  max-width: 200px;
  height: 180px;
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

const Tag = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  padding: 4px 6px;
  border-radius: 10px;
  
  ${props => props.success && css `
    background-color: ${colors.success};
  `}

  ${props => props.info && css `
    background-color: ${colors.primary};
  `}
`;

const TagLabel = styled.span`
  font-weight: 600;
  font-size: 12px;
  color: ${colors.white};
`;

const PropertiesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-left: -17px;
`;

const DropdownContainer = styled.div`
  margin: 16px;
`;

const ProductDetail = ({ product }) => {
  const { name, description, productionTime, hasStock, props } = product;
  const images = product.images.map(image => image.image);
  return (
    <Container>
      <Title>{name}</Title>
      {!!images.length && (
        <ImagesContainer>
          {images.map((image, idx) => (
            <ImageContainer key={`${name}Image${idx}`}>
              <Image
                src={image}
                alt="viewProduct"
              />
            </ImageContainer>
          ))}
        </ImagesContainer>
      )}
      <Text key="descriptionText">{description}</Text>
      {!hasStock && <Tag info><TagLabel>{`${productionTime} días de elaboración`}</TagLabel></Tag>}
      {hasStock && <Tag success><TagLabel>En stock</TagLabel></Tag>}
      <Subtitle>Características</Subtitle>
      <PropertiesContainer>
        {props.map(prop => (
          <DropdownContainer key={`${prop.name}Dropdown`} >
            <Dropdown options={prop.options} label={prop.name} placeholder={prop.options[0]} />
          </DropdownContainer>
        ))}
      </PropertiesContainer>
    </Container>
  );
}

export default ProductDetail;
