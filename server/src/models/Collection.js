const Model = require("./Model.js");

class Collection extends Model {
  static get tableName() {
    return "collections";
  }

  static get relationMappings() {
    const { Flashcard, User } = require("./index.js");

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "collections.userId",
          to: "users.id"
        }
      },
      flashcard: {
        relation: Model.BelongsToOneRelation,
        modelClass: Flashcard,
        join: {
          from: "collections.flashcardId",
          to: "flashcards.id"
        }
      }
    }
  }
}

module.exports = Collection;