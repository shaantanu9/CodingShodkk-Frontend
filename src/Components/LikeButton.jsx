import { AiOutlineLike, AiTwotoneLike } from "react-icons/ai/index.esm";
import { useEffect, useState } from "react";
import axios from "axios";

// Backend URL from .env file
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const LikeButton = ({ id, likesList }) => {
  const [likeNo, setLikeNo] = useState(likesList);
  const [liked, setLiked] = useState("");
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) setToken(token);
  }, []);

  const likeHandler = (id) => {
    console.log("id from LikeHandler", id);
    setLiked(!liked);
    console.log("token from LikeHandler", token);
    console.log(BACKEND_URL + `/bookmarks/${id}/like`, "url");
    axios
      .patch(BACKEND_URL + `/bookmarks/${id}/like`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then((response) => {
        setLikeNo(response.data.likeCount);
        setLiked(response.data.like);
        console.log("response", response);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  //   style to center the content on all screen sizes
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // height: "100vh",
  };

  return (
    <>
      <div style={style}>
        <p className="mr-1">{likeNo}</p>
        {liked ? (
          <AiTwotoneLike onClick={() => likeHandler(id)} />
        ) : (
          <AiOutlineLike onClick={() => likeHandler(id)} />
        )}
      </div>
    </>
  );
};

export default LikeButton;
