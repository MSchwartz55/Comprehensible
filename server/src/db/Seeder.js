/* eslint-disable no-console */
import { connection } from "../boot.js"
import seedFlashcards from "./seeders/seedFlashcards.js"

class Seeder {
  static async seed() {
    // include individual seed commands here
    await seedFlashcards();
    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder