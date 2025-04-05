import bcrypt from "bcrypt";

export const SALT_ROUNDS = 10;

export class AuthService {
  /** @type {import("mongoose").Connection} */
  db;
  /** @type {import("mongoose").Model} */
  Profile;
  /** @type {import("mongoose").Model} */
  User;

  constructor(db, Profile, User) {
    this.db = db;
    this.Profile = Profile;
    this.User = User;
  }

  static get deps() {
    return ["db", "Profile", "User"];
  }

  async signup({ username, email, password, name }) {
    const passwordHash = await this.hashPassword(password);

    const user = await this.User.create({
      username,
      email,
      passwordHash,
    });

    const profile = await this.Profile.create({
      userId: user._id,
      name,
    });

    user.profiles.push(profile._id);
    await user.save();

    const newUser = await this.User.findById(user._id).populate("profiles");

    const userObject = newUser.toObject();
    delete userObject.passwordHash;

    return userObject;
  }

  async hashPassword(password) {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    return hashedPassword;
  }
}
