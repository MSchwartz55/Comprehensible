import React, { useState } from "react";
import YoutubeEmbed from "./YoutubeEmbed";

const RandomFlashcard = ({ videoURL, videoStartTime, videoEndTime, subtitles, flashcardData, randomIndex }) => {
  const [currentFlashcard, setCurrentFlashcard] = useState({ videoURL, videoStartTime, videoEndTime, subtitles })

  const handleClick = () => {
    let newRandomIndex = randomIndex;
    while (newRandomIndex === randomIndex) {
      newRandomIndex = Math.floor(Math.random() * (flashcardData.length));
    }
    setCurrentFlashcard(flashcardData[newRandomIndex]);
  }

  return (
    <div className="flashcardList">
      <YoutubeEmbed {...currentFlashcard} />
      <button onClick={handleClick}>Next Card</button>
    </div>
  )
}

export default RandomFlashcard;