import React, { useState, useEffect } from "react";
import axios from "axios";
import VideoPlayer from "../components/VideoPlayer";
import VideoList from "../components/VideoList";
import { Video } from "../types/types";

interface YoutubeApiResponse {
  items: {
    id: {
      videoId: string;
    };
    snippet: {
      title: string;
      channelTitle: string;
      thumbnails: {
        medium: {
          url: string;
        };
      };
    };
  }[];
}

const Home: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get<YoutubeApiResponse>(
          "https://www.googleapis.com/youtube/v3/search",
          {
            params: {
              part: "snippet",
              maxResults: 10,
              q: "surfing",
              type: "video",
              key: process.env.YOUTUBE_API_KEY,
            },
          }
        );
        const videos = response.data.items.map((item) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          channelTitle: item.snippet.channelTitle,
          thumbnailUrl: item.snippet.thumbnails.medium.url,
        }));
        setVideos(videos);
      } catch (error) {
        console.error(error);
      }
    };
    fetchVideos();
  }, []);

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
  };

  return (
    <div className="container">
      <h1>My YouTube App</h1>
      <div className="video-content">
        {selectedVideo ? (
          <VideoPlayer videoId={selectedVideo.id} />
        ) : (
          <p>Selecione um vídeo para assistir</p>
        )}
        <VideoList videos={videos} onVideoSelect={handleVideoSelect} />
      </div>
    </div>
  );
};

export default Home;
