import React from "react";
import getEmbedId from "../../services/getEmbedId.js";

const YoutubeEmbed = ({ videoURL, videoStartTime, videoEndTime, subtitles }) => {
  const embedId = getEmbedId(videoURL);
  const formattedSrc = `https://www.youtube.com/embed/${embedId}?start=${videoStartTime}&end=${videoEndTime}&rel=0&controls=0&autoplay=1`;

  const spanClass = subtitles ? "text" : null;

  return (
    <div className="container">
      <iframe width="560" height="315" src={formattedSrc} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <p className="subtitles"><span className={spanClass}>{subtitles}</span></p>
    </div>
  )
}

export default YoutubeEmbed;