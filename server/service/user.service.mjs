import UserModel from '../model/user.model.mjs';

const UserService = {
  async getUser(id) {
    try {
      return await UserModel.findById(id);
    } catch (error) {
      throw error;
    }
  },

  async updateProfile(id, name, email, about, type, profilePicture) {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        id,
        { name, email, about, type, profilePicture },
        { new: true }
      );
  
      if (!updatedUser) {
        throw new Error("User not found");
      }
      return updatedUser;
    } catch (error) {
      throw new Error(`Failed to update profile: ${error.message}`);
    }
  }      
};

export default UserService;
