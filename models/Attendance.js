import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  memberName: { type: String, required: true },
  memberPlan: { type: String, required: true },
  status: { type: String, default: 'Present' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Attendance', attendanceSchema);
