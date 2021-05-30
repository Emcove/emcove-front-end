import React, { useState } from 'react';
import styled from 'styled-components'

import { useHistory } from 'react-router-dom';

import Checkbox from '../../components/Checkbox';
import Layout from '../../components/Layout';
import Link from '../../components/Link';
import ImageUploader from '../../components/ImageUploader';
import ProductsCard from './components/Products';
import Categories from './components/CategoriesCard';

import { colors } from '../../styles/palette';

const Content = styled.div`
  padding: 8px 8%;
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

const Setup = () => {
  const history = useHistory();
  
  const [name, setName] = useState('');
  const [logo, setLogo] = useState();
  const [doesShipments, setDoesShipments] = useState(false);
  const [categories, setCategories] = useState([]);

  const handleCategoriesClick = (category) => {
    if (categories.includes(category)) {
      categories.splice(categories.indexOf(category), 1);
      setCategories([...categories]);
    } else {
      setCategories([...categories, category]);
    }
  };

  return (
    <Layout>
      <Content>
        <Link onClick={() => history.push("/home")}>Volver al listado</Link>
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
            <Checkbox
              id="shipmentInput"
              label="Hago envíos"
              checked={doesShipments}
              onClick={() => setDoesShipments(!doesShipments)}
            />
          </div>
        </div>
        <div className="setup-business__properties">
          <ProductsCard />
          <Categories categories={categories} onClick={handleCategoriesClick} />
        </div>
      </Content>
    </Layout>
  );
}

export default Setup;
