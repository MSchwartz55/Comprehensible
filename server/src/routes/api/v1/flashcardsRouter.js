import express from "express";
import { Flashcard } from "../../../models/index.js";

const flashcardsRouter = new express.Router();

flashcardsRouter.get("/", async (req, res) => {
  try {
    const flashcards = await Flashcard.query();
    return res.status(200).json({ flashcards });
  } catch (errors) {
    return res.status(500).json({ errors });
  }
});

export default flashcardsRouter;