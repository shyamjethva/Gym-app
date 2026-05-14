import mongoose from 'mongoose';

const dietWorkoutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['Diet', 'Workout'], required: true },
  items: [{ type: String }],
  description: { type: String }
});

export default mongoose.model('DietWorkout', dietWorkoutSchema);
