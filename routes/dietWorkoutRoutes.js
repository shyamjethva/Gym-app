import express from 'express';
import DietWorkout from '../models/DietWorkout.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try { res.json(await DietWorkout.find()); } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
  try { res.json(await DietWorkout.create(req.body)); } catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;
