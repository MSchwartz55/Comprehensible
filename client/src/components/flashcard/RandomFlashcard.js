import React, { useState } from "react";
import YoutubeEmbed from "./YoutubeEmbed";

const RandomFlashcard = ({ randomIndex, flashcardData }) => {
  const [visitedIndexList, setVisitedIndexList] = useState([randomIndex]);
  const [moreCards, setMoreCards] = useState(true);

  const getRandom = () => {
    return Math.floor(Math.random() * (flashcardData.length));
  }

  const handleNextClick = () => {
    if (moreCards) {
      let newRandomIndex = getRandom();
      while (visitedIndexList.includes(newRandomIndex)) {
        newRandomIndex = getRandom();
      }

      setVisitedIndexList([...visitedIndexList, newRandomIndex]);

      if (visitedIndexList.length === flashcardData.length - 1) {
        return setMoreCards(false);
      }
    }
  }

  const handleAddClick = () => {

  }

  const currentFlashcard = flashcardData[visitedIndexList[visitedIndexList.length - 1]]

  if (moreCards) {
    return (
      <div className="flashcardList">
        <YoutubeEmbed {...currentFlashcard} personal={false} />
        <button onClick={handleNextClick}>Next Card</button>
        <button onClick={handleClick}>Next Card</button>
      </div>
    )
  }
  return (
    <div className="flashcardList">
      <YoutubeEmbed {...currentFlashcard} />
      <p>No cards left!</p>
    </div>
  )
}

export default RandomFlashcard;