import Attendance from '../models/Attendance.js';

export const getAttendance = async (req, res) => {
  try {
    const data = await Attendance.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createAttendance = async (req, res) => {
  try {
    const log = new Attendance(req.body);
    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
