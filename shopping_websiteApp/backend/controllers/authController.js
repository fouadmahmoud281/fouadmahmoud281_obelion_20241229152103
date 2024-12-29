const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.googleLogin = async (req, res) => {
  const { tokenId } = req.body;

  // Verify Google token and get user info
  // This is a placeholder; you need to implement the actual verification with Google

  try {
    const { email, name } = {}; // Replace with actual Google user info

    let user = await User.findOne({ where: { email } });

    if (!user) {
      user = await User.create({ email, name });
    }

    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.facebookLogin = async (req, res) => {
  const { accessToken, userID } = req.body;

  // Verify Facebook token and get user info
  // This is a placeholder; you need to implement the actual verification with Facebook

  try {
    const { email, name } = {}; // Replace with actual Facebook user info

    let user = await User.findOne({ where: { email } });

    if (!user) {
      user = await User.create({ email, name });
    }

    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.emailLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.register = async (req, res) => {
  const { email, password, phone } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      phone
    });

    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
