import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Import Routes
import memberRoutes from './routes/memberRoutes.js';
import trainerRoutes from './routes/trainerRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import planRoutes from './routes/planRoutes.js';
import scheduleRoutes from './routes/scheduleRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import dietWorkoutRoutes from './routes/dietWorkoutRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("🔥 Successfully connected to gym-admin-db MongoDB cluster!"))
  .catch(err => console.error("🚨 MongoDB Connection Error:", err));

// --- REGISTER ROUTERS ---
app.use('/api/members', memberRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/diet-workouts', dietWorkoutRoutes);


// --- 1. SEED ROUTE (Optional loader for brand defaults) ---
app.get('/api/seed-defaults', async (req, res) => {
  try {
    // 1. Set defaults for branding
    const Setting = (await import('./models/Setting.js')).default;
    const brand = await Setting.findOne({ key: 'brandName' });
    if (!brand) {
      await Setting.create({ key: 'brandName', value: 'FitPulse Pro' });
    }

    // 2. Set default Support Ticket sample
    const SupportTicket = (await import('./models/SupportTicket.js')).default;
    if (await SupportTicket.countDocuments() === 0) {
      await SupportTicket.create({
        id: 'TK-4821',
        text: 'The main treadmill in zone B is producing a loud clicking sound.',
        by: 'Aarav Sharma',
        status: 'Open'
      });
    }

    // 3. Seed Plans
    const Plan = (await import('./models/Plan.js')).default;
    if (await Plan.countDocuments() === 0) {
      await Plan.insertMany([
        { name: 'Standard Monthly', duration: '1 Month', price: 1500, memberCount: 45 },
        { name: 'Quarterly Pro', duration: '3 Months', price: 4000, memberCount: 28 },
        { name: 'Annual Elite', duration: '12 Months', price: 12000, memberCount: 15 }
      ]);
    }

    // 4. Seed Schedules
    const Schedule = (await import('./models/Schedule.js')).default;
    if (await Schedule.countDocuments() === 0) {
      await Schedule.insertMany([
        { className: 'Morning Yoga', trainerName: 'Sarah J.', time: '07:00 AM', capacity: 20, enrolled: 18 },
        { className: 'HIIT Cardio', trainerName: 'Mike Ross', time: '06:00 PM', capacity: 15, enrolled: 12 }
      ]);
    }

    // 5. Seed Enquiries
    const Enquiry = (await import('./models/Enquiry.js')).default;
    if (await Enquiry.countDocuments() === 0) {
      await Enquiry.insertMany([
        { name: 'Rahul Sharma', phone: '9876543210', interest: 'Weight Loss', status: 'Pending' },
        { name: 'Anjali Gupta', phone: '9123456789', interest: 'Yoga Class', status: 'Contacted' }
      ]);
    }

    // 6. Seed Diet/Workout
    const DietWorkout = (await import('./models/DietWorkout.js')).default;
    if (await DietWorkout.countDocuments() === 0) {
      await DietWorkout.insertMany([
        { title: 'Lean Muscle Diet', type: 'Diet', items: ['High Protein', 'Low Carb', 'Healthy Fats'] },
        { title: 'Fat Loss Workout', type: 'Workout', items: ['Burpees', 'Squats', 'Deadlifts'] }
      ]);
    }

    // 7. Seed Members
    const Member = (await import('./models/Member.js')).default;
    if (await Member.countDocuments() === 0) {
      await Member.insertMany([
        { name: 'John Doe', email: 'john@example.com', phone: '9876543210', plan: 'Annual Elite', status: 'active' },
        { name: 'Jane Smith', email: 'jane@example.com', phone: '9123456789', plan: 'Monthly Standard', status: 'expiring' }
      ]);
    }

    // 8. Seed Trainers
    const Trainer = (await import('./models/Trainer.js')).default;
    if (await Trainer.countDocuments() === 0) {
      await Trainer.insertMany([
        { name: 'Mike Ross', specialization: 'Bodybuilding', shift: '6 AM - 12 PM', salary: 25000, salaryStatus: 'Paid' },
        { name: 'Sarah J.', specialization: 'Yoga & Pilates', shift: '4 PM - 10 PM', salary: 22000, salaryStatus: 'Pending' }
      ]);
    }


    res.json({ success: true, message: 'Demo setup & config baseline populated.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// --- START SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Gym Backend listening on http://0.0.0.0:${PORT}`);
});

