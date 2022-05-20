const Model = require("./Model.js");

class Flashcard extends Model {
  static get tableName() {
    return "flashcards";
  }

  static get relationMappings() {
    const { Collection, User } = require("./index.js");

    return {
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "flashcards.id",
          through: {
            from: "collections.flashcardId",
            to: "collections.userId"
          },
          to: "users.id"
        }
      },
      collections: {
        relation: Model.HasManyRelation,
        modelClass: Collection,
        join: {
          from: "flashcards.id",
          to: "collections.flashcardId"
        }
      }
    }
  }
}

module.exports = Flashcard;