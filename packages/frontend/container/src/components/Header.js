import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export default function Header({ isSignedIn, onSignOut }) {
  const history = useHistory()
  const location = useLocation()
  const onClick = () => {
    if (isSignedIn && onSignOut) {
      onSignOut();
    }
  };

  useEffect(() => {
    // const { pathname } = location
    // if(!isSignedIn && (pathname !== '/' && pathname !== "/auth/signup")){
    //   history.push('/');
    // } else if(isSignedIn && (pathname === '/' || pathname === "/auth/signup")){
    //   history.push('/dashboard');
    // }
  }, [isSignedIn, location]);


  return (
    <div>
      <ul>
        <li onClick={onClick}>{isSignedIn ? 'Logout' : 'Login'}</li>
        <li onClick={() => history.push("/landing")}>Landing</li>
        <li onClick={() => history.push("/chatweb/landing")}>Chatweb</li>
      </ul>
    </div>
  );
}
