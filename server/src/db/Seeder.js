/* eslint-disable no-console */
import { connection } from "../boot.js"
import seedFlashcards from "./seeders/seedFlashcards.js"
import seedUsers from "./seeders/seedUsers.js";
import seedCollections from "./seeders/seedCollections.js";

class Seeder {
  static async seed() {
    // include individual seed commands here
    await seedUsers();
    await seedFlashcards();
    await seedCollections();

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder