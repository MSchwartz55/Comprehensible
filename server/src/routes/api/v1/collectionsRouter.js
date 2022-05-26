import express from "express";
import { Collection } from "../../../models/index.js";
import spacedRepetitionSchedule from "../../../services/spacedRepetionSchedule.js";

const collectionsRouter = new express.Router();

collectionsRouter.get("/", async (req, res) => {
  try {
    const collection = await Collection.query().where("userId", req.user.id).withGraphFetched("flashcard");
    return res.status(200).json({ collection });
  } catch (errors) {
    return res.status(500).json({ errors });
  }
});


collectionsRouter.post("/", async (req, res) => {
  try {
    const userId = req.user.id;
    const flashcardId = req.body.flashcardId;

    if (req.body.evaluation) {
      const currentCollectionEntry = await Collection.query().findOne({ flashcardId, userId });
      const previousRepetitionFactors = {
        repetitions: currentCollectionEntry.repetitions,
        efactor: currentCollectionEntry.efactor,
        interval: currentCollectionEntry.interval
      };
      const newRepetitionSchedule = spacedRepetitionSchedule(previousRepetitionFactors, req.body.evaluation);
      await Collection.query().findOne({ flashcardId, userId }).patch({
        repetitions: newRepetitionSchedule.repetitions,
        efactor: newRepetitionSchedule.efactor,
        interval: newRepetitionSchedule.interval,
        timeOfLastClick: new Date()
      });
      const collection = await Collection.query().findOne({ flashcardId, userId });
      return res.status(201).json({ collection });
    }

    await Collection.query().insert({ userId: userId, flashcardId: flashcardId });
    const collection = await Collection.query().where("userId", userId).where("flashcardId", flashcardId).withGraphFetched("flashcard")
    return res.status(201).json({ collection });
  } catch (errors) {
    return res.status(500).json({ errors });
  }
});

export default collectionsRouter;