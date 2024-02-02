// Create express router and import movie service
import express from 'express';
import movieService from '../services/movie.js';

const router = express.Router();

// Get all movies
router.get('/', async (req, res) => {
    const movies = await movieService.getAll();
    res.json(movies);
});

export default router;