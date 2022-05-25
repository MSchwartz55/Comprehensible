import express from "express";
import { Collection } from "../../../models/index.js";

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

    await Collection.query().insert({ userId: userId, flashcardId: flashcardId });
    const collection = await Collection.query().where("userId", userId).where("flashcardId", flashcardId).withGraphFetched("flashcard")
    return res.status(201).json({ collection });
  } catch (errors) {
    return res.status(500).json({ errors });
  }
});

export default collectionsRouter;