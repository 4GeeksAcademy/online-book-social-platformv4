import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "../../styles/myprofile.css";
import { Context } from "../store/appContext";

export const MyProfile = () => {
  const {store, actions} = useContext(Context)
  const [profile, setProfile] = useState({})
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
      {/* <div> */}
      {/* <p class="center">
            <em>Hi, Im Laura M.</em>
          </p>
          <img
            src="https://cdn-prod.medicalnewstoday.com/content/images/articles/320/320377/a-woman-reading-a-book.jpg"
            height="10%"
            width="10%"
            class="center"
            alt="..."
          />
          <p class="alltime-fave">My All Time Favorite Book is....</p> */}
      <div class="row">
        <div class="col-6">
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
                <span class="name mt-3">Paige B</span>
                <span class="idd">@paigebreads</span>
                <div class="d-flex flex-row justify-content-center align-items-center gap-2">
                  <span class="location">
                    <i class="fa-solid fa-location-dot">Miami, Fl</i>
                  </span>
                </div>
                <div class="d-flex flex-row justify-content-center align-items-center mt-3">
                  <span class="number">
                    55<span class="follow">Books</span>
                  </span>{" "}
                </div>
                <div class=" d-flex mt-2">
                  {" "}
                  <button class="btn1 btn-dark">Edit Profile</button>
                </div>
                <div class="text mt-3">
                  <span>
                    Eleanor Pena <br></br> Artist/ Creative Director by Day #NFT
                    minting@ with FND night.
                    <br></br>I've read over books.
                  </span>
                </div>
                <div class="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
                  <span>
                    <i class="fa-brands fa-square-twitter"></i>
                  </span>
                  <span>
                    <i class="fa-sharp fa-light fa-face-smile"></i>
                  </span>
                  <span>
                    <i class="fa fa-instagram"></i>
                  </span>
                  <span>
                    <i class="fa fa-linkedin"></i>
                  </span>
                </div>
                <div class=" px-2 rounded mt-4 date ">
                  <span class="join">Joined May,2021</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="card p-2">
            <h5 class="card-header">My Favorite Book is..</h5>
            <div class="card-body">
              <h5 class="card-title">Book Title</h5>
              <span class="card-text">-Author</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4">
          <p class="fave-genres">
            These are my favorite book genres and favorite book to match...
          </p>
          <div class="list-group">
            <a
              href="https://www.amazon.com/Arrangement-Robyn-Harding/dp/1471179850/ref=asc_df_1471179850/?tag=hyprod-20&linkCode=df0&hvadid=459559487726&hvpos=&hvnetw=g&hvrand=782308990965822173&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9011925&hvtargid=pla-872078274841&psc=1"
              class="list-group-item"
              aria-current="true"
            >
              Romance
            </a>
            <a
              href="https://www.audible.com/pd/Fairy-Tale-Audiobook/B09R62PV4B?source_code=GPAGBSH0508140001&ipRedirectOverride=true&gclid=Cj0KCQjw4s-kBhDqARIsAN-ipH2gqPog3P0_d2CNtjpoqSEL_7sT6uGMlEMyKqf6dDQQuZDS1IawpRcaAvG9EALw_wcB&gclsrc=aw.ds"
              class="list-group-item"
            >
              Horror
            </a>
            <a
              href="https://www.amazon.com/Family-Across-Street-unputdownable-psychological/dp/1800198272/ref=sr_1_28?hvadid=241916109245&hvdev=c&hvlocphy=9052452&hvnetw=g&hvqmt=e&hvrand=15234794711511266055&hvtargid=kwd-315402524133&hydadcr=22534_10344589&keywords=best+nonfiction&qid=1687438602&sr=8-28"
              class="list-group-item"
            >
              Non Fiction
            </a>
            <a
              href="https://www.amazon.com/Get-Out-Your-Own-Self-Defeating/dp/0399519904/ref=asc_df_0399519904/?tag=hyprod-20&linkCode=df0&hvadid=312049124368&hvpos=&hvnetw=g&hvrand=15327211626945740608&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9052452&hvtargid=pla-536600035619&psc=1&tag=&ref=&adgrpid=61851652213&hvpone=&hvptwo=&hvadid=312049124368&hvpos=&hvnetw=g&hvrand=15327211626945740608&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9052452&hvtargid=pla-536600035619"
              class="list-group-item"
            >
              Self Development
            </a>
            <a
              href="https://www.amazon.com/Higher-Waiting-Tyler-Perry/dp/0812989341/ref=asc_df_0812989341/?tag=hyprod-20&linkCode=df0&hvadid=312064602668&hvpos=&hvnetw=g&hvrand=4448971929507229872&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9052452&hvtargid=pla-395708482557&psc=1"
              class="list-group-item list-group-item-action"
            >
              Biography
            </a>
          </div>
        </div>
      {/* </div>
      </div>
      <div class="row">
        
      </div>
      <p class="book-collection row">
        These are a few books that are a part of my collection...
      </p>
      <div
        id="carouselExampleSlidesOnly"
        class="carousel-slide column"
        data-bs-ride="carousel"
      >
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1559563270i/16256798.jpg"
              height="500"
              class="image-class"
              alt="..."
            />
          </div>
          <div class="carousel-item">
            <img
              src="https://books.google.com/books/content?id=sQYqRCIhFAMC&pg=PP1&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U1fNlZ6KPWOf0nRv3eTLr29-HZ5bw&w=1280"
              height="500"
              class="image-class"
              alt="..."
            />
          </div>
          <div class="carousel-item">
            <img
              src="https://books.google.com/books/publisher/content?id=EHiLDQAAQBAJ&pg=PP1&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U1FwdKzUlJEm31ppz-huBNucs4JHQ&w=1280"
              height="500"
              class="image-class"
              alt="..."
            />
          </div>
        </div>
      </div>

      <div class="card-fave-quote">
        <div class="card-header">
          All time Favorite Quote from a book is....
        </div>
        <div class="card-body">
          <blockquote class="blockquote mb-0">
            <p>A well-known quote, contained in a blockquote element.</p>
            <footer class="blockquote-footer">
              Someone famous in <cite title="Source Title">Source Title</cite>
            </footer>
          </blockquote>
        </div>
      </div> */}
    </div>
  );
};
