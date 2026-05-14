import express from 'express';
import Expense from '../models/Expense.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try { res.json(await Expense.find()); } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
  try { res.json(await Expense.create(req.body)); } catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;
