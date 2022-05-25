import React, { useState } from "react";
import YoutubeEmbed from "./YoutubeEmbed";

const RandomPersonalFlashcard = ({ randomIndex, flashcardData }) => {
  const [visitedIndexList, setVisitedIndexList] = useState([randomIndex]);
  const [moreCards, setMoreCards] = useState(flashcardData.length > 1);

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

  const handlePreviousClick = () => {
    const newVisitedIndexList = [...visitedIndexList];
    newVisitedIndexList.pop();
    setVisitedIndexList(newVisitedIndexList);
    if (moreCards === false) {
      setMoreCards(true)
    }
  }

  const currentFlashcard = flashcardData[visitedIndexList[visitedIndexList.length - 1]];

  const previousButtonComponent = visitedIndexList.length > 1 ? <button onClick={handlePreviousClick}>Previous Card</button> : null;
  const nextButtonComponent = moreCards ? <button onClick={handleNextClick}>Next Card</button> : <p>No cards left!</p>;

  return (
    <div className="collectionCardContainer">
      <div className="flashcardList">
        {previousButtonComponent}
        <YoutubeEmbed {...currentFlashcard} />
        {nextButtonComponent}
      </div>
      <div className="repetitionButtons">
        <button className="button">Again</button>
        <button>Hard</button>
        <button>Medium</button>
        <button>Easy</button>
      </div>
    </div>
  )

}

export default RandomPersonalFlashcard;