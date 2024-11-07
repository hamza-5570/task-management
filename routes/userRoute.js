import express from 'express'
import userController from '../controller/userController.js';
const router = express.Router();
import  isAuthenticated  from '../middleware/auth.js';


router.post('/signup', userController.SignUp);
router.post('/login', userController.Login);
router.put('/update', isAuthenticated.isAuthenticated, userController.UpdateUser);
router.delete('/:userId', isAuthenticated.isAuthenticated, userController.DeleteUser);


export default router