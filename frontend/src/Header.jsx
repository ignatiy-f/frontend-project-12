import React, { useState } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const [isLogin, setLoginState] = useState(!!localStorage.getItem('userId'));
  const location = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    setLoginState(false);
    if (location.pathname === '/') {
      navigate('login');
    }
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Link className="navbar-brand" to="/">{t('header.link')}</Link>
        {isLogin && <Button onClick={logOut}>{t('header.btn')}</Button>}
      </Container>
    </Navbar>
  );
};

export default Header;