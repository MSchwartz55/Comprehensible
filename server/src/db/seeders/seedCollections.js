import { Collection } from "../../models/index.js";

const seedCollections = async () => {
  const collectionList = [
    {
      flashcardId: 2,
      userId: 1
    },
    {
      flashcardId: 1,
      userId: 1
    },
    {
      flashcardId: 1,
      userId: 2
    }
  ]

  for (const collection of collectionList) {
    const currentCollection = await Collection.query().findOne(collection);
    if (!currentCollection) {
      await Collection.query().insert(collection);
    }
  }

}

export default seedCollections;