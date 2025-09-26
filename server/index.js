import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";
import serverless from "serverless-http";

dotenv.config();

console.log("API KEY LOADED:", process.env.YT_API_KEY);

const app = express();
app.use(cors());

const API_KEY = process.env.YT_API_KEY;

const PLAYLISTS = {
  latest: "PLk_UmMfvZDx21Z9eEQ9DcIlUfZp1uwEup&si",
  best: "PLSS4KpnnLk5D_PjkxGGYvI-U1OJFFwDfV&si",
  mvs: "PLk_UmMfvZDx2wu3ynTngcZMzgH4l2SgLP&si",
  teasers: "PL_Cqw69_m_ywLcKO6_jF_Dut090l8A6R6&si",
  documentaries: "PL0n1IhkYiG2yEa_T7XnxoSDK0TuljmOxF&si",
};

async function fetchPlaylist(playlistId) {
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=${playlistId}&key=${API_KEY}`;

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

// ❌ REMOVE app.listen()
// ✅ Export handler for Vercel
export const handler = serverless(app);
