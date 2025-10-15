  import React, { useEffect, useState } from "react";
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import "./App.css";
  import Header from "./components/Header";
  import CategoryBar from "./components/CategoryBar";
  import Section from "./components/Section";
  import Footer from "./components/Footer";
  import AboutMe from "./components/AboutMe"; // <-- import your AboutMe page

  // mapping backend keys -> frontend display names
  const categoryMap = {
    latest: "latest episodes",
    best: "best of going-svt",
    mvs: "music videos",
    teasers: "teasers",
    documentaries: "documentaries",
  };

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
            title={categoryMap[key] || key} 
            videos={playlists[key].videos.slice(0, 6)} // 6 for Everything
            playlistUrl={playlists[key].url}
          />
        ));
      } else {
        // find backend key for this display name
        const backendKey = Object.keys(categoryMap).find(
          (k) => categoryMap[k] === activeCategory
        );

        if (backendKey && playlists[backendKey]) {
          return (
            <Section
              title={activeCategory}
              videos={playlists[backendKey].videos.slice(0, 20)} // 20 for filtered
              playlistUrl={playlists[backendKey].url}
            />
          );
        }
        return <p>Loading...</p>;
      }
    };

    return (
      <Router>
        <div className="app-container">
          <Header />
          
          <Routes>
            {/* Home route */}
            <Route
              path="/"
              element={
                <>
                  <CategoryBar
                    categories={["everything", ...Object.values(categoryMap)]}
                    active={activeCategory}
                    onChange={setActiveCategory}
                  />
                  {renderContent()}
                </>
              }
            />

            {/* About Me route */}
            <Route path="/about" element={<AboutMe />} />
          </Routes>

          <Footer />
        </div>
      </Router>
    );
  }

  export default App;
