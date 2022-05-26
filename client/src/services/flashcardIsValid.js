import getEmbedId from "./getEmbedId";

const flashcardIsValid = (flashcardValues) => {
  const required = ["videoURL", "videoStartTime", "videoEndTime"];

  for (let i = 0; i < required.length; i++) {
    if (flashcardValues[required[i]] === "") {
      return false;
    }
  }

  return getEmbedId(flashcardValues.videoURL);
}

export default flashcardIsValid;