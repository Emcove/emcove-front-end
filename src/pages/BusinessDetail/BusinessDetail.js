import React, { useState, useEffect } from "react";

import styled, { css } from "styled-components";

import { useHistory } from "react-router-dom";

import Carrousel from "../../components/Carrousel/Carrousel";
import ImageUploader from "../../components/ImageUploader";
import Layout from "../../components/Layout";
import Title from "../../components/Title";
import Link from "../../components/Link";
import Icon from "../../components/Icons";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import CategoriesList from "../../components/CategoriesList";

import ProductDetail from "./components/ProductDetail";
import SubscriptionDetail from "./components/SubscriptionDetail";

import { colors } from "../../styles/palette";

import UserData from "../../utils";

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

const Text = styled.p `
  font-size: 16px;
  color: ${colors.textColor};
  margin: 4px 0 ;

  ${props => props.clickeable && css `
    &:hover {
      cursor: pointer;
    }
  `}
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
  background-color: rgba(254,254,254,0.5);

  &:hover {
    cursor: pointer;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 12px;
  font-size: 0;
`;

const SubscriptionInfo = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: ${colors.success};
`;

const SubscriptionInfoContainer = styled.span`
  font-size: 0;
  margin-bottom: 14px;
  margin-top: -10px;
`;

const BusinessDetail = () => {
  const history = useHistory();
  // const location = useLocation();
  const business = UserData.getUserFromStorage().entrepreneurship;
  const [productModal, setProductModalInfo] = useState({ visible: false, product: null })
  const [modalSubscription, openModalSubscription] = useState(false);
  // const { from } = queryString.parse(location.search);
  let subExpirationDate = "";
  if (business.hasSubscription) {
    subExpirationDate = new Date(business.subscriptionExpirationDate).toLocaleDateString();
  }
  
  const shipmentText = business.doesShipments ? "Hace envíos" : "No hace envíos";
  
  useEffect(() => {
    // if (from === "nav-header") {
    // }
  }, []);

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
            {business.hasSubscription && 
              <SubscriptionInfoContainer>
                <SubscriptionInfo>Suscripción activa hasta: {subExpirationDate}</SubscriptionInfo>
              </SubscriptionInfoContainer>
            }
            <Link onClick={() => history.push('/reputation?from=business-detail')}>Ver reputación</Link>
            {!business.hasSubscription &&
              <ButtonContainer>
                <Button primary onClick={() => openModalSubscription(true)}>Publicitar mi emprendimiento</Button>
              </ButtonContainer>
            }
          </TitleContainer>
        </DataContainer>
        <Info>
          <Text>{`Localidad: ${business.city}`}</Text>
          <Text>{shipmentText}</Text>
        </Info>
        <Info>
          <Subtitle>Productos</Subtitle>
          <CategoriesList categories={business.categories} />
          <ProductsContainer>
            {business.products.length === 0 && <Text>Aún no hay productos cargados</Text>}
            {business.products.map(product => {
              const images = product.images.map(image => image.image);
              return (
              <ProductContainer key={product.name}>
                <MoreInfo className="business-detail__button" onClick={() => handleProductClick(product)}>
                  <Icon type="more-options" className="business-detail__product-detail-icon"/>
                </MoreInfo>
                <Carrousel width="132px" height="112px" images={images} />
                <Text clickeable>{product.name}</Text>
              </ProductContainer>
            )})}
          </ProductsContainer>
        </Info>
      </Container>
      <Modal open={productModal.visible} setVisibility={setModalVisibility}>
        <ProductDetail product={productModal.product}/>
      </Modal>
      <Modal open={modalSubscription} setVisibility={openModalSubscription}>
        <SubscriptionDetail business={business}/>
      </Modal>
    </Layout>
  );
}

export default BusinessDetail;
