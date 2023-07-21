import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const CreateAccount = () => {
  const {store, actions} = useContext(Context)
  const handleSubmit = (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const profession = event.target.profession.value;å
    const bio = event.target.bio.value;
    const twitter_username = event.target.twitter_username.value;
    const ig_username = event.target.ig_username.value;

    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div>
      <h3>Create Account</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <label htmlFor="username">Name:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div>
          <label htmlFor="email">Email Address:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div>
          <label htmlFor="profession">Profession:</label>
          <input type="text" id="profession" name="profession" />
        </div>
        <div>
          <label htmlFor="bio">Bio:</label>
          <input type="text" id="bio" name="bio" />
        </div>
        <div>
          <label htmlFor="twitter_username">Twitter Username:</label>
          <input type="text" id="twitter_username" name="twitter" />
        </div>

        <div class="input-group mb-3">
          <label htmlFor="ig_username">IG</label>
          <span class="input-group-text"id="basic-addon1">
          </span>
          <input
            type="text" id="ig_username" name="ig_username"
            class="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
          </div>
        <div>
          <label htmlFor="ig_username">IG Username:</label>
          <input type="text" id="ig_username" name="ig" />
        </div>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};
