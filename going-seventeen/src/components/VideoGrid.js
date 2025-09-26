import React from "react";
import "../style/VideoGrid.css";

function VideoGrid({ videos }) {
  return (
    <div className="videos-grid">
      {videos.map((video) => (
        <div className="video-card" key={video.videoId}>
          <a
            href={`https://www.youtube.com/watch?v=${video.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={video.thumbnail} alt={video.title} />
            <h3>{video.title}</h3>
          </a>
        </div>
      ))}
    </div>
  );
}

export default VideoGrid;
