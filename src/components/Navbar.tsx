/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  navbarStyles,
  titleApp,
  burgers,
  dropdownMenu,
} from '../assets/styles';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav css={navbarStyles}>
      <h1 css={titleApp}>
        <Link to={`/`}>TopManga</Link>
      </h1>
      <div>
        <span css={burgers} onClick={toggleMenu}>
          {isMenuOpen ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
              />
            </svg>
          )}
        </span>
      </div>
      {isMenuOpen && (
        <div css={dropdownMenu}>
          <ul>
            <li>
              <Link to={`/`}>Home</Link>
            </li>
            <li>
              <Link to={`/collections`}>Collections</Link>
            </li>
            <span>
              <p>Built with love</p>
            </span>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
