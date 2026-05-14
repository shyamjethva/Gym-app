import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  plan: { type: String, required: true },
  status: { type: String, enum: ['active', 'expiring', 'expired'], default: 'active' },
  joinedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Member', memberSchema);
