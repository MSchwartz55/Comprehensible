import express from "express";
import { Flashcard } from "../../../models/index.js";
import { ValidationError } from "objection";
import cleanUserInput from "../../../services/cleanUserInput.js";

const flashcardsRouter = new express.Router();

flashcardsRouter.get("/", async (req, res) => {
  try {
    const flashcards = await Flashcard.query();
    return res.status(200).json({ flashcards });
  } catch (errors) {
    return res.status(500).json({ errors });
  }
});

flashcardsRouter.post("/", async (req, res) => {
  try {
    const cleanBody = cleanUserInput(req.body);
    const flashcard = await Flashcard.query().insertAndFetch(cleanBody);
    return res.status(201).json({ flashcard });
  } catch (errors) {
    if (errors instanceof ValidationError) {
      return res.status(422).json({ errors: errors.data });
    }
    return res.status(500).json({ errors });
  }
});

export default flashcardsRouter;