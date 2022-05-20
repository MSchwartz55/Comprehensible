import React, { useState, useEffect } from "react";
import YoutubeEmbed from "./flashcard/YoutubeEmbed";

const PersonalCollection = (props) => {
  const [collection, setCollection] = useState([]);

  const fetchPersonalCollection = async () => {
    try {
      const response = await fetch(`/api/v1/collections`);
      if (!response.ok) {
        const error = `${response.status} (${response.statusText})`;
        throw (error)
      }
      const collectionData = await response.json();
      console.log(collectionData.collection)
      setCollection(collectionData.collection)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchPersonalCollection();
  })

  const personalCollection = collection.map((entry) => {
    return <YoutubeEmbed {...entry.flashcard} />
  })


  return (
    <div>
      {personalCollection}
    </div>
  )

}

export default PersonalCollection;