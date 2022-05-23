import React, { useState } from "react";
import TimeHandler from "../../services/utility_classes/TimeHandler";
import translateServerErrors from "../../services/translateServerErrors"
import ErrorList from "../layout/ErrorList"
import flashcardIsValid from "../../services/flashcardIsValid";

const NewFlashcardForm = (props) => {
  const formSkeleton = {
    videoURL: "",
    videoStartTime: "",
    videoEndTime: "",
    transcript: "",
    subtitles: ""
  }

  const [formValues, setFormValues] = useState(formSkeleton);
  const [flipped, setFlipped] = useState(false);
  const [errors, setErrors] = useState([]);

  const postFormData = async (formValues) => {
    try {
      const response = await fetch(`/api/v1/flashcards`, {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify(formValues)
      });
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json();
          setErrors(translateServerErrors(body.errors));
        } else {
          const error = `${response.status} (${response.statusText})`;
          throw (error);
        }
      } else {
        setErrors([]);
        const body = await response.json();
        props.setFlashcardData([...props.flashcardData, body.flashcard]);
      }
    } catch (error) {
      console.error(error)
    }
  }

  const onBlur = (event) => {
    const value = event.target.value;
    const seconds = Math.max(0, TimeHandler.getSecondsFromHHMMSS(value));

    const time = TimeHandler.toHHMMSS(seconds);
    setFormValues({ ...formValues, [event.target.name]: time });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    let formValuesClone = { ...formValues };
    formValuesClone.videoStartTime = TimeHandler.getSecondsFromHHMMSS(formValuesClone.videoStartTime);
    formValuesClone.videoEndTime = TimeHandler.getSecondsFromHHMMSS(formValuesClone.videoEndTime);

    postFormData(formValuesClone)

    if (flashcardIsValid(formValuesClone)) {
      props.setRenderForm(false);
    }
  }

  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  }

  const toggleFlip = () => {
    if (flipped) {
      setFlipped(false);
    } else {
      setFlipped(true);
    }
  }

  const handleChildClick = (event) => {
    event.stopPropagation();
  }

  const handleButtonClick = (event) => {
    event.preventDefault();
    props.setRenderForm(false);
  }

  return (
    <form onSubmit={handleSubmit} className={"flashcardForm"}>
      <ErrorList errors={errors} />
      <div className="flip-card" >
        <div className={flipped ? "flip-card-inner flipped" : "flip-card-inner"} onClick={toggleFlip}>

          <div className="flip-card-front">
            <label htmlFor="videoURL">
              URL <input type="text"
                name="videoURL" id="videoURL"
                value={formValues.videoURL}
                onChange={handleChange}
                onClick={handleChildClick} />
            </label>

            <label htmlFor="videoStartTime">
              Start <input type="text"
                name="videoStartTime"
                id="videoStartTime"
                value={formValues.videoStartTime}
                onChange={handleChange}
                onBlur={onBlur}
                onClick={handleChildClick} />
            </label>

            <label htmlFor="videoEndTime">
              End <input type="text"
                name="videoEndTime"
                id="videoEndTime"
                value={formValues.videoEndTime}
                onChange={handleChange}
                onBlur={onBlur}
                onClick={handleChildClick} />
            </label>

            <label htmlFor="subtitles">
              Subtitles <input type="text"
                name="subtitles"
                id="subtitles"
                value={formValues.subtitles}
                onChange={handleChange}
                onClick={handleChildClick} />
            </label>
          </div>

          <div className="flip-card-back">
            <label htmlFor="transcript">
              <textarea name="transcript"
                id="transcript"
                cols="30"
                rows="10"
                value={formValues.transcript}
                onChange={handleChange}
                onClick={handleChildClick}>
              </textarea>
            </label>

            <input type="submit" value="Submit" />
          </div>
        </div>
      </div>
      <button onClick={handleButtonClick}>X</button>
    </form>
  )

}

export default NewFlashcardForm;