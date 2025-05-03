import express from 'express';
import authUser from '../middlewares/authUser.js';
import { verifyAndAddInvestment, getInvestorDashboardStats } from '../controllers/investmentController.js';
const investmentRouter = express.Router();

investmentRouter.post('/invest', authUser, verifyAndAddInvestment);
investmentRouter.get('/investor-stats', authUser, getInvestorDashboardStats);

export default investmentRouter;