/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("flashcards", (table) => {
    table.bigIncrements("id");
    table.string("videoURL").notNullable();
    table.integer("videoStartTime").unsigned().notNullable();
    table.integer("videoEndTime").unsigned().notNullable();
    table.string("transcript")
    table.string("subtitles");
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("flashcards");
}
