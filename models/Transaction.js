import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  member: { type: String, required: true },
  amount: { type: String, required: true },
  method: { type: String, required: true },
  plan: { type: String, required: true },
  status: { type: String, default: 'success' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Transaction', transactionSchema);
