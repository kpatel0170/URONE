import AuthService from '../service/auth.service.mjs';

export const registerUser = async (req, res) => {
  try {
    const { email, name, password, passwordConfirmation } = req.body;

    const newUser = await AuthService.registerUser(email, name, password, passwordConfirmation);

    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await AuthService.loginUser(email, password);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).json("Wrong Password");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
