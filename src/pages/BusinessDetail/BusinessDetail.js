import React, { useEffect } from "react";

import styled from "styled-components";

import { useHistory } from "react-router-dom";

import Layout from "../../components/Layout";
import Title from "../../components/Title";
import Link from "../../components/Link";
import ImageUploader from "../../components/ImageUploader";

import { colors } from "../../styles/palette";

const DataContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 20px;
`;

const TitleContainer = styled.div`
  padding: 0 20px;
`;

const Subtitle = styled.h2 `
  font-size: 18px;
  color: ${colors.textColor};
`;

const Container = styled.div`
  width: 100%;
`;


const BusinessDetail = () => {
  const history = useHistory();
  const business = {name: 'Dulcinea Tortas', logo: '', products: []};

  useEffect(() => {
    // get Business data
  });

  return (
    <Layout>
      <Container>
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
            <Link onClick={() => history.push('/reputation')}>Ver reputación</Link>
          </TitleContainer>
        </DataContainer>
      </Container>
    </Layout>
  );
}

export default BusinessDetail;
