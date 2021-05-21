import React from 'react';

import Layout from '../../components/Layout';
import Title from '../../components/Title';
import Subtitle from '../../components/Subtitle';

const Registry = () => {
  return (
    <Layout>
      <div className="registry-page">
        <Title>Registro</Title>
        <div className="registry-container">
          <div className="registry-data">
            <Subtitle>Datos de la cuenta</Subtitle>
            <div className="registry-account-data__inputs">

            </div>
          </div>
          <div className="registry-data">
            <Subtitle>Datos personales</Subtitle>
            <div className="registry-personal-data__inputs">

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Registry;
