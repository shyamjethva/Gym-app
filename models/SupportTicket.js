import mongoose from 'mongoose';

const supportTicketSchema = new mongoose.Schema({
  id: { type: String, required: true }, // TK-123
  text: { type: String, required: true },
  by: { type: String, required: true },
  status: { type: String, default: 'Open' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('SupportTicket', supportTicketSchema);
