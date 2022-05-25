import React, { useState } from "react";
import getEmbedId from "../../services/getEmbedId.js";

const YoutubeEmbed = ({ videoURL, videoStartTime, videoEndTime, subtitles }) => {
  const [iframeKey, setIframeKey] = useState(0);

  const embedId = getEmbedId(videoURL);

  const formattedSrc = `https://www.youtube.com/embed/${embedId}?start=${videoStartTime}&end=${videoEndTime}&rel=0&controls=0&autoplay=1&cc_load_policy=0`;

  const spanClass = subtitles ? "text" : null;

  const onReplayClick = () => {
    setIframeKey(Math.random());
  }

  return (
    <div className="container">
      <button className="big-button" onClick={onReplayClick}>Replay</button>
      <iframe key={iframeKey} width="560" height="315" src={formattedSrc} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <p className="subtitles"><span className={spanClass}>{subtitles}</span></p>
    </div>
  )
}

export default YoutubeEmbed;