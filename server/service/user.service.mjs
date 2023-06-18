import UserModel from '../model/user.model.mjs';

const UserService = {

  /**
   * getUser()
   * Retrieves a user by their ID.
   * @param {id}- The User's ID.
   * @return {Promise<UserModel>} - A promise that resolves to the retrieved user.
   * @throw {Error} - If an error occurs while retrieving the user.
   */
  async getUser(id) {
    try {
      return await UserModel.findById(id);
    } catch (error) {
      throw error;
    }
  },

  /**
   * updateProfile()
   * Updates the profile of a user with the provided information.
   * @param {id, name, email, about, type, profilePicture} id - The User's info. to update.
   * @return {Promise<UserModel>} - A promise that resolves to the updated user.
   * @throw {Error} - If the user is not found or an error occurs while updating the profile.
   */
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
