import React from 'react';
import { Link } from 'react-router-dom';


export default function SignIn({ onSignIn }) {

  return (
    <div>
      <div>
        <h6>
          Sign in
        </h6>
        <form
          onSubmit={(e) => e.preventDefault()}
          noValidate
        >
          <input
            required
            id="email"
            placeholder="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <input
            required
            name="password"
            placeholder="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <button
            type="submit"
            onClick={onSignIn}
          >
            Sign In
          </button>
          <Link to="/auth/signup">{"Don't have an account? Sign Up"}</Link>
        </form>
      </div>
    </div>
  );
}
