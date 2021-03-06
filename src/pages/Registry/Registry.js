import React, { useState } from 'react';

import { useHistory } from "react-router-dom";

import Layout from '../../components/Layout';
import Title from '../../components/Title';
import Subtitle from '../../components/Subtitle';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import Link from '../../components/Link';
import Checkbox from '../../components/Checkbox';
import Snackbar from '../../components/Snackbar';
import Loading from '../../components/Loading';

import AuthenticationService from "../../services/AuthenticationService"

const Registry = () => {
  const history = useHistory();

  const [isLoading, setLoading] = useState(false);

  // Account Data
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [emailConfirmation, setEmailConfirmation] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [requiredUsername, setRequiredUsername] = useState(false);
  const [requiredEmail, setRequiredEmail] = useState(false);
  const [requiredEmailConf, setRequiredEmailConf] = useState(false);
  const [requiredPass, setRequiredPass] = useState(false);
  const [requiredPassConf, setRequiredPassConf] = useState(false);

  // Personal Data
  const [name, setName] = useState('');
  const [requiredName, setRequiredName] = useState('');
  const [surname, setSurname] = useState('');
  const [requiredSurname, setRequiredSurname] = useState('');
  const [city, setCity] = useState('');
  const [adult, setAdult] = useState(false);

  // Snackbar
  const [snackBarError, setSnackBarError] = useState(false)
  const [snackBarErrorMessage, setSnackBarErrorMessage] = useState("")
  const [snackBarSuccess, setSnackBarSuccess] = useState(false)
  


  const allRequiredFieldsComplete = () => {
    return username !== '' && email !== '' && emailConfirmation !== '' && password !== '' && passwordConfirmation !== '' &&
      name !== '' && surname !== '';
  }

  const setRequiredFields = () => {
    if (username === '') {
      setRequiredUsername(true);
    }

    if (email === '') {
      setRequiredEmail(true);
    }

    if (emailConfirmation === '') {
      setRequiredEmailConf(true);
    }

    if (password === '') {
      setRequiredPass(true);
    }

    if (passwordConfirmation === '') {
      setRequiredPassConf(true);
    }

    if (name === '') {
      setRequiredName(true);
    }

    if (surname === '') {
      setRequiredSurname(true);
    }
  }

  const redirect = (view) => {
    history.push(view);
  }


  const submitRegistry = async () => {
    if (allRequiredFieldsComplete()) {
        setLoading(true);
        const resp = await AuthenticationService.register(username, password,email,name,surname,city,adult);
        if (resp.status === 200) {
          setSnackBarSuccess(true);
          setTimeout(() => {
            setLoading(false);
            setSnackBarSuccess(false);
            redirect("/");
          }, 1500);
        } else {
          setLoading(false);
          setSnackBarError(true);
          setSnackBarErrorMessage(resp.data);
          setTimeout(() => {
            setSnackBarError(false);
          }, 1500);
          return 
        }
    }
    setRequiredFields();
  }

  return (
    <Layout registry>
      { isLoading && <Loading /> }
      <div className="registry-page">
        <Title>Registro</Title>
        <div className="registry-container">
          <div className="registry-data">
            <Subtitle>Datos de la cuenta</Subtitle>
            <div className="registry-account-data__inputs">
            <TextInput
                id="username"
                label="Nombre de Usuario"
                value={username}
                placeholder="Nombre de Usuario"
                type="username"
                onChange={setUsername}
                required={requiredUsername}
              />
              <TextInput
                id="email"
                label="Correo electr??nico"
                value={email}
                placeholder="Correo electr??nico"
                type="email"
                onChange={setEmail}
                required={requiredEmail}
              />
              <TextInput
                id="email-confirmation"
                label="Confirmar correo electr??nico"
                value={emailConfirmation}
                placeholder="Confirmar correo electr??nico"
                type="email"
                onChange={setEmailConfirmation}
                required={requiredEmailConf}
              />

              <TextInput
                id="password"
                label="Contrase??a"
                value={password}
                placeholder="Contrase??a"
                type="password"
                onChange={setPassword}
                required={requiredPassConf}
              />
              <TextInput
                id="passwordConfirmation"
                label="Confirmar contrase??a"
                value={passwordConfirmation}
                placeholder="Confirmar contrase??a"
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
                id="surname"
                label="Apellido"
                value={surname}
                placeholder="Apellido"
                type="text"
                required={requiredSurname}
                onChange={setSurname}
              />
              <TextInput
                id="city"
                label="Localidad"
                value={city}
                placeholder="Localidad"
                type="text"
                onChange={setCity}
              />
              <Checkbox
                id="adult"
                label="Soy mayor de 18 a??os"
                checked={adult}
                onClick={() => setAdult(!adult)}
              />
            </div>
          </div>
        </div>
        <div className="registry-button">
          <Button primary onClick={() => submitRegistry()}>Registrarme</Button>
          <Link className="login-button" onClick={() => redirect('/')}>Volver al Log In</Link>
        </div>
      </div>
      <Snackbar
            type="error"
            show={snackBarError}
            message={snackBarErrorMessage}
          >
      </Snackbar>
      <Snackbar
            type="success"
            show={snackBarSuccess}
            message="Registro completado con ??xito"
          >
      </Snackbar>
    </Layout>
  );
}

export default Registry;
