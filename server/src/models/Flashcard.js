const Model = require("./Model.js");

class Flashcard extends Model {
  static get tableName() {
    return "flashcards";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["videoURL", "videoStartTime", "videoEndTime"],
      properties: {
        videoURL: { type: "string", pattern: "^(?:https?:\\\/\\\/)?(?:www\\.|m\\.)?(?:youtu\\.be\\\/|youtube\\.com\\\/(?:embed\\\/|v\\\/|watch\\?v=|watch\\?.+&v=))((\\w|-){11})(?:\\S+)?$" },
        videoStartTime: { type: ["string", "integer"] },
        videoEndTime: { type: ["string", "integer"] },
        subtitles: { type: "string" },
        transcript: { type: "string" },
      }
    }
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