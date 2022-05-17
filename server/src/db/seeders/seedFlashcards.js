import { Flashcard } from "../../models/index.js";

const seedFlashcards = async () => {
  const flashcardList = [
    {
      videoURL: "https://www.youtube.com/watch?v=eU8ixnzuyoc",
      transcript: "深い深い眠りに落ちた: I fell into a deep, deep sleep."
    },
    {
      videoURL: "https://www.youtube.com/watch?v=UgS7vgquBvo",
      transcript: "いつだってワガママばっかで, 子供みたいね: You’re always so selfish, just like a child"
    },
  ]

  for (const flashcard of flashcardList) {
    const currentFlashcard = await Flashcard.query().findOne(flashcard);
    if (!currentFlashcard) {
      await Flashcard.query().insert(flashcard);
    }
  }

}

export default seedFlashcards;