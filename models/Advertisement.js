import mongoose from 'mongoose';

const advertisementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  targetUrl: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active',
  },
  targetAudience: {
    type: String,
    enum: ['Members', 'Trainers', 'All'],
    default: 'All',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Advertisement = mongoose.model('Advertisement', advertisementSchema);
export default Advertisement;
