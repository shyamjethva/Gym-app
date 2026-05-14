import express from 'express';
import Enquiry from '../models/Enquiry.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try { res.json(await Enquiry.find()); } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
  try { res.json(await Enquiry.create(req.body)); } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', async (req, res) => {
  try { res.json(await Enquiry.findByIdAndUpdate(req.params.id, req.body, { new: true })); } catch (err) { res.status(500).json({ error: err.message }); }
});

export default router;
