import { useState, useEffect } from "react";
import axios from "axios";
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
                  key={item.id}
                  className="container p-3 border-separate rounded-md border m-2 scale-y-4 "
                >
                  <h1 className="text-2xl  capitalize  ">{item.title}</h1>
                  {ShorterBookmarkURL(item.url)}

                  {IfDescriptionIsCode(item.description)}
                  <button
                    value={item.description}
                    onClick={copyToClipboard}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2"
                  >
                    Copy
                  </button>
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

function IfDescriptionIsCode(description) {
  if (description.includes("```")) {
    description = description.replace("```", "");
    return (
      <div>
        <SyntaxHighlighter language="javascript" style={docco}>
          {description}
        </SyntaxHighlighter>
      </div>
    );
  } else {
    return <p>{description}</p>;
  }
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
