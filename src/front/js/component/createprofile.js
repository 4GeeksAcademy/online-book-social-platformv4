import React, { useContext } from "react";
import "../../styles/createprofile.css"
import { number } from "prop-types";
import { Context }from "../store/appContext"

export const CreateProfile = () => {
  const {store, actions}= useContext(Context)
  const handleSubmit = (event) => {
    event.preventDefault();
  
    const favorite_book = event.target.favorite_book.value;
    const favorite_genres = event.target.favorite_genres.value;
    const favorite_author = event.target.favorite_author.value;
    const favorite_quote = event.target.favorite_quote.value;
    const number_books_read = event.target.number_books_read.value;
    // const password = event.target.password.value;
    // const profession = event.target.profession.value;å
    // const bio = event.target.bio.value;
    // const twitter_username = event.target.twitter_username.value;
    // const ig_username = event.target.ig_username.value;

    console.log("favorite_book:", favorite_book);
    console.log("favorite_genres:", favorite_genres);
    console.log("favorite_author:", favorite_author);
    console.log("favorite_quote:", favorite_quote);
    console.log("number_books_read", number_books_read);
    actions.createProfile(favorite_book, favorite_genres, favorite_author, number_books_read, favorite_quote)  
  };

    
  return (
    <div>
      <h3>Create Profile</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Favorite Book</label>
          <input type="text" id="name" name="favorite_book" required />
        </div>
        <select name="favorite_genres">
          <option value="romance">
            Romance
          </option>
          <option value="comedy">
            Comedy
          </option>
          <option value="fiction">
            Fiction
          </option>
          <option value="fiction">
            Non-Fiction
          </option>
          <option value="fiction">
            Biography
          </option>
          <option value="fiction">
            Self-Development
          </option>
        </select>
        <div>
          <label htmlFor="name">Number Books I Read</label>
          <input type="text" id="name" name="number_books_read"/>
        </div>
        <div>
          <label htmlFor="name">Favorite Author:</label>
          <input type="text" id="name" name="favorite_author" required />
        </div>
        <div>
          <label htmlFor="name">Favorite Quote from a book:</label>
          <input type="text" id="quote" name="favorite_quote" required />
        </div>
  
        <button type="submit">Create Profile</button>
      </form>
      
    </div>
  );
};
