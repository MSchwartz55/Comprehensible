const Model = require("./Model.js");

class Flashcard extends Model {
  static get tableName() {
    return "flashcards";
  }

}

module.exports = Flashcard;