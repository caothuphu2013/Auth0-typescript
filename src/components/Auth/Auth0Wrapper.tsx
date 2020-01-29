import React, { createContext, useContext, useState, useEffect } from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

export interface Auth0Context {
  isAuthenticated: boolean,
  user?: any,
  loading: boolean,
  popupOpen: boolean,
  loginWithPopup: (options?: PopupLoginOptions) => Promise<void>,
  handleRedirectCallback: () => Promise<void>,
  getIdTokenClaims: (options?: getIdTokenClaimsOptions) => Promise<IdToken>,
  loginWithRedirect: (options?: RedirectLoginOptions) => Promise<void>,
  getTokenSilently: (options?: GetTokenSilentlyOptions) => Promise<any>,
  getTokenWithPopup: (options?: GetTokenWithPopupOptions) => Promise<string>,
  logout: (options?: LogoutOptions) => void;
}

interface Auth0ProviderProps extends Auth0ClientOptions {
  children: any;
}

export const Auth0Context = createContext<Auth0Context>({} as Auth0Context);
export const useAuth0 = () => useContext(Auth0Context);

export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...auth0Options
}: Auth0ProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();
  const [auth0Client, setAuth0] = useState();
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(auth0Options);

      //dispatch(authActions.setAuth0Client(auth0Client));
      setAuth0(auth0FromHook);

      if (window.location.search.includes("code=") &&
        window.location.search.includes("state=")) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }


      const isAuthenticated = await auth0FromHook.isAuthenticated();
      setIsAuthenticated(isAuthenticated);
      
      if (isAuthenticated) {
        const user = await auth0FromHook.getUser();
        setUser(user);
      }
      setLoading(false);
    }

    initAuth0();

  }, []);

  const loginWithPopup = async (options?: PopupLoginOptions) => {
    setPopupOpen(true);
    try {
      await auth0Client.loginWithPopup(options);
    } catch (error) {
      console.log(error);
    } finally {
      setPopupOpen(false);
    }

    const user = await auth0Client.getUser();
    setUser(user);
    setIsAuthenticated(true);
  }

  const handleRedirectCallback = async () => {
    setLoading(true);
    await auth0Client.handleRedirectCallback();
    const user = await auth0Client.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(user);
  };

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (options?: getIdTokenClaimsOptions) => auth0Client.getIdTokenClaims(options),
        loginWithRedirect: (options?: RedirectLoginOptions) => auth0Client.loginWithRedirect(options),
        getTokenSilently: (options?: GetTokenSilentlyOptions) => auth0Client.getTokenSilently(options),
        getTokenWithPopup: (options?: GetTokenWithPopupOptions) => auth0Client.getTokenWithPopup(options),
        logout: (options?: LogoutOptions) => auth0Client.logout(options)
      }}
    >
      {children}
    </Auth0Context.Provider>
  )
}