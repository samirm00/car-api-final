import express from 'express';

import userControllers from '../controllers/user.js';

const router = express.Router();

router.get('/register', userControllers.getRegister);
router.get('/login', userControllers.getLogin);
router.post('/register', userControllers.postRegister);
router.post('/login', userControllers.postLogin);
router.get('/logout', userControllers.getLogout);

export default router;
