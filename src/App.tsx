import { CssBaseline, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import 'src/assets/css/react-toastify-override.css';
import './App.css';
import Guest from './composables/Guest';
import EmailVerification from './pages/EmailVerification';
import EmailVerificationEndPoint from './pages/EmailVerificationEndPoint';
import Login from './pages/Login';
import Newsfeed from './pages/Newsfeed';
import PhoneNumberVerification from './pages/PhoneNumberVerification';
import PostPage from './pages/Post';
import UserPage from './pages/User';
import history from './services/history';
import { darkTheme } from './theme';
import Main from 'src/layouts/Main';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router history={history}>
        <Switch>
          <Route exact path={['/', '/posts/:postId', '/users/:userId']}>
            <Main>
              <Switch>
                <Route path="/" exact>
                  <Newsfeed />
                </Route>
                <Route path="/posts/:postId" exact>
                  <PostPage />
                </Route>
                <Route path="/users/:userId" exact>
                  <UserPage />
                </Route>
              </Switch>
            </Main>
          </Route>
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
        </Switch>
      </Router>
      <ToastContainer limit={3} />
    </ThemeProvider>
  );
};

export default App;
