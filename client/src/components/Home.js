import React, { useState, useEffect } from "react";
import RandomPublicFlashcard from "./flashcard/RandomPublicFlashcard.js";
import RandomPersonalFlashcard from "./flashcard/RandomPersonalCard.js";
import NewFlashcardForm from "./flashcard/NewFlashcardForm.js";
import showCardInCollection from "../services/showCardInCollection.js";


const Home = (props) => {
  const [flashcardData, setFlashcardData] = useState([])
  const [collection, setCollection] = useState([]);
  const [showList, setShowList] = useState([]);
  const [renderForm, setRenderForm] = useState(false);
  const [random, setRandom] = useState(true);

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
  }, []);

  const onAddButtonClick = () => {
    setRenderForm(true);
  }

  const onSelectButtonClick = () => {

    const showListData = [];
    for (let i = 0; i < collection.length; i++) {
      if (collection[i].show) {
        showListData.push(collection[i]);
      }
    }
    setShowList(showListData);

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
          <RandomPublicFlashcard flashcardData={flashcardData} randomIndex={randomIndex} collection={collection} setCollection={setCollection} showList={showList} setShowList={setShowList} />
          <button className={"white-text"} onClick={onAddButtonClick}>Add new flash card</button>
          <button className={"white-text"} onClick={onSelectButtonClick}>Collection</button>
        </div>
      )
    }

    if (collection.length > 0) {
      const randomShowListIndex = Math.floor(Math.random() * (showList.length));

      return (
        <div>
          <RandomPersonalFlashcard showList={showList} randomShowListIndex={randomShowListIndex} collection={collection} setCollection={setCollection} />
          <button className={"white-text"} onClick={onSelectButtonClick}>Random</button>
        </div>
      )
    }
  }

  return <h1>Loading...</h1>
}

export default Home;