import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "../../styles/myprofile.css";
import { Context } from "../store/appContext";
import { useResolvedPath } from "react-router-dom";
import { Link } from "react-router-dom"

export const MyProfile = () => {
  const {store, actions} = useContext(Context)
  const [profile, setProfile] = useState({})
  let user= store.currentUser
  console.log(user)
  const getProfile = async() => {
    const opts = {
      method: "GET",
      mode: "cors",
      headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + store.token
      }
    }
    try {
      const response = await fetch(store.backurl + "/api/profile", opts)
      const data = await response.json()
      console.log(data)
      setProfile(data)
    } catch (error) {console.error(error)}
  }

  useEffect(()=>{
    getProfile()
  },[])
  


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
                <div class="text mt-3">
                  <p class="profile_info">
                {/* //Need to update users to be able to use here// */}
                    {user?user.name:""}<br></br> 
                    {user?user.profession:""}<br></br>
                    {user?user.bio:""}<br></br>
                    Twitter: {user?user.twitter_username:""}<br></br>
                    Instagram: {user?user.ig_username:""}<br></br>
                  </p>
                </div>
                <div class="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
                  <span>
                  <i class="fa fa-twitter" aria-hidden="true"></i>
                  </span>
                  <span>
                  <i class="fa-brands fa-instagram"></i>
                  </span>
                </div>
                <Link to={"/updateprofile"}>
                <button>Edit Profile</button>
                </Link>
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
