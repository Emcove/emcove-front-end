import React, { useEffect, useState } from "react";

import styled, { css } from "styled-components";
import ReactLoading from "react-loading";

import { useHistory, useParams } from "react-router-dom";

import Carrousel from "../../components/Carrousel/Carrousel";
import ImageUploader from "../../components/ImageUploader";
import Layout from "../../components/Layout";
import Title from "../../components/Title";
import Link from "../../components/Link";
import Icon from "../../components/Icons";
import Modal from "../../components/Modal";

import ProductDetail from "./components/ProductDetail";

import { colors } from "../../styles/palette";

import CategoriesList from "../../components/CategoriesList/CategoriesList";
import UserData from '../../utils/userData';
import BusinessService from "../../services/BusinessService";

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

const Loading = styled.div`
  width: 100%;
  padding: 15% 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EditBusinessButton = styled.button`
  position: fixed;
  top: calc(100vh - 64px - 70px);
  right: 3%;
  border-radius: 100%;
  border: none;
  width: 60px;
  height: 60px;
  background-color: ${colors.white};
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%);
  transition: box-shadow .08s linear,min-width .15s cubic-bezier(0.4,0.0,0.2,1);
  &:hover {
    cursor: pointer;
    box-shadow: 0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%);
  }
`;

const BusinessDetail = (props) => {
  const history = useHistory();
  const params = useParams();

  const [isLoading, setLoading] = useState(true);
  const [business, setBusiness] = useState();
  const [isUserBusiness, setIsUserBusiness] = useState(false);

  const [productModal, setProductModalInfo] = useState({ visible: false, product: null })
  // const { from } = queryString.parse(location.search);
  
  const [shipmentText,setShipmentText] = useState();

  const handleProductClick = (product) => {
    setProductModalInfo({ visible: true, product });
  }

  const setModalVisibility = (visible) => {
    setProductModalInfo(prevState => {
      return { ...prevState, visible }
    });
  };

  useEffect(() => {
    setIsUserBusiness(UserData.isUserBusiness(params.business));

    BusinessService.getBusinessByName(params.business).then(response => {
      setBusiness(response.data);
      setShipmentText(response.data.doesShipments ? "Hace envíos" : "No hace envíos")
      setLoading(false);
    });

  }, []);

  return (
    <Layout>
      {isLoading && 
          <Loading>
            <ReactLoading className="login-button__loading" type="spin" color={colors.primary} height="10%" width="10%" />
          </Loading>
      }
      { !isLoading &&
      <>
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
        {isUserBusiness && 
          <EditBusinessButton onClick={() => history.push('/createBusiness?from=businessDetail')}>
            <Icon type="edit" className="edit-button__icon" />
          </EditBusinessButton>
        }
      </Container>
      <Modal open={productModal.visible} setVisibility={setModalVisibility}>
        <ProductDetail product={productModal.product}/>
      </Modal>
      </>
    }
    </Layout>
  );
}

export default BusinessDetail;
