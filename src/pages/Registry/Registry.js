import React, { useState } from 'react';

import { useHistory } from "react-router-dom";

import Layout from '../../components/Layout';
import Title from '../../components/Title';
import Subtitle from '../../components/Subtitle';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import Link from '../../components/Link';

const Registry = () => {
  const history = useHistory();

  // Account Data
  const [email, setEmail] = useState('');
  const [emailConfirmation, setEmailConfirmation] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [requiredEmail, setRequiredEmail] = useState(false);
  const [requiredEmailConf, setRequiredEmailConf] = useState(false);
  const [requiredPass, setRequiredPass] = useState(false);
  const [requiredPassConf, setRequiredPassConf] = useState(false);

  // Personal Data
  const [name, setName] = useState('');
  const [requiredName, setRequiredName] = useState('');
  const [lastName, setLastName] = useState('');
  const [requiredLastName, setRequiredLastName] = useState('');
  const [city, setCity] = useState('');

  const allRequiredFieldsComplete = () => {
    return email !== '' && emailConfirmation !== '' && password !== '' && passwordConfirmation !== '' &&
    name !== '' && lastName !== '';
  }

  const setRequiredFields = () => {
    if (email === '') {
      setRequiredEmail(true);
    }

    if (emailConfirmation === '') {
      setRequiredEmailConf(true);
    }

    if (password === '') {
      setRequiredPass(true);
    }

    if (passwordConfirmation === '') {
      setRequiredPassConf(true);
    } 

    if (name === '') {
      setRequiredName(true);
    } 

    if (lastName === '') {
      setRequiredLastName(true);
    } 
  }

  const redirect = (view) => {
    history.push(view);
  }

  const submitRegistry = () => {
    if (allRequiredFieldsComplete()) {
      redirect('/home');
    }

    setRequiredFields();
  }

  return (
    <Layout registry>
      <div className="registry-page">
        <Title>Registro</Title>
        <div className="registry-container">
          <div className="registry-data">
            <Subtitle>Datos de la cuenta</Subtitle>
            <div className="registry-account-data__inputs">
              <TextInput
                id="email"
                label="Correo electrónico"
                value={email}
                placeholder="Correo electrónico"
                type="email"
                onChange={setEmail}
                required={requiredEmail}
              />
              <TextInput 
                id="email-confirmation"
                label="Confirmar correo electrónico"
                value={emailConfirmation}
                placeholder="Confirmar correo electrónico"
                type="email"
                onChange={setEmailConfirmation}
                required={requiredEmailConf}
              />

              <TextInput 
                id="password"
                label="Contraseña"
                value={password}
                placeholder="Contraseña"
                type="password"
                onChange={setPassword}
                required={requiredPassConf}
              />
              <TextInput 
                id="password"
                label="Confirmar contraseña"
                value={passwordConfirmation}
                placeholder="Confirmar contraseña"
                type="password"
                onChange={setPasswordConfirmation}
                required={requiredPass}
              />
            </div>
          </div>
          <div className="registry-data">
            <Subtitle>Datos personales</Subtitle>
            <div className="registry-personal-data__inputs">
              <TextInput 
                id="name"
                label="Nombre"
                value={name}
                placeholder="Nombre"
                type="text"
                required={requiredName}
                onChange={setName}
              />
              <TextInput 
                id="lastname"
                label="Apellido"
                value={lastName}
                placeholder="Apellido"
                type="text"
                required={requiredLastName}
                onChange={setLastName}
              />
              <TextInput 
                id="localization"
                label="Localidad"
                value={city}
                placeholder="Localidad"
                type="text"
                onChange={setCity}
              />
            </div>
          </div>
        </div>
        <div className="registry-button">
          <Button primary onClick={() => submitRegistry()}>Registrarme</Button>
          <Link className="login-button" onClick={() => redirect('/')}>Volver al Log In</Link>
        </div>
      </div>
    </Layout>
  );
}

export default Registry;
