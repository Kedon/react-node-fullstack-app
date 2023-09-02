import React, { useEffect } from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import SigninOidc from './pages/SigninOidc';
import useAuth from './hoc/useAuth';

import Signin from './components/Signin';
import Signup from './components/Signup';

export default ({ history, onSignIn, userData }) => {
  const { user, login, logout } = useAuth();

  useEffect(() => {
    userData && userData(user)
    const { location: {pathname} } = history
    console.log(pathname)
    if(user && pathname === '/callback'){
      history.push('/')
    }

  }, [user]);

  return (
    <div>
        <Router history={history}>
        <div>
            {user ? (
                <>
                    <h1>Welcome, {user.profile.name}</h1>
                    <button onClick={logout}>Logout</button>
                </>
            ) : (
                <button onClick={login}>Login</button>
            )}
        </div>
          <Switch>
            {/* <Route exact path="/" component={SigninOidc}/> */}
            <Route exact path="/callback" component={SigninOidc}/>
          </Switch>
        </Router>
    </div>
  );
};
