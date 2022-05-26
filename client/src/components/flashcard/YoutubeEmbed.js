import React, { useState } from "react";
import getEmbedId from "../../services/getEmbedId.js";

const YoutubeEmbed = ({ videoURL, videoStartTime, videoEndTime, subtitles, transcript }) => {
  const [iframeKey, setIframeKey] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const embedId = getEmbedId(videoURL);

  const formattedSrc = `https://www.youtube.com/embed/${embedId}?start=${videoStartTime}&end=${videoEndTime}&rel=0&controls=0&autoplay=1&cc_load_policy=0`;

  const spanClass = subtitles ? "text" : null;

  const onReplayClick = (event) => {
    event.stopPropagation();
    setIframeKey(Math.random());
  }

  const toggleFlip = () => {
    if (flipped) {
      setFlipped(false);
    } else {
      setFlipped(true);
    }
  }

  return (
    <div className="flip-card">
      <div className={flipped ? "flip-card-inner flipped" : "flip-card-inner"} onClick={toggleFlip}>
        <div className="flip-card-front">
          <button className="big-button" onClick={onReplayClick}>Replay</button>
          <iframe key={iframeKey} width="560" height="315" src={formattedSrc} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          <p className="subtitles"><span className={spanClass}>{subtitles}</span></p>
        </div>
        <div className="flip-card-back">
          <p>
            {transcript}
          </p>
        </div>
      </div>
    </div>
  )
}

export default YoutubeEmbed;