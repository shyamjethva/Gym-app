import express from 'express';
import Schedule from '../models/Schedule.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try { res.json(await Schedule.find()); } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
  try { res.json(await Schedule.create(req.body)); } catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;
