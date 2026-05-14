import Setting from '../models/Setting.js';
import SupportTicket from '../models/SupportTicket.js';

// --- General Branding Settings ---
export const getSettings = async (req, res) => {
  try {
    const data = await Setting.find();
    // transform into dictionary format for convenience
    const config = {};
    data.forEach(item => { config[item.key] = item.value; });
    res.json(config);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateSetting = async (req, res) => {
  try {
    const payload = req.body;
    
    // If user passes object { gymName: '...', address: '...' }, loop and save all
    const promises = Object.entries(payload).map(([key, value]) => {
      return Setting.findOneAndUpdate(
        { key },
        { value },
        { upsert: true, new: true }
      );
    });
    
    await Promise.all(promises);
    res.json({ success: true, message: 'Settings updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// --- Support Ticket Handling ---
export const getSupportTickets = async (req, res) => {
  try {
    const tickets = await SupportTicket.find().sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createSupportTicket = async (req, res) => {
  try {
    const ticket = new SupportTicket(req.body);
    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
