import mongoose from 'mongoose';
import projectModel from '../models/projectModel.js';
import userModel from '../models/userModel.js';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Paystack secret from env
const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;

// ** Verify and Add Investment
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

// ** GET Investor Stats
const getInvestorDashboardStats = async (req, res) => {
   const investorId = req.user._id;

   try {
      const investorObjectId = new mongoose.Types.ObjectId(investorId);

      // Fetch projects containing this investor
      const projects = await projectModel.find({ "investors.investor": investorObjectId });

      let totalInvested = 0;
      let highestSingleInvestment = 0;
      let totalInvestmentCount = 0;
      let mostRecentInvestment = null;

      const projectIds = new Set();

      projects.forEach(project => {
         project.investors.forEach(investment => {
            if (investment.investor.equals(investorObjectId)) {
               totalInvested += investment.amount;
               totalInvestmentCount += 1;

               if (investment.amount > highestSingleInvestment) {
                  highestSingleInvestment = investment.amount;
               }

               if (!mostRecentInvestment || new Date(investment.date) > new Date(mostRecentInvestment.date)) {
                  mostRecentInvestment = {
                     title: project.title,
                     date: investment.date
                  };
               }

               projectIds.add(project._id.toString());
            }
         });
      });

      const averageInvestmentPerProject = projectIds.size > 0
         ? totalInvested / projectIds.size
         : 0;

      return res.status(200).json({
         success: true,
         investorStat: {
            totalInvested,
            projectsSupported: projectIds.size,
            averageInvestmentPerProject,
            highestSingleInvestment,
            totalInvestmentCount,
            mostRecentProject: mostRecentInvestment
         },
      });

   } catch (err) {
      console.error("Investor Stats Error:", err);
      return res.status(500).json({ success: false, message: "Server error" });
   }
};

export {
   verifyAndAddInvestment,
   getInvestorDashboardStats
};