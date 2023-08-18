import React, {useContext} from 'react';
import Modal from '../component/modal';
import { Context} from '../store/appContext';
import CreateDiscussionModal from "../component/creatediscussionmodal"
import { Link } from 'react-router-dom';
import "../../styles/bookdiscussions.css"

export const BookDiscussions = () => {
  const {store, actions} = useContext(Context)
  return (
    <div className="DiscussionContainer justify-content-center d-flex flex-column mx-auto w-100">
      <div className="DiscussionsTop justify-content-center d-flex">
        <img className="mr-5 DisIcon" src="https://i.imgur.com/2Epcijr.png" height="100px" width="100px" />
        <div className="DiscussionForms ml-5">
          <h1 className="">Search What People Are Saying</h1>
          <div className="DiscussionDiv">
            <input placeholder="Search discussions..." className="rounded-pill search"></input>
            {/* <input placeholder="Search topics..." className="rounded-pill"></input> */}
          </div>

          <CreateDiscussionModal/>

        </div>
      </div>
      <div className="DiscussionsBottom w-75 d-flex justify-content-center">
        <div className="discussioncontainer">
          
        {
                    store.discussions.map((item,idx) => {
                        return (
                            <div className="discussion-card" key={idx}>
                                <p>{item.createdBy.name}</p>
                                <Link to={"/discussion/"+ item.id}><p>{item.title}</p></Link>
                            </div>
                        )
                    })
                }

        </div>

      </div>
    </div>
  );
};

