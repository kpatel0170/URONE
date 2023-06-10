import AuthService from '../service/auth.service.mjs';

export const registerUser = async (req, res) => {
  try {
    const { email, name, password, passwordConfirmation, type } = req.body;

    const newUser = await AuthService.registerUser(email, name, password, passwordConfirmation, type);

    res.status(200).json({success: true, data: newUser});
  } catch (error) {
    res.status(500).json({success: false, error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await AuthService.loginUser(email, password);

    if (user) {
      res.status(200).json({success: true, data:user});
    } else {
      res.status(400).json({success: false, error:"Wrong Password"});
    }
  } catch (error) {
    res.status(500).json({success: false, error: error.message });
  }
};
