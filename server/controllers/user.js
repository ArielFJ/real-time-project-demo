// Create express router and import user service
import express from 'express';
import userService from '../services/user.js';

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
    const users = await userService.getAll();
    res.json(users);
});

// Get user by id
router.get('/:id', async (req, res) => {
    const user = await userService.getById(req.params.id);
    res.json(user);
});

// Create user
router.post('/', async (req, res) => {
    const user = await userService.create(req.body);
    res.status(201).json({ message: 'User created', data: user });
});

export default router;