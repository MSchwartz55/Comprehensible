import React, { useState } from "react";
import YoutubeEmbed from "./YoutubeEmbed";

const RandomPersonalFlashcard = ({ randomShowListIndex, collection, setCollection, showList, setLoadKey }) => {
  if (showList.length === 0) {
    return (
      <div>
        <h1 className="white-text">Congratulations! You've finished studying all of your cards for now.</h1>
      </div>
    )
  }

  const [visitedIndexList, setVisitedIndexList] = useState([randomShowListIndex]);
  const [moreCards, setMoreCards] = useState(showList.length > 1);

  const postToCollection = async (flashcardId, evaluation) => {
    try {
      const response = await fetch("/api/v1/collections", {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify({ flashcardId, evaluation })
      })
      if (!response.ok) {
        const error = `${response.status} (${response.statusText})`;
        throw (error);
      }
      const body = await response.json();
      const collectionCopy = [...collection];
      const newCollection = collectionCopy.map((entry) => {
        debugger;
        if (entry.flashcard.id === flashcardId) {
          const showStatus = body.collection.interval === 1;
          const newEntry = { ...entry, interval: body.collection.interval, show: showStatus };
          return newEntry
        }
        return entry;
      })
      setCollection(newCollection);
    } catch (error) {
      console.error(error)
    }
  }

  const currentFlashcard = showList[visitedIndexList[visitedIndexList.length - 1]].flashcard;

  const handleNextClick = () => {
    const getRandom = () => {
      return Math.floor(Math.random() * (showList.length));
    }

    if (moreCards) {
      let newRandomIndex = getRandom();
      while (visitedIndexList.includes(newRandomIndex)) {
        newRandomIndex = getRandom();
      }

      setVisitedIndexList([...visitedIndexList, newRandomIndex]);

      if (visitedIndexList.length === showList.length - 1) {
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

  const cardDifficultyClickWrapper = (evaluation) => {
    const handleClick = () => {
      postToCollection(currentFlashcard.id, evaluation);
      setLoadKey(Math.random());
    }
    return handleClick;
  }

  const handleEasyClick = cardDifficultyClickWrapper(5);
  const handleMediumClick = cardDifficultyClickWrapper(4);
  const handleHardClick = cardDifficultyClickWrapper(3);

  const previousButtonComponent = visitedIndexList.length > 1 ? <button className="white-text next-previous-button" onClick={handlePreviousClick}>Previous Card</button> : <div className="placeholder-block-personal"></div>;
  const nextButtonComponent = moreCards ? <button className="white-text next-previous-button" onClick={handleNextClick}>Next Card</button> : <button className="white-text next-previous-button">No cards left!</button>;

  return (
    <div className="collectionCardContainer">
      <button className="hidden-button">Already Added </button>
      <div className="card-container">

        <YoutubeEmbed {...currentFlashcard} />

      </div>
      <div className="repetitionButtons">
        <button className="difficulty-button hard" onClick={handleHardClick}>Hard</button>
        <button className="difficulty-button medium" onClick={handleMediumClick}>Medium</button>
        <button className="difficulty-button easy" onClick={handleEasyClick}>Easy</button>
      </div>
    </div>
  )

}

export default RandomPersonalFlashcard;