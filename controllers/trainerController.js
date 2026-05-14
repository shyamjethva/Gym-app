import Trainer from '../models/Trainer.js';

export const getTrainers = async (req, res) => {
  try {
    const data = await Trainer.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createTrainer = async (req, res) => {
  try {
    const newTrainer = new Trainer(req.body);
    await newTrainer.save();
    res.status(201).json(newTrainer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTrainer = async (req, res) => {
  try {
    const updated = await Trainer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
