import UserModel from '../model/user.model.mjs';

const UserService = {
  async getUser(id) {
    try {
      return await UserModel.findById(id);
    } catch (error) {
      throw error;
    }
  },

  async updateProfile(id, name, email, about, type,  profilePicture) {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        id,
        { name, email, about, type, profilePicture },
        { new: true }
      );

      return updatedUser;
    } catch (error) {
      throw error;
    }
  }    
};

export default UserService;
