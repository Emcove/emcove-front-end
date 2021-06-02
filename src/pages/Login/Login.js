import React, { useState } from 'react';

import { useHistory } from "react-router-dom";

import Layout from "../../components/Layout";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import Link from "../../components/Link";
import Logo from "../../components/Logo";


const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [requiredEmail, setRequiredEmail] = useState(false);
  const [requiredPass, setRequiredPass] = useState(false);

  const redirect = (view) => {
    history.push(view);
  }

  const submitForm = () => {
    if (email !== '' && password !== '') {
      redirect('/home');
    }
    
    if (email === '') {
      setRequiredEmail(true);
    }
    if (password === '') {
      setRequiredPass(true);
    }
  }

  return (
    <Layout login>
      <div className="login-container">
        <Logo />
        <div className="login-inputs">
          <TextInput
            label="Correo electrónico"
            placeholder="Correo electrónico"
            type="email"
            value={email}
            required={requiredEmail}
            id="email"
            onChange={setEmail}
          />
          <TextInput
            label="Contraseña"
            placeholder="Contraseña"
            type="password"
            id="password"
            value={password}
            required={requiredPass}
            onChange={setPassword}
          />
        </div>
        <div className="login-button">
          <Button primary onClick={submitForm}>Iniciar Sesión</Button>
        </div>
        <div className="login-registry-section">
          <Link onClick={() => redirect('/registry')}>¿No tenés cuenta? Registrate</Link>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
