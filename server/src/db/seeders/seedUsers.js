import { User } from "../../models/index.js";
import Bcrypt from "bcrypt";

const seedUsers = async () => {
  const userList = [
    {
      email: "admin@admin.com",
      cryptedPassword: Bcrypt.hashSync("hello", 10)
    },
    {
      email: "guest@guest.com",
      cryptedPassword: Bcrypt.hashSync("hello", 10)
    }
  ]

  for (const user of userList) {
    const currentUser = await User.query().findOne(user);
    if (!currentUser) {
      await User.query().insert(user);
    }
  }
}

export default seedUsers;