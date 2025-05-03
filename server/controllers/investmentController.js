import projectModel from '../models/projectModel.js';
import userModel from '../models/userModel.js';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Paystack secret from env
const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;

const verifyAndAddInvestment = async (req, res) => {
   const { reference, projectId, investorId } = req.body;

   if (!reference || !projectId || !investorId) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
   }

   try {
      // 1. Verify Paystack transaction
      const paystackRes = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
         headers: {
            Authorization: `Bearer ${PAYSTACK_SECRET}`
         }
      });

      const data = paystackRes.data;

      if (!data.status || data.data.status !== 'success') {
         return res.status(400).json({ success: false, message: 'Transaction verification failed' });
      }

      // Paystack uses kobo, convert to cedis
      const amount = data.data.amount / 100;

      // 2. Confirm project exists
      const project = await projectModel.findById(projectId);
      if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

      // 3. Confirm investor exists
      const investor = await userModel.findById(investorId);
      if (!investor) return res.status(404).json({ success: false, message: 'Investor not found' });

      // 4. Append to investors array
      project.investors.push({
         investor: investorId,
         amount,
         paymentRef: reference,
         investedAt: new Date()
      });

      // 5. Update funding
      project.currentFunding += amount;
      await project.save();

      return res.status(200).json({
         success: true,
         message: 'Investment successfully',
         projectId: project._id,
         amount,
         reference
      });
   } catch (err) {
      console.error('Investment Error:', err.response?.data || err.message);
      return res.status(500).json({ success: false, message: 'Server error' });
   }
};


export {
   verifyAndAddInvestment
};