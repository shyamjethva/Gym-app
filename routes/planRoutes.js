import express from 'express';
import Plan from '../models/Plan.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try { res.json(await Plan.find()); } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
  try { res.json(await Plan.create(req.body)); } catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;
