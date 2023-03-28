import React from "react";
import ReactPlayer from "react-player";

interface VideoPlayerProps {
  videoId: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId }) => {
  return (
    <div className="player-wrapper">
      <ReactPlayer
        className="react-player"
        url={`https://www.youtube.com/watch?v=${videoId}`}
        width="100%"
        height="100%"
        controls
      />
    </div>
  );
};

export default VideoPlayer;
