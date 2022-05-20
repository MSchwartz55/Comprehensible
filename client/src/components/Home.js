import React, { useState, useEffect } from "react";
import RandomFlashcard from "./flashcard/RandomFlashcard.js";
import NewFlashcardForm from "./flashcard/NewFlashcardForm.js";

const Home = (props) => {
  const [flashcardData, setFlashcardData] = useState([])

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
  }, []);

  if (flashcardData.length > 0) {
    const randomIndex = Math.floor(Math.random() * (flashcardData.length));

    return (
      <div>
        <div className="flashcardList">
          <RandomFlashcard flashcardData={flashcardData} randomIndex={randomIndex} />
        </div>
        <NewFlashcardForm />
      </div>
    )
  }

  return <h1>Loading...</h1>
}

export default Home;