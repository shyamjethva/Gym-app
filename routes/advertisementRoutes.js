import express from 'express';
import Advertisement from '../models/Advertisement.js';

const router = express.Router();

// GET all ads
router.get('/', async (req, res) => {
  try {
    const ads = await Advertisement.find().sort({ createdAt: -1 });
    res.json(ads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new ad
router.post('/', async (req, res) => {
  const ad = new Advertisement({
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    targetUrl: req.body.targetUrl || '',
    status: req.body.status || 'Active',
    targetAudience: req.body.targetAudience || 'All',
  });

  try {
    const newAd = await ad.save();
    res.status(201).json(newAd);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE an ad
router.put('/:id', async (req, res) => {
  try {
    const updatedAd = await Advertisement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAd) {
      return res.status(404).json({ message: 'Advertisement not found' });
    }
    res.json(updatedAd);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an ad
router.delete('/:id', async (req, res) => {
  try {
    const ad = await Advertisement.findByIdAndDelete(req.params.id);
    if (!ad) {
      return res.status(404).json({ message: 'Advertisement not found' });
    }
    res.json({ message: 'Advertisement deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
