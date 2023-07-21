import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import CreateCommentModal from "../component/CreateCommentModal";
import "../../styles/discussionfull.css"

export const DiscussionFull = (props) => {
    const { store, actions } = useContext(Context);
    const [discussion, setDiscussion] = useState(false)
    const params = useParams();
    // console.log(discussion);
    const fetchDiscussion = async () => {
        try {
            const res = await fetch(store.backurl + "/api/discussions/"+ params.id);
            const data = await res.json();
                setDiscussion(data)
        } catch (error) {console.error(error)}
    }
    useEffect(() => {
        fetchDiscussion()
        actions.syncSessionToStore()
    },[])
    // create comment to discussion
    const createComment = async (discussion_id, comment) => {
        // console.log("MADE IT TO THIS SHIT");
        const opts = {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            //   Authorization: "Bearer " + store.token
            },
            body: JSON.stringify({
                discussion_id: discussion_id,
                comment: comment,
            }),
        };
        try {
            const res = await fetch(store.backurl + "/api/comment", opts);
            const data = await res.json();
                setDiscussion(data)
        } catch (error) {console.error(error)}
    }
    // replay to comments
    const createSubComment = async (discussion_id, comment, parent_id) => {
        console.log("DiscussionID",discussion_id);
        console.log("COMMENT",comment);
        console.log("parent_id",parent_id);
        const opts = {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            //   Authorization: "Bearer " + store.token
            },
            body: JSON.stringify({
                discussion_id: discussion_id,
                comment: comment,
                parent_id: parent_id
            }),
        };
        try {
            const res = await fetch(store.backurl + "/api/comment", opts);
            const data = await res.json();
                setDiscussion(data)
        } catch (error) {console.error(error)}
    }
    return (
        discussion &&
        <div className="discussion-info">
            <div className="header">
                {/* <p>{discussion.createdBy.name}: </p> */}
                <p><b>Discussion Title: {discussion.title}</b></p>
            </div>
            <div>
                <p>{discussion.discussion}</p>
            </div>
            <div className="comment-section">
                <p><b>Comment section:</b></p>
                {
                    discussion.comments.map((item,idx)=>{
                        // console.log("COMMENTS", item);
                        return (
                            <div className="discussion-comment" key={idx+ Math.random()}>
                                <div>
                                    <p>{item.createdBy.name}:</p>
                                    <p>{item.comment}</p>
                                    {/* <button>reply</button> */}
                                    <CreateCommentModal id={item.id} discussionId={discussion.id} item={item} createSubComment={createSubComment} for='REPLY' />
                                </div>
                                {
                                    item.children.map((item, idx)=> {
                                        return (
                                            <div key={idx + item.parent_id} className="discussion-sub-comment">
                                                <p>{item.createdBy.name}:</p>
                                                <p>{item.comment}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
            <CreateCommentModal id={discussion.title + params.id} discussionId={discussion.id} item={discussion} createComment={createComment} for='COMMENT' />
        </div>
    );
};


