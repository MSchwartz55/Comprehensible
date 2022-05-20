import express from "express";
import { Collection } from "../../../models/index.js";

const collectionsRouter = new express.Router();

collectionsRouter.get("/", async (req, res) => {
  const collection = await Collection.query().where("userId", req.user.id).withGraphFetched("flashcard");
  console.log(collection)
  try {

    console.log(collection);
    return res.status(200).json({ collection });
  } catch (errors) {
    return res.status(500).json({ errors });
  }
});

export default collectionsRouter;