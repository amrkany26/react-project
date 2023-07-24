import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "./AuthContext";

import './sign.css';

const SignIn = () => {
  const { signIn, user } = useContext(AuthContext);

  const handleSignIn = (e) => {
    e.preventDefault();
    // Handle sign-in logic
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    signIn(email, password);

    window.alert("You've signed in, welcome back!");

  };

  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user.name}!</h2>
        </div>
      ) : (
        <div>
          <h1 className="signin-title">Sign In</h1>
          <div className="signin-form">
            <form onSubmit={handleSignIn}>
              <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />
              </div>
              <button type="submit" className="signin-button">
                Sign In
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;


  