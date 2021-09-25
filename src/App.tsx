import { CssBaseline, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import 'src/assets/css/react-toastify-override.css';
import Main from 'src/layouts/Main';
import './App.css';
import Guest from './composables/Guest';
import Conversation from './pages/Conversation';
import EmailVerification from './pages/EmailVerification';
import EmailVerificationEndPoint from './pages/EmailVerificationEndPoint';
import Login from './pages/Login';
import Newsfeed from './pages/Newsfeed';
import PhoneNumberVerification from './pages/PhoneNumberVerification';
import Post from './pages/Post';
import Search from './pages/Search';
import User from './pages/User';
import history from './services/history';
import { darkTheme } from './theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router history={history}>
        <Switch>
          <Route
            exact
            path={[
              '/',
              '/posts/:postId',
              '/users/:userId',
              '/search',
              '/c/:conversationId',
            ]}
          >
            <Main>
              <Switch>
                <Route path="/" exact>
                  <Newsfeed />
                </Route>
                <Route path="/posts/:postId" exact>
                  <Post />
                </Route>
                <Route path="/users/:userId" exact>
                  <User />
                </Route>
                <Route path="/search" exact>
                  <Search />
                </Route>
                <Route path="/c/:conversationId" exact>
                  <Conversation />
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
