import { useEffect, useState } from 'react';
import verifyLogin from '../../utils/Auth';
import styles from './style.module.css';
import Warning from '../../components/warning';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../utils/cookieUtils';
import axios from 'axios';

const Register = () => {
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userCookie = getCookie("fable-auth-v.1.0.0");
    if (userCookie) {
      navigate('/home');
    }
  }, [navigate]);

  const register = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const nome = formData.get('fullname') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const passwordRepeat = formData.get('repeat-password') as string;

    // Verifica se as senhas coincidem
    if (password !== passwordRepeat) {
      setMessage('As senhas não coincidem.');
      return;
    }

  try {
      await axios.post('https://expert-barnacle-7v7gqv5pjwx43pq44-8080.app.github.dev/users/create', {
        username: nome,
        email: email,
        password: password,
        avatar: '' 
      });

      const authResponse = await axios.post('https://expert-barnacle-7v7gqv5pjwx43pq44-8080.app.github.dev/auth', null, {
        params: {
          email: email,
          password: password
        }
      });

      const token = JSON.stringify(authResponse.data.Bearer);  
      document.cookie = `fable-auth-v.1.0.0=${encodeURIComponent(token)}; path=/; max-age=3600`;

      navigate('/home');
    } catch (error) {
        setMessage('Erro ao registrar o usuário.');
    }
  };

  return (
    <div className={styles.Container}>
      {message && <Warning message={message} status="failed" />}
      <div className={styles.Modal}>
        <h1>Cadastre-se</h1>
        <form className={styles.LoginForm} onSubmit={register}>
          <label htmlFor="">Nome Completo</label>
          <input 
            type="text" 
            placeholder="Digite o seu nome completo"
            required 
            name="fullname" 
          />
          <label htmlFor="">E-mail</label>
          <input 
            type="email" 
            placeholder="Digite seu e-mail" 
            autoComplete="email" 
            required
            name="email" 
          />
          <label htmlFor="">Senha</label>
          <input 
            type="password" 
            placeholder="Digite sua senha" 
            required 
            name="password" 
          />
          <label htmlFor="">Repita sua senha</label>
          <input 
            type="password" 
            placeholder="Digite sua senha novamente" 
            required 
            name="repeat-password" 
          />
          <button type="submit">Criar conta</button>
        </form>
        <a href="/">Já tem uma conta? Faça login</a>
      </div>
    </div>
  );
};

export default Register;
