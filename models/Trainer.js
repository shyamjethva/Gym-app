import mongoose from 'mongoose';

const trainerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  rating: { type: Number, default: 5 },
  members: { type: Number, default: 0 },
  shift: { type: String, required: true },
  status: { type: String, default: 'Active' },
  salary: { type: Number, default: 0 },
  salaryStatus: { type: String, default: 'Paid' }
});

export default mongoose.model('Trainer', trainerSchema);

