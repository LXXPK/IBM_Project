const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Admin = require('../models/Admin');

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!['user', 'admin'].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const model = role === 'admin' ? Admin : User;
  const newUser = new model({ name, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json({ message: `${role} registered successfully` });
  } catch (err) {
    res.status(500).json({ message: "Error registering", error: err });
  }
};


exports.login = async (req, res) => {
  const { email, password, role } = req.body;

  if (!['user', 'admin'].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  const model = role === 'admin' ? Admin : User;
  const user = await model.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, role });
};
