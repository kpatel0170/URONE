import UserModel from "../model/user.model.mjs";

const AuthService = {
  async registerUser(email, name, password, passwordConfirmation, type) {
    if (password !== passwordConfirmation) {
      throw new Error("Passwords do not match");
    }

    const newUser = new UserModel({
      email,
      password,
      name,
      type,
    });

    try {
      await newUser.save();
      return newUser;
    } catch (error) {
        if (error.code === 11000) {
            throw new Error("Email is already registered");
          }
        throw new Error(error.message);
    }
  },

  async loginUser(email, password) {
    try {
      const user = await UserModel.findOne({ email: email });

      if (user) {
        const isValidPassword = await user.comparePassword(password);
  
        if (isValidPassword) {
          return user;
        } else {
          throw new Error("Invalid password");
        }
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default AuthService;
