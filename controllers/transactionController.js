import Transaction from '../models/Transaction.js';

export const getTransactions = async (req, res) => {
  try {
    const data = await Transaction.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createTransaction = async (req, res) => {
  try {
    const newTxn = new Transaction(req.body);
    await newTxn.save();
    res.status(201).json(newTxn);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
