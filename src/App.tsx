import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import history from './services/history';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { darkTheme } from './theme';
import EmailVerification from './pages/EmailVerification';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import 'src/assets/css/react-toastify-override.css';
import PhoneNumberVerification from './pages/PhoneNumberVerification';
import EmailVerificationEndPoint from './pages/EmailVerificationEndPoint';
import Newsfeed from './pages/Newsfeed';
import Guest from './composables/Guest';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router history={history}>
        <Switch>
          <Route path="/login" exact>
            <Guest>
              <Login />
            </Guest>
          </Route>
          <Route path="/verify/email/endpoint" exact>
            <EmailVerificationEndPoint />
          </Route>
          <Route path="/verify/email" exact>
            <EmailVerification />
          </Route>
          <Route path="/verify/phone-number" exact>
            <PhoneNumberVerification />
          </Route>
          <Route path="/" exact>
            <Newsfeed />
          </Route>
        </Switch>
      </Router>
      <ToastContainer limit={3} />
    </ThemeProvider>
  );
};

export default App;
