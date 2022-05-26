import React, { useState, useEffect } from "react";
import RandomPublicFlashcard from "./flashcard/RandomPublicFlashcard.js";
import RandomPersonalFlashcard from "./flashcard/RandomPersonalCard.js";
import NewFlashcardForm from "./flashcard/NewFlashcardForm.js";
import showCardInCollection from "../services/showCardInCollection.js";
import getUserId from "../services/getUserId.js";


const Home = (props) => {
  const [flashcardData, setFlashcardData] = useState([])
  const [collection, setCollection] = useState([]);
  const [showList, setShowList] = useState([]);
  const [renderForm, setRenderForm] = useState(false);
  const [random, setRandom] = useState(true);
  const [collectionButtonText, setCollectionButtonText] = useState("Sign in to Go to Collection");

  const fetchPersonalCollection = async () => {
    try {
      const response = await fetch(`/api/v1/collections`);
      if (!response.ok) {
        const error = `${response.status} (${response.statusText})`;
        throw (error)
      }
      const responseData = await response.json();
      const collectionData = responseData.collection;
      const collectionList = collectionData.map((entry) => {
        return { flashcard: entry.flashcard, interval: entry.interval, show: showCardInCollection(entry) };
      })

      setCollection(collectionList);
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
    if (getUserId()) {
      setCollectionButtonText("Go to Collection")
    }
  }, []);

  const onAddButtonClick = () => {
    setRenderForm(true);
  }

  const onSelectButtonClick = () => {
    if (getUserId()) {
      const showListData = [];
      for (let i = 0; i < collection.length; i++) {
        if (collection[i].show) {
          showListData.push(collection[i]);
        }
      }
      setShowList(showListData);
      setCollectionButtonText("Go to Collection")
      setRandom(!random);
    } else {

    }
  }

  // const userCollectionButton = <button className={"white-text direction-button"} onClick={onSelectButtonClick}>Go to Collection</button>;

  if (flashcardData.length > 0) {
    if (renderForm) {
      return (
        <div className="form-outer-div">
          <NewFlashcardForm flashcardData={flashcardData} setFlashcardData={setFlashcardData} setRenderForm={setRenderForm} />
        </div>
      )
    }

    if (random) {
      const randomIndex = Math.floor(Math.random() * (flashcardData.length));

      return (
        <div className="card-container">
          <RandomPublicFlashcard flashcardData={flashcardData} randomIndex={randomIndex} collection={collection} setCollection={setCollection} showList={showList} setShowList={setShowList} />

          <div className="buttons">
            <button className={"white-text direction-button"} onClick={onAddButtonClick}>Add New Flash Card</button>
            <button className={"white-text direction-button"} onClick={onSelectButtonClick}>{"Go to Collection (Must be signed in)"}</button>;
          </div>;
        </div>
      )
    }

    if (collection.length > 0) {
      const randomShowListIndex = Math.floor(Math.random() * (showList.length));

      return (
        <div>
          <RandomPersonalFlashcard showList={showList} randomShowListIndex={randomShowListIndex} collection={collection} setCollection={setCollection} />
          <div className="buttons-shuffle">
            <button className={"white-text direction-button"} onClick={onSelectButtonClick}>Shuffle Random Cards</button>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="loading">
      <h1 className={"white-text direction-button"}>Loading...</h1>
    </div>
  )
}

export default Home;