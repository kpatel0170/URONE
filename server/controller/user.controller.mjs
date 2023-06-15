import UserService from '../service/user.service.mjs';

export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserService.getUser(id);

    if (user) {
      const { password, ...otherDetails } = user._doc;

      res.status(200).json({success: true, data:otherDetails});
    } else {
      res.status(404).json({success: false, error:"No such user exists"});
    }
  } catch (error) {
    res.status(500).json({success: false, error: error});
  }
};

export const updateProfile = async (req, res) => {
  const id = req.params.id;
  const { name, email, about, type } = req.body;
  const profilePicture = req.file.filename;

  try {
    const updatedUser = await UserService.updateProfile(id, name, email, about, type, profilePicture);

    if (updatedUser) {
      return res.status(200).json({ success: true, data: updatedUser });
    } else {
      return res.status(404).json({ success: false, error: "No such user exists" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};