import express from 'express';
import authUser from '../middlewares/authUser.js';
import { verifyAndAddInvestment } from '../controllers/investmentController.js';
const investmentRouter = express.Router();

investmentRouter.post('/invest', authUser, verifyAndAddInvestment);

export default investmentRouter;