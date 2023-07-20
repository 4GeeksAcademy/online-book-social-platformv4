import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "../../styles/myprofile.css";
import { Context } from "../store/appContext";
import { useResolvedPath } from "react-router-dom";

export const MyProfile = () => {
  const { store, actions } = useContext(Context);
  const [profile, setProfile] = useState({});
  const getProfile = async () => {
    const opts = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + store.token,
      },
    };
    try {
      const response = await fetch(store.backurl + "/api/profile", opts);
      const data = await response.json();
      console.log(data);
      setProfile(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="container">
      <div class="row">
        <div class="col-4">
          <div class="container mt-4 mb-4 p-3 d-flex justify-content-center">
            <div class="card p-4">
              <div class=" image d-flex flex-column justify-content-center align-items-center">
                <button class="btn btn-secondary">
                  <img
                    src="https://www.publicdomainpictures.net/pictures/240000/nahled/woman-holding-book.jpg"
                    height="100"
                    width="100"
                  />
                </button>
                <span class="name">Paige B</span>
                <span class="idd">@paigebreads</span>
                <div class="d-flex flex-row justify-content-center align-items-center gap-2">
                  <span class="location">
                    <address>Miami, Fl</address>
                  </span>
                </div>
                <div class="d-flex flex-row justify-content-center align-items-center">
                  <span class="number"> I've read <em>{profile.number_books_read}</em> books
                  </span>{" "}
                </div>
                <div class=" d-flex mt-2">
                  {" "}
                  <button class="btn1 btn-dark">Edit Profile</button>
                </div>
                <div class="text mt-3">
                  <p class="profile_info">
                {/* //Need to update users to be able to use here// */}
                    Name<br></br> 
                    Profession<br></br>
                    Bio<br></br>
                    Twitter<br></br>
                    Instagram<br></br>
                  </p>
                </div>
                <div class="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
                  <span>
                    <i class="fa-brands fa-square-twitter">Twitter</i>
                  </span>
                 
                  <span>
                    <i class="fa fa-instagram">Instagram</i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-8" right>
          <div class="fave-book">
            <h5 class="card-header">My Favorite Book is..</h5>
            <div class="card-body">
              <h5 class="card-title">{profile.favorite_book}</h5>
            </div>
          </div>
          <div class="fave-genres">
            <div class="card-header">My favorite Book Genre is....</div>
            <div class="body">
              <p>{profile.favorite_genres}</p>
            </div>
          </div>
          <div class="card-fave-quote">
            <div class="card-header">
              All time Favorite Quote from a book is....
            </div>
            <div class="card-body">
              <blockquote class="blockquote mb-0">
                <p>{profile.favorite_quotes}</p>
              </blockquote>
            </div>
          </div>
          <div class="card-fave-author">
            <div class="card-header">My Favorite Author is....</div>
            <div class="card-body">
              <blockquote class="blockquote mb-0">
                <p>{profile.favorite_author}</p>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
