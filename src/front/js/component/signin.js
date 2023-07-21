<<<<<<< HEAD
import React, { useContext } from "react";
=======
import React, {useContext, useEffect} from "react";

import { useNavigate } from "react-router-dom";
>>>>>>> 383fe4d (cats updates)
import "../../styles/signin.css";
import { Context } from "../store/appContext";


export const SignIn = () => {
  const {store, actions} = useContext(Context)
  const handleSubmit = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;
    actions.login(email, password)
  };
useEffect(() => {
  if (store.token != "" && store.token != undefined) useNavigate("/")
}, [store.token, useNavigate()]) 
  return (
    <div className="signin-container">
      <div className="signin-form">
        <h3>Sign In</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
};
