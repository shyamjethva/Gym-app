import express from 'express';
import { getSettings, updateSetting, getSupportTickets, createSupportTicket } from '../controllers/settingsController.js';

const router = express.Router();

// Config map paths
router.get('/', getSettings);
router.post('/', updateSetting);
router.put('/', updateSetting);

// Support ticke paths
router.get('/tickets', getSupportTickets);
router.post('/tickets', createSupportTicket);

export default router;
