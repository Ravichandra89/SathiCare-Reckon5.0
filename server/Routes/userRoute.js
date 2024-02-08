import { Router } from 'express';
import upload from '../Middleware/multer.middleware.js'; // Import the upload middleware

const router = Router();

import { register, login } from '../Controllers/userController.js';

router.post('/register', register);
router.post('/login', login);

export default router;
