import mongoose from 'mongoose';
import projectModel from '../models/projectModel.js';
import userModel from '../models/userModel.js';
import axios from 'axios';
import dotenv from 'dotenv';
import investmentModel from '../models/investmentModel.js';

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

// ** Get My Investments
const getMyInvestments = async (req, res) => {
   const investorId = req.user._id;

   try {
      const investorObjectId = new mongoose.Types.ObjectId(investorId);

      const projects = await projectModel.find({ 'investors.investor': investorObjectId })
         .select('title thumbnail goal currentFunding duration createdAt investors');

      const now = new Date();
      const investments = [];

      for (const project of projects) {
         // Filter all investments made by this user
         const userInvestments = project.investors.filter(i =>
            i.investor.toString() === investorId.toString()
         );

         if (userInvestments.length > 0) {
            const totalAmount = userInvestments.reduce((sum, i) => sum + i.amount, 0);
            const latestInvestmentDate = userInvestments.reduce((latest, i) =>
               !latest || new Date(i.investedAt) > new Date(latest)
                  ? i.investedAt
                  : latest
               , null);

            const percentageFunded = project.goal
               ? Math.min((project.currentFunding / project.goal) * 100, 100)
               : 0;

            const projectAgeDays = Math.floor((now - project.createdAt) / (1000 * 60 * 60 * 24));
            const daysLeft = Math.max(project.duration - projectAgeDays, 0);

            let status = 'In Progress';
            if (percentageFunded >= 100) {
               status = 'Funded';
            } else if (daysLeft === 0) {
               status = 'Completed';
            }

            investments.push({
               _id: project._id,
               amount: totalAmount,
               createdAt: latestInvestmentDate,
               project: {
                  title: project.title,
                  thumbnail: project.thumbnail,
                  goal: project.goal,
                  amountRaised: project.currentFunding,
                  percentageFunded: Math.round(percentageFunded),
               },
               status,
            });
         }
      }

      res.status(200).json({ success: true, investments });

   } catch (error) {
      console.error("Error fetching investments:", error);
      res.status(500).json({ success: false, message: 'Server error fetching investments' });
   }
};


// **Get Investment History
const getInvestmentHistory = async (req, res) => {
   const investorId = req.user._id;

   try {
      const investorObjectId = new mongoose.Types.ObjectId(investorId);

      // Get only projects where this investor has invested
      const projects = await projectModel.find({ 'investors.investor': investorObjectId })
         .select('title investors');

      const history = [];

      for (const project of projects) {
         for (const inv of project.investors) {
            if (inv.investor.toString() === investorId.toString()) {

               const method = inv.paymentRef.startsWith('momo_') ? 'Momo'
                  : inv.paymentRef.startsWith('card_') ? 'Card'
                     : 'Unknown';

               history.push({
                  date: inv.investedAt,
                  amount: inv.amount,
                  project: project.title,
                  method,
               });
            }
         }
      }

      // Sort by most recent first
      history.sort((a, b) => new Date(b.date) - new Date(a.date));

      res.status(200).json({ success: true, history });

   } catch (error) {
      console.error("Error fetching investment history:", error);
      res.status(500).json({ success: false, message: 'Server error fetching investment history' });
   }
};

export {
   verifyAndAddInvestment,
   getInvestorDashboardStats,
   getMyInvestments,
   getInvestmentHistory,
};