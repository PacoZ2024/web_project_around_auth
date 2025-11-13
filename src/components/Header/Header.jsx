import { Link } from 'react-router-dom';
import LogoAround from '../../assets/images/Logo.svg';

export default function Header({ link, text, userEmail, onSignOut }) {
  if (link && text)
    return (
      <header className='header'>
        <div className='header__line'>
          <img
            className='header__logo'
            src={LogoAround}
            alt='Logo Around The U.S.'
          />
          <Link className='header__link' to={link}>
            {text}
          </Link>
        </div>
      </header>
    );
  return (
    <header className='header'>
      <div className='header__line'>
        <img
          className='header__logo'
          src={LogoAround}
          alt='Logo Around The U.S.'
        />
        <div className='header__data'>
          <p className='header__email'>{userEmail}</p>
          <Link className='header__link_close-session' onClick={onSignOut}>
            Cerrar sesión
          </Link>
        </div>
      </div>
    </header>
  );
}
