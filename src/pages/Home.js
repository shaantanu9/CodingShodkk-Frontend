import { useState, useEffect } from "react";
import axios from "axios";
import LikeButton from "../Components/LikeButton";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
// Backend URL from .env file
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
console.log("BACKEND_URL", BACKEND_URL);

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token !== null) {
      setToken(token);
      setUser(user);
      setIsAuthenticated(true);
    }
    getDataToHome();
  }, []);

  const getDataToHome = async () => {
    try {
      const response = await axios.get(BACKEND_URL + "bookmarks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response", response);
      setData(response.data.user);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setError(error);
      setLoading(false);
    }
  };

  const likeHandler = (id) => {
    setLiked(!liked);
    axios.patch(BACKEND_URL + `bookmarks/${id}/like`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  // style to center the content on all screen sizes
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // height: "100vh",
  };

  return (
    <div style={style}>
      {isAuthenticated ? (
        <div className="mt-4">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div>
              {data.map((item) => (
                <div
                  key={item._id}
                  className="container p-3 border-separate rounded-md border m-2 scale-y-4 "
                >
                  <h1 className="text-2xl  capitalize  ">{item.title}</h1>
                  {ShorterBookmarkURL(item.url)}

                  {item.description && <p>{item.description}</p>}
                  {item.code && showCode(item.code)}

                  <div className="flex justify-start space-x-3 mt-5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="bg-gray-400 rounded text-white px-3"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <br />
                  <button
                    value={item.description}
                    onClick={copyToClipboard}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded my-2"
                  >
                    Copy
                  </button>
                  {/* Add likes and comments section */}
                  <div className="flex justify-between">
                    <div className="flex">
                      {/* like icon and onclick */}
                      <LikeButton
                        id={item._id}
                        likesList={item?.likesList?.length}
                      />
                      {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2">
                        Like {item?.likesList?.length}
                      </button>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2">
                        Comment {item?.commentsList?.length}
                      </button>

                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2">
                        Share {item?.commentsList?.length}
                      </button> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          <h1>Please Login</h1>
          <p>Or</p>
          <p>Register</p>
        </div>
      )}
    </div>
  );
};
export default Home;

function showCode(description) {
  return (
    <div>
      <SyntaxHighlighter language="javascript" style={docco}>
        {description}
      </SyntaxHighlighter>
    </div>
  );
}

function FilterURL(url, title) {
  if (url.includes(".jpg") || url.includes(".png")) {
    return <img src={title} alt="image" />;
  }
  // if link is bigger than 50 characters then show only 50 characters
  else if (url.length > 50) {
    return (
      <p>
        <a>{url.slice(0, 50)}...</a>
      </p>
    );
  }
  //if link is pdf then show pdf icon
  else if (url.includes(".pdf")) {
    return (
      <p>
        <a href={url} target="_blank" rel="noreferrer">
          <img src="https://img.icons8.com/ios/50/000000/pdf-2.png" alt="pdf" />
        </a>
      </p>
    );
  }

  // if link is smaller than 50 characters then show the whole link
  else {
    return <p>{url}</p>;
  }
}

function ShorterBookmarkURL(url) {
  if (url.length > 40) {
    return (
      <p className="my-2 inline-block">
        <a target="_blank" href={url}>
          {url.slice(0, 50)}...
        </a>
      </p>
    );
  } else {
    return (
      <p className="my-2 inline-block ">
        <a target="_blank" href={url}>
          {url.slice(0, 50)}...
        </a>
      </p>
    );
  }
}
// Create Copy button to copy Description
function copyToClipboard(e) {
  if (e.target.value.startsWith("```") && e.target.value.endsWith("```")) {
    e.target.value = e.target.value.replace(/```/g, "");
  }
  navigator.clipboard.writeText(e.target.value);
}
