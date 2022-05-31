import React from "react";
import YoutubeEmbed from "./YoutubeEmbed";

const RandomPersonalFlashcard = ({ currentFlashcard, collection, setCollection }) => {

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

  const cardDifficultyClickWrapper = (evaluation) => {
    const handleClick = () => {
      postToCollection(currentFlashcard.flashcard.id, evaluation);
    }
    return handleClick;
  }

  const handleEasyClick = cardDifficultyClickWrapper(5);
  const handleMediumClick = cardDifficultyClickWrapper(4);
  const handleHardClick = cardDifficultyClickWrapper(2);

  return (
    <div className="collectionCardContainer">
      <button className="hidden-button">Already Added</button>
      <div className="card-container">
        <YoutubeEmbed {...currentFlashcard.flashcard} />
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