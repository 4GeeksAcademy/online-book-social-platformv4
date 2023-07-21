import React, { useContext, useState } from "react"
import { Context } from "../store/appContext";

const CreateDiscussionModal = () => {
    const {store, actions} = useContext(Context)
    const [titletext, setTitletext] = useState("")
    const [discussiontext, setDiscussiontext] = useState("")
    const createDiscussion=async(title, discussion) => {
        const opts = {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
                Authorization: "Bearer " + store.token
            },
            body: JSON.stringify({
                title: title,
                discussion: discussion,
            }),
        };
        try {
            const res = await fetch(store.backurl + "/api/discussions", opts);
            const data = await res.json();
                actions.getAllDiscussions()
        } catch (error) {console.error(error)}
    }
    const handleClick = (e) => {
        e.preventDefault()
        actions.syncSessionToStore()
        const title = titletext 
        console.log(title)
        const discussion = discussiontext
        createDiscussion(title, discussion)
    }
    return(
        <div>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#discussionModal">
            Create discussion
            </button>

            <div className="modal fade" id="discussionModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Create New Discussion</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input type="text" id="title" value={titletext} onChange={(e) => setTitletext(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="discussion">Discussion:</label>
                        <textarea type="text" id="discussion" value={discussiontext} onChange={(e) => setDiscussiontext(e.target.value)}/>
                    </div>
                </div>
                <div className="modal-footer">
                    <button onClick={(e) => handleClick(e)} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Submit</button>
                </div>
                </div>
            </div>
            </div>

        </div>
    )
}
export default CreateDiscussionModal