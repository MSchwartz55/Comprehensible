import React, { useState, useEffect } from "react";
import RandomPublicFlashcard from "./flashcard/RandomPublicFlashcard.js";
import RandomPersonalFlashcard from "./flashcard/RandomPersonalCard.js";
import NewFlashcardForm from "./flashcard/NewFlashcardForm.js";

const Home = (props) => {
  const [flashcardData, setFlashcardData] = useState([])
  const [collection, setCollection] = useState([]);
  const [renderForm, setRenderForm] = useState(false);
  const [random, setRandom] = useState(true);

  const fetchPersonalCollection = async () => {
    try {
      const response = await fetch(`/api/v1/collections`);
      if (!response.ok) {
        const error = `${response.status} (${response.statusText})`;
        throw (error)
      }
      const collectionData = await response.json();
      const collectionList = collectionData.collection.map((entry) => {
        return entry.flashcard;
      })
      setCollection(collectionList)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchFlashcardData = async () => {
    try {
      const response = await fetch(`/api/v1/flashcards`);
      if (!response.ok) {
        const error = `${response.status} (${response.statusText})`;
        throw (error)
      }
      const flashcardData = await response.json();
      setFlashcardData(flashcardData.flashcards)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchFlashcardData();
    fetchPersonalCollection();
  }, []);

  const onAddButtonClick = () => {
    setRenderForm(true);
  }

  const onSelectButtonClick = () => {
    setRandom(!random);
  }

  if (flashcardData.length > 0) {
    if (renderForm) {
      return (
        <div>
          <NewFlashcardForm flashcardData={flashcardData} setFlashcardData={setFlashcardData} setRenderForm={setRenderForm} />
        </div>
      )
    }

    if (random) {
      const randomIndex = Math.floor(Math.random() * (flashcardData.length));

      return (
        <div className="flashcardList">
          <RandomPublicFlashcard flashcardData={flashcardData} randomIndex={randomIndex} collection={collection} setCollection={setCollection} />
          <button onClick={onAddButtonClick}>Add new flash card</button>
          <button onClick={onSelectButtonClick}>Collection</button>
        </div>
      )
    }

    if (collection.length > 0) {
      const randomCollectionIndex = Math.floor(Math.random() * (collection.length));

      return (
        <div>
          <RandomPersonalFlashcard flashcardData={collection} randomIndex={randomCollectionIndex} />
          <button onClick={onAddButtonClick}>Add new flash card</button>
          <button onClick={onSelectButtonClick}>Random</button>
        </div>
      )
    }
  }

  return <h1>Loading...</h1>
}

export default Home;