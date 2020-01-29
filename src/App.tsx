import React from 'react';

import { Switch, Route, Router } from 'react-router-dom';
import PrivateRoute from './routes/privateRoute';
import HomePage from './pages/HomePage/HomePage';
import BookPage from './pages/BookPage/BookPage';
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const App: React.FC = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <PrivateRoute path="/books" component={BookPage} />
      </Switch>
    </Router>
  );
}

export default App;
