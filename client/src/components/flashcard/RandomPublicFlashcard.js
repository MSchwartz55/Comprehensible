import React, { useState } from "react";
import AddCardButton from "./AddCardButton";
import YoutubeEmbed from "./YoutubeEmbed";

const RandomPublicFlashcard = ({ randomIndex, flashcardData, collection, setCollection, setShowList }) => {
  const [visitedIndexList, setVisitedIndexList] = useState([randomIndex]);
  const [moreCards, setMoreCards] = useState(flashcardData.length > 1);

  const postToCollection = async (flashcardId) => {
    try {
      const response = await fetch("/api/v1/collections", {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify({ flashcardId })
      })
      if (!response.ok) {
        const error = `${response.status} (${response.statusText})`;
        throw (error);
      }
      const body = await response.json();
      console.log(body);
      setCollection([...collection, { flashcard: body.collection[0].flashcard, interval: body.collection[0].interval, show: true }]);
    } catch (error) {
      console.error(error)
    }
  }

  const handleNextClick = () => {
    const getRandom = () => {
      return Math.floor(Math.random() * (flashcardData.length));
    }

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

  const handleAddClick = () => {
    postToCollection(currentFlashcard.id);
  }

  const previousButtonComponent = visitedIndexList.length > 1 ? <button className="direction-button" onClick={handlePreviousClick}>Previous Card</button> : null;
  const nextButtonComponent = moreCards ? <button className="direction-button" onClick={handleNextClick}>Next Card</button> : <button className="direction-button">No cards left!</button>;

  return (
    <div className="card-container">
      <div className="buttons">
        {previousButtonComponent} {nextButtonComponent}
      </div>
      <YoutubeEmbed {...currentFlashcard} />
      <AddCardButton collection={collection} flashcardId={currentFlashcard.id} handleClick={handleAddClick} />
    </div>
  )

}

export default RandomPublicFlashcard;