import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  memberCount: { type: Number, default: 0 }
});

export default mongoose.model('Plan', planSchema);
