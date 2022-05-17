import React, { useState, useEffect } from "react";

const Flashcard = (props) => {
  const [data, setData] = useState([])

  const fetchFlashcardData = async () => {
    try {
      const response = await fetch("/api/v1/flashcards");
      if (!response.ok) {
        const error = `${response.status} (${response.statusText})`;
        throw (error)
      }
      const flashcardData = await response.json();
      setData(flashcardData.flashcards)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchFlashcardData();
  }, []);

  const flashcardList = data.map((flashcard, i) => {
    console.log(flashcard);
    return (
      <ul>
        <li>${`Card #${i}`}</li>
        <li>{flashcard.videoURL}</li>
        <li>{flashcard.transcript}</li>
      </ul>
    )
  })

  return (
    <div>
      {flashcardList}
    </div>
  )
}

export default Flashcard;