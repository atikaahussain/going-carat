import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

console.log("API KEY LOADED:", process.env.YT_API_KEY);

const app = express();
const PORT = 5000;

app.use(cors());

const API_KEY = process.env.YT_API_KEY;

const PLAYLISTS = {
  latest: "PLSS4KpnnLk5BLcx59aXjU_CL2HLtSlXYv",
  best: "PLSS4KpnnLk5AEmQbZuWmLqp7DkbDXh7jZ",
  mvs: "PLSS4KpnnLk5AEmQbZuWmLqp7DkbDXh7jZ",
  teasers: "PLSS4KpnnLk5AEmQbZuWmLqp7DkbDXh7jZ",
  documentaries: "PLSS4KpnnLk5AEmQbZuWmLqp7DkbDXh7jZ",
};

async function fetchPlaylist(playlistId) {
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${playlistId}&key=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data.items) return [];

  return data.items.map((item) => ({
    videoId: item.snippet.resourceId.videoId,
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails?.medium?.url,
  }));
}

// API endpoint
app.get("/api/playlists", async (req, res) => {
  try {
    let allPlaylists = {};

    for (const [name, id] of Object.entries(PLAYLISTS)) {
      const videos = await fetchPlaylist(id);

      allPlaylists[name] = {
        url: `https://www.youtube.com/playlist?list=${id}`,
        videos,
      };
    }

    res.json(allPlaylists);
  } catch (err) {
    console.error("❌ Error fetching playlists:", err);
    res.status(500).json({ error: "Failed to fetch playlists" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
