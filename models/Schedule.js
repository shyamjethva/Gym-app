import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  className: { type: String, required: true },
  trainerName: { type: String, required: true },
  time: { type: String, required: true },
  capacity: { type: Number, required: true },
  enrolled: { type: Number, default: 0 }
});

export default mongoose.model('Schedule', scheduleSchema);
