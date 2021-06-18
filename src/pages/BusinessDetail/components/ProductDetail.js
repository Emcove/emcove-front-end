import React from "react";
import styled from "styled-components";

import Icon from "../../../components/Icons";

import { colors } from "../../../styles/palette";

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;
`;

const Text = styled.span`
  margin-left: 16px;
  font-size: 20px;
  color: ${colors.textColor};
`;

const ImagesContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ImageContainer = styled.div`
  display: flex;
  position: relative;
  overflow: hidden;
  border: solid 1px rgba(0,0,0,0.05);
  background-color: ${colors.white};
  min-width: 100px;
  max-width: 100px;
  height: 80px;
  border-radius: 3px;
`;

const Image = styled.img`
  height: 100%;
  max-width: 100%;
  width: fit-content;
  display: inline;
`;

const ProductDetail = ({ product }) => (
  <Container>
    <Text>{product.name}</Text>
    {!!product.images.length && (
      <ImagesContainer>
        {product.images.map(image => (
          <ImageContainer>
            <Image src={image} />
          </ImageContainer>
        ))}
      </ImagesContainer>
    )}
  </Container>
);

export default ProductDetail;
