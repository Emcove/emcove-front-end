import React, { useEffect, useState } from "react";

import styled from "styled-components";

import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";

import Carrousel from "../../components/Carrousel/Carrousel";
import ImageUploader from "../../components/ImageUploader";
import Layout from "../../components/Layout";
import Title from "../../components/Title";
import Link from "../../components/Link";
import Icon from "../../components/Icons";
import Modal from "../../components/Modal";

import ProductDetail from "./components/ProductDetail";

import { colors } from "../../styles/palette";

import mock from "./businessMock"; 

const DataContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 20px;
`;

const TitleContainer = styled.div`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Text = styled.span `
  font-size: 16px;
  color: ${colors.textColor};
  margin: 4px 0 ;
`;

const Subtitle = styled.h2 `
  font-size: 20px;
  font-weight: 600;
  color: ${colors.textColor};
  margin: 0;
`;

const Container = styled.div`
  width: 100%;
`;

const Info = styled.div `
  display: flex;
  flex-direction: column;
  padding: 16px 0;
`;

const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-left: -17px;
`;

const ProductContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 16px;
  align-items: center;

  &:hover {
    .business-detail__button {
      visibility: visible;
    }
  }
`;

const MoreInfo = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 3;
  display: flex;
  padding: 6px;
  border-radius: 100%;
  visibility: hidden;
  transition: visibility ease-in 0.2s;
  background-color: rgba(254,254,254,0.2);

  &:hover {
    cursor: pointer;
  }
`;

const BusinessDetail = () => {
  const history = useHistory();
  const location = useLocation();

  const [productModal, setProductModalInfo] = useState({ visible: false, product: null })

  const { from } = queryString.parse(location.search);

  let business = mock;

  const shipmentText = business.doesShipments ? "Hace envíos" : "No hace envíos";
  
  useEffect(() => {
    if (from === "nav-header") {
      // const user = JSON.parse(localStorage('user'));
      // business = user.entrepreneurship;
    }
  });

  const handleProductClick = (product) => {
    setProductModalInfo({ visible: true, product });
  }

  const setModalVisibility = (visible) => {
    setProductModalInfo(prevState => {
      return { ...prevState, visible }
    });
  };

  return (
    <Layout>
      <Container className="business-detail">
        <Link onClick={() => history.push('/home')}>Volver al listado</Link>
        <DataContainer>
          <ImageUploader
            id="logoBusiness"
            shape="round"
            image={business.logo}
            disabled
            label="Logo"
            iconClass="upload-logo__icon" 
          />
          <TitleContainer>
            <Title>{business.name}</Title>
            <Link onClick={() => history.push('/reputation?from=business-detail')}>Ver reputación</Link>
          </TitleContainer>
        </DataContainer>
        <Info>
          <Text>{`Localidad: ${business.city}`}</Text>
          <Text>{shipmentText}</Text>
        </Info>
        <Info>
          <Subtitle>Productos</Subtitle>
          <ProductsContainer>
            {business.products.length === 0 && <Text>Aún no hay productos cargados</Text>}
            {business.products.map(product => (
              <ProductContainer key={product.name}>
                <MoreInfo className="business-detail__button" onClick={() => handleProductClick(product)}>
                  <Icon type="more-options" className="business-detail__product-detail-icon"/>
                </MoreInfo>
                <Carrousel width="132px" height="112px" images={product.images} />
                <Text>{product.name}</Text>
              </ProductContainer>
            ))}
          </ProductsContainer>
        </Info>
      </Container>
      <Modal open={productModal.visible} setVisibility={setModalVisibility}>
        <ProductDetail product={productModal.product}/>
      </Modal>
    </Layout>
  );
}

export default BusinessDetail;
