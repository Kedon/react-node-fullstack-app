import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Router, Redirect, BrowserRouter, Route, Switch } from 'react-router-dom';

import { createBrowserHistory } from 'history';

import Header from './components/Header';
import AuthApp from './components/AuthApp';

// import DashboardApp from "./components/DashboardApp";

import { productsService } from "./services"

const ChatwebAppLazy = lazy(() => import('./components/ChatwebApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));


const Fake = () => {
  return <div>
    Fake
  </div>
}

const history = createBrowserHistory();

const App = () => {

  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleFunctionOne = () => {

  }

  const handleFunctionTwo = () => {

  }

  history.listen((location, action) => {
    console.log(`The current route is ${location.pathname}`);
  });

  const handleUserData = (data) => {
    setIsSignedIn(data ? true : false)
  }



  return (
        <Router history={history}>
          
          <div>
          <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
          <AuthApp onSignIn={() => setIsSignedIn(true)} userData={(data) => {
                  console.warn(data)
                  console.log('userData')
          }}/>
          <Suspense fallback={<div>Carregando</div>}>
            <Switch>
              <Route exact path="/chatweb/landing" component={ChatwebAppLazy} />
              <Route path="/container-main">
                <div>Container main</div>
              </Route>
            </Switch>
          </Suspense>
          </div>
        </Router>
  );
};

export default App;
