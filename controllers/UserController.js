const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createUser = async (req, res) => {
  const { name, email, username, password, role, phone, address, dateofBirth, gender, image } = req.body;
  console.log(req.body) 
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  var profileImage;
  // if (imageFile) {
  //   console.log(imageFile)
  //   const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  //   await fs.mkdir(uploadsDir, { recursive: true });

  //   const imageFileName = `${Date.now()}-${imageFile.name}`;
  //   const imageFilePath = path.join(uploadsDir, imageFileName);

  //   const buffer = Buffer.from(await imageFile.arrayBuffer());
  //   await fs.writeFile(imageFilePath, buffer);

  //   profileImage = `/uploads/${imageFileName}`;

  // }

  try {
    const user = new User({ name, email, username, passwordHash, role, phone, address,dateofBirth, gender, profileImage });
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.log(err.message)
    res.status(400).json({ message: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const validateUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.find( { email: email });

    if (!foundUser) {
      return res.status(404).json({ok: false, message: 'Username or Email does not exist' });
    }
    console.log(foundUser)
    const isPasswordValid = await bcrypt.compare(password, foundUser[0].passwordHash);
    
    if (!isPasswordValid) {
      return res.status(400).json({ok: false, message: 'Incorrect password' });
    }

    const token = jwt.sign(
      { uid: foundUser._id, email: email },
      '12345',
      { expiresIn: '5d' }
    );

    res.status(200).json({ok: true, message: 'Login successful',token, userId: foundUser[0]._id , role: foundUser[0].role});

  } catch (err) {
    console.log(err.message)
    res.status(500).json({ok: false, message: err.message });
  }
};

module.exports = { getAllUsers, createUser, getUserById, validateUser };