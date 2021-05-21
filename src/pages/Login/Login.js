import React, { useState } from 'react';

import { useHistory } from "react-router-dom";

import Layout from "../../components/Layout"
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import Link from "../../components/Link";
import Logo from "../../components/Logo";


const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirect = (view) => {
    history.push(view);
  }

  return (
    <Layout login>
      <div className="login-container">
        <Logo />
        <div className="login-inputs">
          <TextInput
            label="Correo electrónico"
            placeholder="Correo electrónico"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <TextInput
            label="Contraseña"
            placeholder="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
        <div className="login-button">
          <Button primary onClick={() => redirect('/home')}>Iniciar Sesión</Button>
        </div>
        <div className="login-registry-section">
          <Link onClick={() => redirect('/registry')}>¿No tenés cuenta? Registrate</Link>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
