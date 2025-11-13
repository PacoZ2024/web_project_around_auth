import { Link } from 'react-router-dom';
import { useState } from 'react';
import Popup from '../Main/components/Popup/Popup';
import * as auth from '../../utils/auth.js';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

export default function Register({
  popup,
  onOpenPopup,
  onClosePopup,
  onClosePopupRegister,
}) {
  const [data, setData] = useState({ email: '', password: '' });
  const [isSuccess, setIsSuccess] = useState(false);

  function infoTooltip(isSuccess, message) {
    return {
      children: <InfoTooltip isSuccess={isSuccess} message={message} />,
    };
  }

  async function handleRegister({ email, password }) {
    await auth
      .register(email, password)
      .then(() => {
        setIsSuccess(true);
        onOpenPopup(infoTooltip(true, '¡Correcto! Ya estás registrado.'));
        setTimeout(() => {
          onClosePopupRegister();
        }, 5000);
      })
      .catch(() => {
        setIsSuccess(false);
        onOpenPopup(
          infoTooltip(
            false,
            'Uy, algo salió mal. Por favor, inténtalo de nuevo.'
          )
        );
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
    handleRegister(data);
  }

  return (
    <main className='session'>
      <form className='session__form' onSubmit={handleSubmit} noValidate>
        <legend className='session__form_title'>Regístrate</legend>
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
          Regístrate
        </button>
        <Link to='/signin' className='session__form_link'>
          ¿Ya eres miembro? Inicia sesión aquí
        </Link>
      </form>
      {popup && (
        <Popup onClose={isSuccess ? onClosePopupRegister : onClosePopup}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
