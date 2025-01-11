const express = require('express');
const { getAllUsers, createUser, getUserById, validateUser } = require('../controllers/UserController');
const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:id', getUserById);
router.post('/login',validateUser);

module.exports = router;