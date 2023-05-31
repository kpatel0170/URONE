import UserModel from '../model/user.model.mjs';

const UserService = {
  async getUser(id) {
    try {
      return await UserModel.findById(id);
    } catch (error) {
      throw error;
    }
  }
};

export default UserService;
