import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const { Schema } = mongoose;

/**
 * Schema for a User document.
 */
const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    type: { type: String, required: true, enum: ["student", "professor", "staff", "other"] },
    profilePicture: { type: String, default: "" },
    about: {type: String, default: ""},
    followers: [],
    following: []
  },
  {
    timestamps: true,
  }
);

/**
 * Middleware function to hash the user's password before saving.
 */
userSchema.pre("save", async function (next) {
  let user = this;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(parseInt(process.env.SALT_WORK_FACTOR));

  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

/**
 * comparePassword()
 * Method to compare user passwords.
 * @param {string} candidatePassword - The password to compare.
 * @returns {Promise<boolean>} - True if the passwords match, false otherwise.
 */
userSchema.methods.comparePassword = async function (candidatePassword) {
  const user = this;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

/**
 * Mongoose model for the User collection.
 */
const UserModel = mongoose.model("User", userSchema);

export default UserModel;
