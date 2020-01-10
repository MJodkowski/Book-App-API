import express from 'express';
import User from '../models/user';

const registerUser = async (req, res) => {
  try {
    if (await User.findOne({ name: req.body.name })) {
      return res.status(400).send('User already exists!');
    }
    const user = new User(req.body);
    const token = await user.generateToken();
    res.cookie('authToken', token, { httpOnly: true });
    await user.save();
    res.send({ user, token });
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};

const registerUserRoute = express.Router();
registerUserRoute.post('/registerUser', registerUser);

export default registerUserRoute;
