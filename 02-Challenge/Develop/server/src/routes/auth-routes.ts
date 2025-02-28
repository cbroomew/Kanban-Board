import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username }});
    if (!user) {
      return res.status(404).send('User not found');
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).send('Invalid password');
    }
    const key = process.env.JWT_SECRET || '';
    const token = jwt.sign({ username }, key, { expiresIn: '1h' });
    return res.status(200).send(token);
  } catch (error) {
    return res.status(500).send('Internal Server Error');
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
