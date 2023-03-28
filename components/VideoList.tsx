import React from "react";
import { FaPlay } from "react-icons/fa";
import { Video } from "../types/types";

interface VideoListProps {
  videos: Video[];
  onVideoSelect: (video: Video) => void;
}

const VideoList: React.FC<VideoListProps> = ({ videos, onVideoSelect }) => {
  return (
    <div className="video-list">
      {videos.map((video) => (
        <div
          key={video.id}
          className="video-item"
          onClick={() => onVideoSelect(video)}
        >
          <img src={video.thumbnailUrl} alt={video.title} />
          <div className="video-info">
            <h3>{video.title}</h3>
            <p>{video.channelTitle}</p>
          </div>
          <div className="play-icon">
            <FaPlay />
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
