import React from 'react';
import HeaderDesktop from '../HeaderDesktop/HeaderDesktop';
import HeaderMobile from '../HeaderMobile/HeaderMobile';
import { useAuth0 } from '../Auth/Auth0Wrapper';

const Header: React.FC = () => {
  const { loginWithRedirect, logout } = useAuth0();
  const handleLogin = () => loginWithRedirect({ appState: { targetUrl: '/books' } });
  const handleLogout = () => logout();

  return (
    <>
      <HeaderDesktop handleLogin={handleLogin} handleLogout={handleLogout} />
      <HeaderMobile handleLogin={handleLogin} handleLogout={handleLogout} />
    </>
  )
}

export default Header;