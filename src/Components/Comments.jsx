import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentsList from "./CommentsList.jsx";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Comments = ({ id }) => {
  //   const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentButtonClicked, setCommentButtonClicked] = useState(false);

  const onCommentButtonClicked = () => {
    setCommentButtonClicked(!commentButtonClicked);
    console.log("urlGet", BACKEND_URL + `/bookmarks/${id}/comment`);
    axios.get(BACKEND_URL + `/bookmarks/${id}/comment`).then((res) => {
      setComments(res.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("url", BACKEND_URL + `/bookmarks/${id}/comment`);
    console.log("newComment", newComment);
    axios
      .post(
        BACKEND_URL + `/bookmarks/${id}/comment`,
        { comment: newComment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setComments([...comments, res.data]);
        
        setNewComment("");
      })
      .catch((err) => {
        console.log(err, "err", err.response);
      });
  };

  return (
    <div>
      <button onClick={onCommentButtonClicked}>Show Comments</button>
      {commentButtonClicked && (
        <div>
          {/* <div className="flex mx-auto items-center justify-center shadow-lg mt-56 mx-8 mb-4 max-w-lg"> */}
          <form
            className="w-full max-w-xl bg-white rounded-lg px-4 pt-2"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-wrap -mx-3 mb-6">
              <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">
                Add a new comment
              </h2>
              <div className="w-full md:w-full px-3 mb-2 mt-2">
                <textarea
                  className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                  name="body"
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Type Your Comment"
                  required
                ></textarea>
              </div>
              <div className="w-full md:w-full flex items-start md:w-full px-3">
                <div className="flex items-start w-1/2 text-gray-700 px-2 mr-auto">
                  <svg
                    fill="none"
                    className="w-5 h-5 text-gray-600 mr-1"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-xs md:text-sm pt-px">
                    Valuable Comment help community learn.
                  </p>
                </div>
                <div className="-mr-1">
                  <input
                    type="submit"
                    className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                    value="Post Comment"
                  />
                </div>
              </div>
            </div>
          </form>
          <CommentsList comments={comments} />
        </div>
      )}
    </div>
  );
};

export default Comments;
