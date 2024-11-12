import express from 'express'
import userController from '../controller/userController.js';
const router = express.Router();
import  isAuthenticated  from '../middleware/auth.js';
import userValidation from '../validation/userValidation.js';


router.post('/signup', userValidation.createUser, userController.SignUp);
router.post('/login', userController.Login);
router.put('/update', isAuthenticated.isAuthenticated, userController.UpdateUser);
router.get('/details', isAuthenticated.isAuthenticated, userController.getUserDetails);
router.post('/reset/email', userController.ForgotPasswordEmail);
router.post('/reset/:token', userController.ResetPassword);
router.delete('/:userId', isAuthenticated.isAuthenticated, userController.DeleteUser);


export default router