import express from 'express';
import { getTrainers, createTrainer, updateTrainer } from '../controllers/trainerController.js';

const router = express.Router();

router.get('/', getTrainers);
router.post('/', createTrainer);
router.put('/:id', updateTrainer);

export default router;
