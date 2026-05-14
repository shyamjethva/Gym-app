import express from 'express';
import { getNotifications, createNotification, readAllNotifications, clearNotifications } from '../controllers/notificationController.js';

const router = express.Router();

router.get('/', getNotifications);
router.post('/', createNotification);
router.put('/read-all', readAllNotifications);
router.delete('/', clearNotifications);

export default router;
