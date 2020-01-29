import React, { ComponentType, useEffect, Component } from 'react';
import { useAuth0 } from '../components/Auth/Auth0Wrapper';
import { Route } from 'react-router-dom';

interface PrivateRouteProps {
  component: ComponentType,
  path: string
}

const PrivateRoute = ({ component, path, ...rest }: PrivateRouteProps) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      return;
    }

    const login = async () => {
      await loginWithRedirect({ appState: { targetUrl: path } });
    }

    login();

  }, [isAuthenticated, path, loginWithRedirect]);

  const render = (props: any) => isAuthenticated ? <Component {...props} /> : null;

  return <Route path={path} render={render} {...rest} />
};

export default PrivateRoute;