import { Flashcard } from "../../models/index.js";

const seedFlashcards = async () => {
  const flashcardList = [
    {
      videoURL: "https://www.youtube.com/watch?v=eU8ixnzuyoc",
      videoStartTime: 41,
      videoEndTime: 46,
      transcript: "深い深い眠りに落ちた: I fell into a deep, deep sleep."
    },
    {
      videoURL: "https://www.youtube.com/watch?v=UgS7vgquBvo",
      videoStartTime: 35,
      videoEndTime: 42,
      transcript: "いつだってワガママばっかで, 子供みたいね: You’re always so selfish, just like a child",
      subtitles: "いつだってワガママばっかで, 子供みたいね"
    },
    {
      videoURL: "https://www.youtube.com/watch?v=eq8r1ZTma08",
      videoStartTime: 58,
      videoEndTime: 101
    },
    {
      videoURL: "https://www.youtube.com/watch?v=c8_Ctg_VvD0",
      videoStartTime: 48,
      videoEndTime: 51
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