import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "../../styles/myprofile.css";
import { Context } from "../store/appContext";
// import { useResolvedPath } from "react-router-dom";
import { useResolvedPath } from "react-router-dom";
import { Link } from "react-router-dom"
import { FaSquareTwitter, FaInstagram } from "react-icons/fa6";

export const MyProfile = () => {
  const {store, actions} = useContext(Context);
  const [profile, setProfile] = useState({});
  let user= store.currentUser
  console.log(user)
  const getProfile = async() => {
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
      const response = await fetch(store.backurl + "/api/profile", opts)
      const data = await response.json()
      console.log(data)
      setProfile(data)
    } catch (error) {console.error(error)}
  }

  useEffect(()=>{
    actions.syncSessionToStore()
    getProfile();
  },[]);
  


  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
            <div className="card p-4">
              <div className=" image d-flex flex-column justify-content-center align-items-center">
                <button class="btn btn-secondary">
                  <img
                    src="https://www.publicdomainpictures.net/pictures/240000/nahled/woman-holding-book.jpg"
                    height="100"
                    width="100"
                  />
                </button>
                <span class="name">Paige B</span>
                <span class="idd">@paigebreads</span>
                <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                  <span class="location">
                    <address>Miami, Fl</address>
                  </span>
                </div>
                <div className="d-flex flex-row justify-content-center align-items-center">
                  <span class="number"> I've read <em>{profile.number_books_read}</em> books
                  </span>{" "}
                </div>
                <div className="text mt-3">
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
                    <FaSquareTwitter/>
                  </span>
                  <span>
                    <FaInstagram/>
                  </span>
                </div>
                <Link to={"/updateprofile"}>
                <button className="update-profile-btn">Edit Profile</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-8" right>
          <div className="fave-book">
            <h5 class="card-header">My Favorite Book is..</h5>
            <div class="card-body">
              <h5 class="card-title">{profile.favorite_book}</h5>
            </div>
          </div>
          <div className="fave-genres">
            <div className="card-header">My favorite Book Genre is....</div>
            <div className="body">
              <p>{profile.favorite_genres}</p>
            </div>
          </div>
          <div className="card-fave-quote">
            <div className="card-header">
              All time Favorite Quote from a book is....
            </div>
            <div className="card-body">
              <blockquote class="blockquote mb-0">
                <p>{profile.favorite_quotes}</p>
              </blockquote>
            </div>
          </div>
          <div className="card-fave-author">
            <div className="card-header">My Favorite Author is....</div>
            <div className="card-body">
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
