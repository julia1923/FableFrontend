import { useEffect, useState } from 'react';
import verifyLogin from '../../utils/Auth';
import styles from './style.module.css';
import Warning from '../../components/warning';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../utils/cookieUtils';


const Register = () =>{
  const [message, setMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const userCookie = getCookie("fable-auth-v.1.0.0");
    if (userCookie) {
      navigate('/home')
    }
  });

  
  const register = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const nome = formData.get('fullname') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const passwordRepeat = formData.get('repeat-password') as string;

    const matchedUser = verifyLogin(email, password);

    console.log("Parameto: ", nome)
    console.log("Parameto: ",email)
    console.log("Parameto: ",password)
    console.log("Parameto: ",passwordRepeat)

    if (matchedUser == null && passwordRepeat == password) {
      document.cookie = `fable-auth-v.1.0.0=${encodeURIComponent(
        JSON.stringify({
          name: nome, 
          email: email, 
          password: password 
        })
      )}; path=/; max-age=3600`; 
      navigate('/home')
    } else {
      setMessage('E-mail ou senha inválidos.');
    }
  };

  return(
    <div className={styles.Container}>
    {message && <Warning message={message} status="failed"/>}
    <div className={styles.Modal}>
      <h1>Cadastre-se</h1>
      <form className={styles.LoginForm} onSubmit={register}>
        <label htmlFor="">Nome Completo</label>
        <input 
          type="name" 
          placeholder='Digite o seu nome completo'
          required 
          name='fullname'
        />
        <label htmlFor="">E-mail</label>
        <input 
          type="email" 
          placeholder='Digite seu e-mail' 
          autoComplete="email" 
          required
          name='email'
        />

        <label htmlFor="">Senha</label>
        <input 
          type="password" 
          placeholder='Digite sua senha' 
          required
          name='password'
        />

      <label htmlFor="">Repita sua senha</label>
        <input 
          type="password" 
          placeholder='Digite sua senha novamente' 
          required
          name='repeat-password'
        />
        <button>Criar conta</button>
      </form>
      <a href="/">Login</a>
    </div>
  </div>
  )
}

export default Register;