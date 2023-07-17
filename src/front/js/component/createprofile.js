import React from "react";
import "../../styles/createprofile.css"

export const CreateProfile = () => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const favorite_book = event.target.favorite_book.value;
    const favorite_genre = event.target.favorite_genre.value;
    const favorite_author = event.target.favorite_author.value;
    // const password = event.target.password.value;
    // const profession = event.target.profession.value;å
    // const bio = event.target.bio.value;
    // const twitter_username = event.target.twitter_username.value;
    // const ig_username = event.target.ig_username.value;

    console.log("favorite_book:", favorite_book);
  };

  return (
    <div>
      <h3>Create Profile</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Favorite Book</label>
          <input type="text" id="name" name="name" required />
        </div>
        {/* <div>
          <label htmlFor="username">Favorite Genre:</label>
          <input type="text" id="username" name="username" required />
        </div> */}
        <section class="content">
          <span>Favorite Genre:</span>
          <ul class="list">
            <li class="list__item">
              <label class="label--checkbox">
                <input type="checkbox" class="checkbox" />
                Romance
              </label>
            </li>
            <li class="list__item">
              <label class="label--checkbox">
                <input type="checkbox" class="checkbox" />
                Comedy
              </label>
            </li>
            <li class="list__item">
              <label class="label--checkbox">
                <input type="checkbox" class="checkbox" />
                Biography
              </label>
            </li>
            <li class="list__item">
              <label class="label--checkbox">
                <input type="checkbox" class="checkbox" />
                Fiction
              </label>
            </li>
          </ul>
        </section>
        <div>
          <label htmlFor="name">Favorite Author:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div>
          <label htmlFor="name">Favorite Quote from a book:</label>
          <input type="text" id="quote" name="quote" required />
        </div>
  
        <button type="submit">Create Profile</button>
      </form>
      <div class="col-12">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="inlineFormCheck"
          />
          <label class="form-check-label" for="inlineFormCheck">
            Remember me
          </label>
        </div>
      </div>
    </div>
  );
};
