import React from "react";
import VideoGrid from "./VideoGrid";
import "../style/Section.css";

function Section({ title, videos, playlistUrl }) {
  return (
    <section className="section">
      <div className="section-header">
        <h2>{title}</h2>
        <a href={playlistUrl} target="_blank" rel="noopener noreferrer">more➯</a>
      </div>
      <VideoGrid videos={videos} />
    </section>
  );
}

export default Section;
