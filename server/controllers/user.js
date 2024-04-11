// Create express router and import user service
import express from 'express';
import userService from '../services/user.js';
import loggingService from '../services/logging/index.js';

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
    // Allow only one admin
    if (req?.body?.role === 'admin') {
        const admins = await userService.getAdmins();
        if (admins.length >= 1) {
            res.status(400).json({ message: 'ADMIN_LIMIT_REACHED' });
            return;
        }
        loggingService.log(`Admin created ${JSON.stringify(req.body)}`);
    }
    const user = await userService.create(req.body);
    res.status(201).json({ message: 'User created', data: user });
});

// Delete user
router.delete('/:id', async (req, res) => {
    await userService.delete(req.params.id);
    res.json({ message: 'User deleted' });
});

export default router;