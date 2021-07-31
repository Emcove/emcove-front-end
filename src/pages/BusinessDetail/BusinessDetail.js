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

import ProductDetail from "./components/ProductDetail";

import { colors } from "../../styles/palette";

import UserData from "../../utils";

import CategoriesList from "../../components/CategoriesList/CategoriesList";
import Button from "../../components/Button";

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

const BusinessDetail = () => {
  const history = useHistory();
  // const location = useLocation();
  const business = UserData.getUserFromStorage().entrepreneurship;
  const [productModal, setProductModalInfo] = useState({ visible: false, product: null })
  // const { from } = queryString.parse(location.search);
  
  const shipmentText = business.doesShipments ? "Hace envíos" : "No hace envíos";
  
  useEffect(() => {
    // if (from === "nav-header") {
    // }

    const mp = new window.MercadoPago('TEST-2d4b6c2b-2681-4037-9e2b-7099dc8cf4b4', {
      locale: 'es-AR'
    });

  // Inicializa el checkout
    mp.checkout({
        preference: {
            id: '260505835-798b202a-33ce-4db1-b575-23e7cff281cf'
        },
        render: {
              container: '.cho-container', // Indica el nombre de la clase donde se mostrará el botón de pago
              label: 'Pagar', // Cambia el texto del botón de pago (opcional)
        }
    });
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
            <Link onClick={() => history.push('/reputation?from=business-detail')}>Ver reputación</Link>
          </TitleContainer>
        </DataContainer>
        <Info>
          <Text>{`Localidad: ${business.city}`}</Text>
          <Text>{shipmentText}</Text>


          <button className="cho-container" />


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
    </Layout>
  );
}

export default BusinessDetail;
