const Model = require("./Model.js");

class Collection extends Model {
  static get tableName() {
    return "collections";
  }

}

module.exports = Collection;