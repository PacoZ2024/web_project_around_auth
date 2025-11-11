import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Register({ handleRegister }) {
  const [data, setData] = useState({ email: '', password: '' });

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
    </main>
  );
}
