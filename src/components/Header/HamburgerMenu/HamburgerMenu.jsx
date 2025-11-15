import { useState } from 'react';
import { Squash as Hamburger } from 'hamburger-react';
import { Link } from 'react-router-dom';

export default function HamburgerMenu({ userEmail, onSignOut }) {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className='menu-container'>
      <Hamburger size='24' toggled={isOpen} toggle={setOpen} />
      {isOpen && (
        <ul className='menu-list'>
          <li className='menu-items'>
            <p className='menu-item-email'>{userEmail}</p>
          </li>
          <li className='menu-items'>
            <Link className='menu-item-close-session' onClick={onSignOut}>
              Cerrar sesión
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
