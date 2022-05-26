import React, { useState } from "react";
import YoutubeEmbed from "./YoutubeEmbed";

const RandomPersonalFlashcard = ({ randomShowListIndex, collection, setCollection, showList }) => {
  if (showList.length === 0) {
    return (
      <div>
        <h1>Congratulations! You've finished studying all of your cards for now.</h1>
      </div>
    )
  }

  const [visitedIndexList, setVisitedIndexList] = useState([randomShowListIndex]);
  const [moreCards, setMoreCards] = useState(showList.length > 1);
  const [evaluated, setEvaluated] = useState(false);

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
        if (entry.flashcard.id === flashcardId) {
          return { ...entry, interval: body.collection[0].interval };
        }
        return entry;
      })
      setCollection([newCollection]);
    } catch (error) {
      console.error(error)
    }
  }

  const currentFlashcard = showList[visitedIndexList[visitedIndexList.length - 1]].flashcard;
  console.log(currentFlashcard);

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
      setEvaluated(!evaluated);
    }
    return handleClick;
  }

  const handleEasyClick = cardDifficultyClickWrapper(5);
  const handleMediumClick = cardDifficultyClickWrapper(4);
  const handleHardClick = cardDifficultyClickWrapper(3);
  const handleAgainClick = cardDifficultyClickWrapper(1);

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
        <button className="button" onClick={handleAgainClick}>Again</button>
        <button className="button" onClick={handleHardClick}>Hard</button>
        <button className="button" onClick={handleMediumClick}>Medium</button>
        <button className="button" onClick={handleEasyClick}>Easy</button>
      </div>
    </div>
  )
}

export default RandomPersonalFlashcard;