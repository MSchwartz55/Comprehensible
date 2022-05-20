import express from "express";
import { User } from "../../../models/index.js";

const collectionsRouter = new express.Router();

collectionsRouter.get("/", async (req, res) => {
  try {
    const user = await User.query().findById(req.user.id);
    const collection = user.$relatedQuery("flashcards");
    return res.status(200).json({ collection });
  } catch (errors) {
    return res.status(500).json({ errors });
  }
});

export default collectionsRouter;