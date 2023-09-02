import React from 'react';
import { Link } from 'react-router-dom';

export default function SignUp({ onSignIn }) {

  return (
    <div>
      <div>
        <h5>
          Sign up
        </h5>
        <form
          onSubmit={(e) => e.preventDefault()}
          noValidate
        >
              <input
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
              <input
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
              <input
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              <input
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
          <button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={onSignIn}
          >
            Sign Up
          </button>
          <Link to="/">Already have an account? Sign in</Link>
        </form>
      </div>
    </div>
  );
}
