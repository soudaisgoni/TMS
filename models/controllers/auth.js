const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { sendVerificationEmail } = require("../utils/email");


exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already used" });
    }

    
    const user = new User({ name, email, password });
    await user.save();

    
    await sendVerificationEmail(user);

    res.status(201).json({ message: "verify your email." });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email or password" });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Email or incorrect password" });
    }

    
    const token = user.generateAuthToken();

    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};