import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import CategoryBar from "./components/CategoryBar";
import Section from "./components/Section";
import VideoGrid from "./components/VideoGrid";


function App() {
  const [playlists, setPlaylists] = useState({});
  const [activeCategory, setActiveCategory] = useState("everything");

  useEffect(() => {
    fetch("http://localhost:5000/api/playlists")
      .then((res) => res.json())
      .then((data) => setPlaylists(data))
      .catch((err) => console.error(err));
  }, []);

  // filter logic
  const renderContent = () => {
    if (activeCategory === "everything") {
      return Object.keys(playlists).map((key) => (
        <Section
          key={key}
          title={key}
          videos={playlists[key].videos.slice(0, 5)} // only 5 for Everything
          playlistUrl={playlists[key].url}
        />
      ));
    } else if (playlists[activeCategory]) {
      return (
        <Section
          title={activeCategory}
          videos={playlists[activeCategory].videos.slice(0, 10)} // 10 for filtered
          playlistUrl={playlists[activeCategory].url}
        />
      );
    }
    return <p>Loading...</p>;
  };

  return (
    <div className="app-container">
      <Header />
      <CategoryBar
        categories={[
          "everything",
          "latest going episodes",
          "best of goes",
          "mvs",
          "teasers",
          "documentaries",
        ]}
        active={activeCategory}
        onChange={setActiveCategory}
      />
      {renderContent()}
    </div>
  );
}

export default App;
