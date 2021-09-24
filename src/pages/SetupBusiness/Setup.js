import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useLocation, useHistory } from 'react-router-dom';
import queryString from "query-string";

import { BusinessProvider } from '../../context/Business';

import Checkbox from '../../components/Checkbox';
import Layout from '../../components/Layout';
import Link from '../../components/Link';
import ImageUploader from '../../components/ImageUploader';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import Snackbar from '../../components/Snackbar';
import Modal from '../../components/Modal';
import Loading from '../../components/Loading';

import ProductsList from './components/ProductsList';
import Categories from './components/CategoriesCard';
import ProductInput from './components/ProductInput';

import { colors } from '../../styles/palette';

import BusinessService from '../../services/BusinessService';

const Content = styled.div`
  width: 100%;
  padding-top: 32px;
`;

const NameInput = styled.input`
  width: 50%;
  border: none;
  border-bottom: solid 1px ${colors.lightGray};
  background-color: transparent;
  font-size: 32px;
  color: ${colors.textColor};
  font-family: 'Raleway';
  
  &:focus-visible {
    outline: none;
    border-bottom-color: #9BC53D;
  }
`;

const TextInputContainer = styled.div`
  margin-top: 28px;
  width: 25%;
`;

// Acá deberíamos hacer un fetch en caso de que el usuario quiera editar un emprendimiento
const Setup = () => {
  const location = useLocation();
  const history = useHistory();

  const [isUpdate, setIsUpdate] = useState(false);

  const [businessId, setBusinessId] = useState('');
  const [name, setName] = useState('');
  const [logo, setLogo] = useState();
  const [city, setCity] = useState('');
  const [doesShipments, setDoesShipments] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, updateProducts] = useState([]);

  const [pageId, setPageId] = useState('');

  const [snackbarData, setSnackbarData] = useState({});

  const [modalProductVisible, setModalVisible] = useState(false);

  const [isLoading, setLoading] = useState(false);

  const { from } = queryString.parse(location.search);

  useEffect(() => {
    if (from === "businessDetail"){
      setLoading(true);

      setIsUpdate(true);

      BusinessService.getLoggedBusiness().then(response => {
        const business = response.data;
        setBusinessId(business.id);
        setName(business.name);
        setLogo(business.logo);
        setCity(business.city);
        setDoesShipments(business.doesShipments);
        setCategories(business.categories.map(c => c.charAt(0) + c.slice(1).toLowerCase()));
        setPageId(business.facebook_page_id);
        updateProducts(business.products);
        setLoading(false);
      });
    }
  }, [from]);

  const saveBusiness = async () => {
     const data = {
       id:businessId,
       name,
       logo,
       city,
       doesShipments,
       facebook_page_id:pageId,
       categories: categories.map(c => c.toUpperCase()),
       products
     };

      setLoading(true);
      
      const saveFunction = isUpdate ?  BusinessService.patchBusiness : BusinessService.createBusiness;
      const resp = await saveFunction(data);

      if (resp.status === 201 || resp.status === 200){
        setLoading(false);
        let message = "Emprendimiento creado con éxito";

        if (isUpdate){
          message = "Emprendimiento actualizado con éxito"
        }

        setSnackbarData({ type: "success", message: message, show: true });
        setTimeout(() => {
          setSnackbarData({ show:false });
          history.push(`/business/${resp.data.name}`)
        }, 1500);
      } else {
        setLoading(false);
        setSnackbarData({ type: "error", message: "Algo salió mal, intentá de nuevo en unos minutos.", show: true });
        setTimeout(() => {
          setSnackbarData({ show:false });
        }, 1500);
      }
  }


  const handleCategoriesClick = (category) => {
    if (categories.includes(category)) {
      categories.splice(categories.indexOf(category), 1);
      setCategories([...categories]);
    } else {
      setCategories([...categories, category]);
    }
  }

  const addNewProduct = (product) => {
    updateProducts([...products, product]);
    setModalVisible(false);
  }

  return (
    <Layout>
      {isLoading && <Loading backgroundColor="transparent" />}
      <BusinessProvider value={{ isUpdate, name, logo, city, categories, products, addNewProduct, updateProducts }}>
        <Content>          
          <div className="setup-business__essentials">
            <ImageUploader
              id="logoBusiness"
              shape="round"
              image={logo}
              onChange={setLogo}
              disabled={false}
              label="Logo"
              iconClass="upload-logo__icon" 
            />
            <div className="setup-business__name">
              <NameInput
                type="text"
                id="businessName"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                placeholder="Nombre de emprendimiento"
              />
              <TextInputContainer>
                <TextInput
                  id="city"
                  value={city}
                  required={false}
                  type="text"
                  onChange={setCity}
                  placeholder="Localidad"
                />
              </TextInputContainer>
              <Checkbox
                id="shipmentInput"
                label="Hago envíos"
                checked={doesShipments}
                onClick={() => setDoesShipments(!doesShipments)}
              />
              <TextInputContainer>
                <TextInput
                  id="facebook_page_id"
                  value={pageId}
                  required={false}
                  type="text"
                  onChange={setPageId}
                  placeholder="Id página de facbook"
                />
              </TextInputContainer>
            </div>
          </div>
          <div className="setup-business__properties">
            <ProductsList onClickNewProduct={() => setModalVisible(true)} />
            <Categories categories={categories} onClick={handleCategoriesClick} />
          </div>
          <div className="setup-business__submit">
            <Button primary onClick={() => saveBusiness()}>
              {isUpdate ? "Actualizar Emprendimiento" : "Crear Emprendimiento"}
            </Button>
            <Link onClick={() => history.push(isUpdate ? `/business/${name}` : "/home")}>Cancelar</Link>
          </div>
          <Snackbar type={snackbarData.type} message={snackbarData.message} show={snackbarData.show} />
        </Content>
        <Modal className="new-product__modal" open={modalProductVisible} setVisibility={setModalVisible} minWidth="800px">
          <ProductInput />
        </Modal>
      </BusinessProvider>
    </Layout>
  );
}

export default Setup;
