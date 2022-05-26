import React, { useState } from "react";
import getUserId from "../../services/getUserId";

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
  } else if (getUserId()) {
    return null;
  }
  return (
    <button className={"white-text direction-button"} onClick={handleButtonClick}>Add to Collection</button>
  );
}

export default AddCardButton;