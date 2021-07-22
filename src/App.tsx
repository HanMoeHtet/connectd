import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import { history } from './services/history.service';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { darkTheme } from './theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router history={history}>
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
