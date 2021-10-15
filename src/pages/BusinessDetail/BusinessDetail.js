import React, { useState, useEffect } from "react";

import styled, { css } from "styled-components";
import ReactLoading from "react-loading";

import { useHistory, useParams, useLocation } from "react-router-dom";
import queryString from "query-string";

import MessengerCustomerChat from "react-messenger-customer-chat";

import { OrderProvider } from '../../context/Order';

import Carrousel from "../../components/Carrousel/Carrousel";
import ImageUploader from "../../components/ImageUploader";
import Layout from "../../components/Layout";
import Title from "../../components/Title";
import Link from "../../components/Link";
import Icon from "../../components/Icons";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import Snackbar from "../../components/Snackbar";
import CategoriesList from "../../components/CategoriesList";

import ProductDetail from "./components/ProductDetail";
import SubscriptionDetail from "./components/SubscriptionDetail";
import GoogleCalendarSetup from "./components/GoogleCalendarSetup";
import Calendar from "./components/Calendar";

import { colors } from "../../styles/palette";

import UserData from '../../utils/userData';
import BusinessService from "../../services/BusinessService";
import SubscriptionService from "../../services/SubscriptionService";

const DataContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 20px;
  
  @media (max-width: 768px) {
    margin-top: 0;
  }
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

  ${props => props.bold && css `
    font-weight: 500;
  `}

  ${props => props.productText && css `
    @media (max-width: 768px) {
      text-align: center;
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
  align-items: flex-start;
`;

const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-left: -17px;

  @media (max-width: 768px) {
    justify-content: space-between;
  }
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

  @media (max-width: 768px) {
    max-width: 135px;
    max-height: 135px;
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

  @media (max-width: 768px) {
    display: none;
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

const LinkContainer = styled.div`
  margin-left: -6px;
`;

const BusinessDetail = () => {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();

  const app_id = "388558709649689";
  const { collection_status, plan } = queryString.parse(location.search);

  const [productModal, setProductModalInfo] = useState({ visible: false, product: null })
  const [modalSubscription, openModalSubscription] = useState(false);
  const [gCalModal, openGCalModal] = useState(false);
  const [availabilityModal, openAvailabilityModal] = useState(false);

  const [snackbarData, setSnackbarData] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [business, setBusiness] = useState();
  const [shipmentText, setShipmentText] = useState('');
  const [subExpirationDate, setExpirationDate] = useState('');
  
  const [isUserBusiness, setIsUserBusiness] = useState(false);
  const [order, setOrder] = useState(undefined);
    
  useEffect(() => {
    const userBusiness = UserData.isUserBusiness(params.business);
    setIsUserBusiness(userBusiness);

    BusinessService.getBusinessByName(params.business).then(response => {
      setBusiness(response.data);
      setShipmentText(response.data.doesShipments ? "Hace envíos" : "No hace envíos")
      setLoading(false);

      if (response.data.hasSubscription) {
        setExpirationDate(new Date(response.data.subscriptionExpirationDate).toLocaleDateString());
      }
    
      if (userBusiness) {
        if (collection_status === "approved") {
          SubscriptionService.subscribeBusiness(response.data.id, plan).then(response => {
            setExpirationDate(new Date(response.data.subscriptionExpirationDate).toLocaleDateString());
            setSnackbarData({
              show: true,
              type: 'success',
              message: '¡Tu suscripción fue registrada correctamente!',
            });
            setTimeout(() => {
              setSnackbarData({ show: false });
            }, 2000);
          });
        }
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

  const sendOrder = () => {
    setLoading(true);

    BusinessService.sendOrder(order, business.id).then(response => {
      setLoading(false);

      if (response.status === 200) {
        setOrder(undefined);
        setSnackbarData({
          show: true,
          type: 'success',
          message: '¡Tu pedido fue enviado correctamente!',
        });
      } else {
        setSnackbarData({
          show: true,
          type: 'error',
          message: '¡Ups! No pudimos enviar tu pedido, intentá más tarde.',
        });
      }
  
      setTimeout(() => {
        setSnackbarData({ show: false });
      }, 2000);
    });
  }

  const calendarSuccess = (updatedBusiness) => {
    setBusiness(updatedBusiness);
    setSnackbarData({
      type: 'success',
      show: true,
      message: '¡Calendario creado con éxito!'
    });
    openGCalModal(false);

    setTimeout(() => {
      setSnackbarData({ ...snackbarData, show: false });
    }, 2000);
  }
  
  const calendarError = () => {
    setSnackbarData({
      type: 'error',
      show: true,
      message: 'Ocurrió un error creando tu calendario, por favor intentá más tarde.'
    });
    openGCalModal(false);

    setTimeout(() => {
      setSnackbarData({ ...snackbarData, show: false });
    }, 2000);
  }

  return (
    <OrderProvider value={{ setOrder, isUserBusiness, setProductModalInfo }}>
      <Layout>
        {isLoading && 
            <Loading>
              <ReactLoading className="login-button__loading" type="spin" color={colors.primary} height="10%" width="10%" />
            </Loading>
        }
        { !isLoading &&
        <>
        <Snackbar
          type={snackbarData.type}
          show={snackbarData.show}
          message={snackbarData.message}
        />
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
              {business.hasSubscription !== '0' && isUserBusiness && subExpirationDate &&
                <SubscriptionInfoContainer>
                  <SubscriptionInfo>Suscripción activa hasta: {subExpirationDate}</SubscriptionInfo>
                </SubscriptionInfoContainer>
              }
              <Link onClick={() => history.push(`/reputation?from=business-detail&id=${business.id}`)}>Ver reputación</Link>
              {isUserBusiness && business.hasSubscription === '0' && !plan &&
                <ButtonContainer>
                  <Button primary onClick={() => openModalSubscription(true)}>Publicitar mi emprendimiento</Button>
                </ButtonContainer>
              }
            </TitleContainer>
          </DataContainer>
          <Info>
            {isUserBusiness && !business.googleCalendarId &&
              <LinkContainer>
                <Link bold primary onClick={() => openGCalModal(!gCalModal)}>Asociar Google Calendar</Link>
              </LinkContainer>
            }
            <Text>{`Localidad: ${business.city}`}</Text>
            <Text>{shipmentText}</Text>
            {business.googleCalendarId &&
            <LinkContainer>
              <Link bold onClick={() => openAvailabilityModal(true)}>Ver disponibilidad del negocio</Link>
            </LinkContainer>
            }
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
                  <Carrousel width="200px" height="180px" images={images} buttonsWidth="20px" />
                </ProductContainer>
              )})}
            </ProductsContainer>
          </Info>
          {isUserBusiness && 
            <EditBusinessButton onClick={() => history.push('/createBusiness?from=businessDetail')}>
              <Icon type="edit" className="edit-button__icon" />
            </EditBusinessButton>
            
          }
          {!isUserBusiness && business.facebook_page_id &&
            <MessengerCustomerChat
              pageId={business.facebook_page_id}
              appId={app_id}
            />
          }
          {!isUserBusiness && order && <Button primary onClick={() => sendOrder()}>Enviar pedido</Button>}
        </Container>
        <Modal open={productModal.visible} setVisibility={setModalVisibility} minWidth="40%">
          <ProductDetail product={productModal.product}/>
        </Modal>
        <Modal open={modalSubscription} setVisibility={openModalSubscription} minWidth="40%">
          <SubscriptionDetail businessName={business.name} />
        </Modal>
        <Modal open={gCalModal} setVisibility={openGCalModal} minWidth="40%">
          <GoogleCalendarSetup
            business={business}
            handleCancel={() => openGCalModal(false)}
            handleSuccess={calendarSuccess}
            handleError={calendarError}
          />
        </Modal>
        <Modal open={availabilityModal} setVisibility={openAvailabilityModal} minWidth="40%">
          <Calendar business={business} />
        </Modal>
        </>
      }
      </Layout>
    </OrderProvider>
  );
}

export default BusinessDetail;
