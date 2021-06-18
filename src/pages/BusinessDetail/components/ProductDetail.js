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
  margin-top: 20px;
`;

const ImageContainer = styled.div`
  display: flex;
  position: relative;
  overflow: hidden;
  border: solid 1px ${colors.grayBorder};
  background-color: ${colors.white};
  min-width: 200px;
  max-width: 200px;
  height: 180px;
  border-radius: 3px;
`;

const Image = styled.img`
  height: 100%;
  max-width: 100%;
  width: fit-content;
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
  return (
    <Container>
      <Title>{name}</Title>
      {!!product.images.length && (
        <ImagesContainer>
          {product.images.map((image, idx) => (
            <ImageContainer key={`${name}Image${idx}`}>
              <Image src={image} />
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
