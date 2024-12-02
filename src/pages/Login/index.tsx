import React, { useEffect, useState } from 'react';
import Warning from '../../components/warning';
import styles from './style.module.css';
import verifyLogin from '../../utils/Auth';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../utils/cookieUtils';
import axios from "axios";


const Login = () => {
  const [message, setMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  
  useEffect(() => {
    const userCookie = getCookie("fable-auth-v.1.0.0");
    if (userCookie) {
      navigate('/home')
    }
  });

  const login = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const options = {
      method: 'POST',
      url: 'https://expert-barnacle-7v7gqv5pjwx43pq44-8080.app.github.dev/auth',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {email: email, password: password}
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
        document.cookie = `fable-auth-v.1.0.0=${encodeURIComponent(
          JSON.stringify(response.data.Bearer)
        )}; path=/; max-age=3600`; 
        navigate('/home')
    }).catch(function (error) {
        setMessage('E-mail ou senha inválidos.')
    });
  };

  return(
    <div className={styles.Container}>
      {message && <Warning message={message} status="failed"/>}
      <div className={styles.Modal}>
        <h1>Iniciar sessão</h1>
        <form className={styles.LoginForm} onSubmit={login}>
          <label htmlFor="">E-mail ou Username</label>
          <input 
            type="email" 
            placeholder='Digite o e-mail ou username'
            required 
            autoComplete="email"
            name='email'
          />

          <label htmlFor="">Senha</label>
          <input 
            type="password" 
            placeholder='Digite sua senha' 
            autoComplete="current-password" 
            required
            name='password'
          />

          <button>Iniciar sessão</button>
        </form>
        <a href="/register">Criar uma conta</a>
      </div>
    </div>
  )
};

export default Login;
