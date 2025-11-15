import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useContext } from 'react';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

import Popup from '../Main/components/Popup/Popup.jsx';
import InfoTooltip from '../InfoTooltip/InfoTooltip.jsx';
import * as auth from '../../utils/auth.js';
import { setToken } from '../../utils/token.js';

export default function Login({
  popup,
  onOpenPopup,
  onClosePopup,
  setUserEmail,
}) {
  const [data, setData] = useState({ email: '', password: '' });
  const { setIsLoggedIn } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const location = useLocation();

  async function handleLogin({ email, password }) {
    if (!email || !password) {
      return;
    }

    await auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          setUserEmail(email);
          setIsLoggedIn(true);
          const redirectPath = location.state?.from?.pathname || '/';
          navigate(redirectPath);
        }
      })
      .catch(() => {
        onOpenPopup({
          children: (
            <InfoTooltip
              isSuccess={false}
              message={'Uy, algo salió mal. Por favor, inténtalo de nuevo.'}
            />
          ),
        });
      });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!data.email || !data.password)
      onOpenPopup({
        children: (
          <InfoTooltip
            isSuccess={false}
            message={'Uy, algo salió mal. Por favor, inténtalo de nuevo.'}
          />
        ),
      });
    handleLogin(data);
  }

  return (
    <main className='session'>
      <form className='session__form' onSubmit={handleSubmit} noValidate>
        <legend className='session__form_title'>Inicia sesión</legend>
        <input
          className='session__form_field session__form_field-email'
          id='email'
          name='email'
          type='email'
          value={data.email}
          onChange={handleChange}
          placeholder='Correo electrónico'
          required
        />
        <input
          className='session__form_field session__form_field-password'
          id='password'
          name='password'
          type='password'
          value={data.password}
          onChange={handleChange}
          placeholder='Contraseña'
          required
        />
        <button className='session__form_button' type='submit'>
          Inicia sesión
        </button>
        <div className='session__content_form_link'>
          <Link to='/signup' className='session__form_link'>
            ¿Aún no eres miembro? Regístrate aquí
          </Link>
        </div>
      </form>
      {popup && <Popup onClose={onClosePopup}>{popup.children}</Popup>}
    </main>
  );
}
