import { Router } from 'express';
import upload from '../Middleware/multer.middleware.js'; // Import the upload middleware
import { createTicket, getAllTicket, sendOTP, updateTicket } from '../Controllers/ticketController.js';
import { isLoggedIn, authorizeRoles } from '../Middleware/auth.middleware.js';

const router = Router();

//5 is limit to upload image
router.post('/send', sendOTP);
router.post('/', upload.array('pictures', 5), createTicket);
router.get('/', getAllTicket);
router.put('/:id', isLoggedIn, authorizeRoles('RESCUER'), updateTicket);

export default router;
