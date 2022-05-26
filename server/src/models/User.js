/* eslint-disable import/no-extraneous-dependencies */
const Bcrypt = require("bcrypt");
const unique = require("objection-unique");
const Model = require("./Model");

const saltRounds = 10;

const uniqueFunc = unique({
  fields: ["email"],
  identifiers: ["id"],
});

class User extends uniqueFunc(Model) {
  static get tableName() {
    return "users";
  }

  set password(newPassword) {
    this.cryptedPassword = Bcrypt.hashSync(newPassword, saltRounds);
  }

  authenticate(password) {
    return Bcrypt.compareSync(password, this.cryptedPassword);
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email"],

      properties: {
        email: { type: "string", pattern: "^\\S+@\\S+\\.\\S+$" },
        cryptedPassword: { type: "string" },
      },
    };
  }

  $formatJson(json) {
    const serializedJson = super.$formatJson(json);

    if (serializedJson.cryptedPassword) {
      delete serializedJson.cryptedPassword;
    }

    return serializedJson;
  }

  static get relationMappings() {
    const { Collection, Flashcard } = require("./index.js");

    return {
      flashcards: {
        relation: Model.ManyToManyRelation,
        modelClass: Flashcard,
        join: {
          from: "users.id",
          through: {
            from: "collections.userId",
            to: "collections.flashcardId"
          },
          to: "flashcards.id"
        }
      },
      collections: {
        relation: Model.HasManyRelation,
        modelClass: Collection,
        join: {
          from: "users.id",
          to: "collections.userId"
        }
      }
    }
  }
}

module.exports = User;
