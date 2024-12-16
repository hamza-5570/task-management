import express from 'express'
import WorkedHoursController from '../controller/workedHoursController.js';
const router = express.Router();
import isAuthenticated from '../middleware/auth.js';
import WorkedHoursValidation from '../validation/workedHoursValidation.js';


router.post('/create', isAuthenticated.isAuthenticated, WorkedHoursValidation.createWorkedHours, WorkedHoursController.createWorkedHours);
router.get('/task/workedHours', isAuthenticated.isAuthenticated, WorkedHoursController.getTaskWorkedHours);
router.put('/update/:id', isAuthenticated.isAuthenticated, WorkedHoursController.updateWorkedHours);
router.delete('/delete/:id', isAuthenticated.isAuthenticated, WorkedHoursController.deleteWorkedHours);

export default router