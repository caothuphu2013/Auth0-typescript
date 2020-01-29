import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createBrowserHistory } from "history";

import { Auth0Provider } from './components/Auth/Auth0Wrapper';
import { auth0Configs } from './configs/auth';
import * as serviceWorker from './serviceWorker';
import './styles/index.scss';

const history = createBrowserHistory();

const onRedirectCallback = (appState?: any) => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};


ReactDOM.render(<Auth0Provider
  domain={auth0Configs.domain}
  client_id={auth0Configs.clientId}
  redirect_uri={window.location.origin}
  onRedirectCallback={onRedirectCallback}
>
  <App />
</Auth0Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
