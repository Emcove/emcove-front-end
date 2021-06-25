import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useHistory } from 'react-router-dom';

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
`;

const NameInput = styled.input`
  width: 50%;
  border: none;
  border-bottom: solid 1px ${colors.lightGray};
  background-color: transparent;
  font-size: 32px;
  color: ${colors.textColor};

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
  const history = useHistory();
  
  const [name, setName] = useState('');
  const [logo, setLogo] = useState();
  const [city, setCity] = useState('');
  const [doesShipments, setDoesShipments] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, updateProducts] = useState([]);

  const [snackbarData, setSnackbarData] = useState({});

  const [modalProductVisible, setModalVisible] = useState(false);

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    // Aca vamos a tener que hacer el fetch de los datos y setearlos en el state en caso
    // de que sea pantalla de edicion
  });

  const createBusiness = async () => {
     const data = {
       name,
       logo,
       city,
       doesShipments,
       categories:categories.map(c => c.toUpperCase()),
       products
     };
      setLoading(true);
      const resp = await BusinessService.createBusiness(data);

      if (resp.status === 201){
        setLoading(false);
        setSnackbarData({type: "success", message:"Emprendimiento creado con éxito", show: true});
        setTimeout(() => {
          setSnackbarData({show:false});
          history.push("/business?from=nav-header")
        }, 1500);
      } else {
        setLoading(false);
        setSnackbarData({type: "error", message:resp.data, show: true});
        setTimeout(() => {
        setSnackbarData({show:false});
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
      { isLoading && <Loading /> }
      <BusinessProvider value={{ name, logo, city, categories, products, addNewProduct, updateProducts }}>
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
            </div>
          </div>
          <div className="setup-business__properties">
            <ProductsList onClickNewProduct={() => setModalVisible(true)} />
            <Categories categories={categories} onClick={handleCategoriesClick} />
          </div>
          <div className="setup-business__submit">
            <div className="setup-business__submit--button">
              <Button primary onClick={() => createBusiness()}>
                Crear Emprendimiento
              </Button>
            </div>
            <Link onClick={() => history.push("/home")}>Cancelar</Link>
          </div>
          <Snackbar type={snackbarData.type} message={snackbarData.message} show={snackbarData.show} />
        </Content>
        <Modal className="new-product__modal" open={modalProductVisible} setVisibility={setModalVisible}>
          <ProductInput />
        </Modal>
      </BusinessProvider>
    </Layout>
  );
}

export default Setup;
