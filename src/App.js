import React from "react";
import "./App.css";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

const videos = [
  {
    id: 1,
    title: "Python Tutorial for Beginners",
    thumbnail: "https://img.youtube.com/vi/_uQrJ0TkZlc/hqdefault.jpg",
    link: "https://www.youtube.com/watch?v=_uQrJ0TkZlc"
  },
  {
    id: 2,
    title: "Learn Python in 1 Hour",
    thumbnail: "https://img.youtube.com/vi/kqtD5dpn9C8/hqdefault.jpg",
    link: "https://www.youtube.com/watch?v=kqtD5dpn9C8"
  },
  {
    id: 3,
    title: "Python Object Oriented Programming",
    thumbnail: "https://img.youtube.com/vi/JeznW_7DlB0/hqdefault.jpg",
    link: "https://www.youtube.com/watch?v=JeznW_7DlB0"
  },
  {
    id: 4,
    title: "Python Functions Explained",
    thumbnail: "https://img.youtube.com/vi/NE97ylAnrz4/hqdefault.jpg",
    link: "https://www.youtube.com/watch?v=NE97ylAnrz4"
  },
  {
    id: 5,
    title: "Python Project for Beginners",
    thumbnail: "https://img.youtube.com/vi/8ext9G7xspg/hqdefault.jpg",
    link: "https://www.youtube.com/watch?v=8ext9G7xspg"
  },
  {
    id: 6,
    title: "Python Automation Tutorial",
    thumbnail: "https://img.youtube.com/vi/s8XjEuplx_U/hqdefault.jpg",
    link: "https://www.youtube.com/watch?v=s8XjEuplx_U"
  }
];

function VideoList() {
  return (
    <div className="learning-container">
      <h1 className="title">🐍 Learn Python</h1>
      <div className="cards">
        {videos.map((video) => (
          <a
            key={video.id}
            href={video.link}
            target="_blank"
            rel="noopener noreferrer"
            className="card"
          >
            <img src={video.thumbnail} alt={video.title} />
            <p>{video.title}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

const ProtectedVideoList = withAuthenticationRequired(VideoList, {
  onRedirecting: () => <h2 style={{color: "#c3c3c3",marginTop:"3%"}}>Login  to learn</h2>
});

function App() {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      {!isAuthenticated ? (
        <button className="btn" style={{marginTop:"2%"}}onClick={() => loginWithRedirect()}>
          Log In
        </button>
      ) : (
        <>
          <p style={{color: "#c3c3c3",marginBottom:"2%",marginTop:"2%"}}>Welcome, {user.name}</p>
          <button
            className="btn"
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Log Out
          </button>
        </>
      )}

      {/* Show videos only after login */}
      <ProtectedVideoList />
    </div>
  );
}

export default App;
