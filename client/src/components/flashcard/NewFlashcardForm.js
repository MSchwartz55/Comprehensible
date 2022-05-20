import React, { useState } from "react";
import TimeHandler from "../../services/utility_classes/TimeHandler";

const NewFlashcardForm = (props) => {
  const [formValues, setFormValues] = useState({
    videoURL: "",
    startTime: "0:00",
    endTime: "0:00",
    transcript: "",
    subtitles: ""
  })
  const [flipped, setFlipped] = useState(false);

  const postFormData = async () => {
    try {
      const response = await fetch(`/api/v1/flashcards`, {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify(formValues)
      });
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

  const onBlur = (event) => {
    const value = event.target.value;
    const seconds = Math.max(0, TimeHandler.getSecondsFromHHMMSS(value));

    const time = TimeHandler.toHHMMSS(seconds);
    setValue(time);
  }

  const handleSubmit = () => {

  }

  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  }

  const toggleFlip = (event) => {
    if (flipped) {
      setFlipped(false);
    } else {
      setFlipped(true);
    }
  }

  const handleChildClick = (event) => {
    event.stopPropagation();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flip-card" >
        <div className={flipped ? "flip-card-inner flipped" : "flip-card-inner"} onClick={toggleFlip}>

          <div className="flip-card-front">
            <label htmlFor="url"></label>
            <input type="text" name="videoURL" id="videoURL" value={formValues.videoURL} onChange={handleChange} onClick={handleChildClick} />

            <label htmlFor="startTime"></label>
            <input type="text" name="startTime" id="startTime" value={formValues.startTime} onChange={handleChange} onBlur={onBlur} onClick={handleChildClick} />

            <label htmlFor="endTime"></label>
            <input type="text" name="endTime" id="endTime" value={formValues.endTime} onChange={handleChange} onBlur={onBlur} onClick={handleChildClick} />

            <label htmlFor="subtitles"></label>
            <input type="text" name="subtitles" id="" value={formValues.subtitles} onChange={handleChange} onClick={handleChildClick} />
          </div>

          <div className="flip-card-back">
            <label htmlFor="transcript"></label>
            <textarea name="transcript" id="transcript" cols="30" rows="10" value={formValues.transcript} onChange={handleChange} onClick={handleChildClick}></textarea>

            <input type="submit" value="Submit" />
          </div>

        </div>
      </div>
    </form>
  )

}

export default NewFlashcardForm;