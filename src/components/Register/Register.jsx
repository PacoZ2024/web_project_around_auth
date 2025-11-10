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
    <form onSubmit={handleSubmit}>
      <input
        id='email'
        name='email'
        type='email'
        value={data.email}
        onChange={handleChange}
        placeholder='Correo electrónico'
        required
      />
      <input
        id='password'
        name='password'
        type='password'
        value={data.password}
        onChange={handleChange}
        placeholder='Contraseña'
        required
      />
      <button type='submit'>Registrarse</button>
    </form>
  );
}
