import React, { useState } from "react";

const AddCardButton = ({ collection, flashcardId, handleClick }) => {
  const [clicked, setClicked] = useState(false);

  let inCollection;

  for (let i = 0; i < collection.length; i++) {
    if (collection[i].flashcard.id === flashcardId) {
      inCollection = true;
    }
  }

  const handleButtonClick = () => {
    handleClick();
    setClicked(true);
  }

  if (inCollection || clicked) {
    return null;
  }
  return (
    <button onClick={handleButtonClick}>Add to collection</button>
  );
}

export default AddCardButton;