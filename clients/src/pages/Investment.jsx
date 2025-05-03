import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { FaMoneyBillWave, FaLock, FaUsers, FaRocket, FaArrowLeft } from 'react-icons/fa';
import { formatCurrencyAmount } from '../helper/helper';
import { toast } from 'react-toastify';
import axios from 'axios';
import ShimmerLoader from '../components/ShimmerLoder';

const Investment = () => {
   const { id } = useParams();
   const { projects, currency, backendUrl, token, userData } = useContext(AppContext);
   const project = projects?.find((p) => p._id === id);
   const [amount, setAmount] = useState('');
   const [loading, setLoading] = useState(false);

   const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;


   // Handle Invest button
   const handleInvest = () => {
      if (!amount || amount < project.minInvestment) {
         return toast(`Minimum investment is ${currency}${project.minInvestment}`);
      }

      const reference = `PF-${Date.now()}-${Math.floor(Math.random() * 100000)}`;

      const onPaymentSuccess = (response) => {
         setLoading(true);
         verifyInvestment(response.reference);
      };

      const verifyInvestment = async (ref) => {
         try {
            const { data } = await axios.post(
               `${backendUrl}/api/investments/invest`,
               {
                  reference: ref,
                  projectId: project._id,
                  investorId: userData?._id,
               },
               {
                  headers: {
                     Authorization: `Bearer ${token}`,
                     'Content-Type': 'application/json',
                  },
               }
            );

            if (data.success) {
               toast.success(data.message);
            } else {
               toast.error(data.message || 'Investment failed to verify.');
            }
         } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Server error occurred');
         } finally {
            setLoading(false);
         }
      };

      // ✅ Add the debug log here before Paystack is triggered
      console.log("DEBUG:", {
         key: publicKey,
         email: userData?.email,
         amount,
         ref: reference,
      });

      // Paystack payment handler
      const paystackHandler = window.PaystackPop.setup({
         key: publicKey,
         email: userData?.email || 'investor@example.com',
         amount: amount * 100,
         currency: 'GHS',
         ref: reference,
         callback: onPaymentSuccess,
         onClose: () => {
            toast.warn('Transaction was canceled.');
         },
      });

      paystackHandler.openIframe();
   };


   if (loading || !project) {
      return (
         <div className="grid md:grid-cols-3 gap-6 mt-8">
            { Array.from({ length: 3 }).map((_, idx) => (
               <div key={ idx } className="p-5 rounded-lg shadow-md space-y-4 bg-white">
                  <ShimmerLoader height="h-8" width="w-2/3" />
                  <ShimmerLoader height="h-6" width="w-1/3" />
               </div>
            )) }
         </div>
      );
   }


   return (
      <section className="bg-white min-h-screen py-12 px-4 sm:px-8 lg:px-24">
         {/* 1. Project Summary Header */ }
         <motion.div
            initial={ { opacity: 0, y: 30 } }
            animate={ { opacity: 1, y: 0 } }
            transition={ { duration: 0.5 } }
            className="mb-12"
         >
            {/* Breadcrumb & Hero */ }
            <div className="mb-6">
               <Link
                  to={ `/projects/${project._id}` }
                  onClick={ () => scrollTo(0, 0) }
                  className="text-sm text-blue-600 flex items-center gap-2 hover:underline"
               >
                  <FaArrowLeft /> Back to Projects
               </Link>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-3">{ project.title }</h1>
            <div className="text-sm text-gray-600 flex flex-wrap gap-2 items-center">
               <span>By { project.creator?.fullName }</span>
               <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs">{ project.category }</span>
            </div>
            <img
               src={ project.thumbnail }
               alt={ project.title }
               className="w-full h-56 sm:h-72 object-cover mt-4 rounded-lg shadow-sm"
            />
            <p className="mt-4 text-gray-700 text-sm italic">“{ project.overview.slice(0, 100) }...”</p>
         </motion.div>

         {/* Grid Container */ }
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Investment Form */ }
            <motion.div
               initial={ { opacity: 0, x: -30 } }
               animate={ { opacity: 1, x: 0 } }
               transition={ { duration: 0.5, delay: 0.2 } }
            >
               <h2 className="text-xl font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
                  <FaMoneyBillWave className="text-yellow-500" />
                  Make an Investment
               </h2>

               <input
                  type="number"
                  placeholder={ `Enter amount ${currency}${project.minInvestment}` }
                  onChange={ (e) => setAmount(e.target.value) }
                  className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
                  min={ project.minInvestment }
               />

               <button
                  onClick={ handleInvest }
                  disabled={ loading }
                  className={ `w-full bg-[#FACC15] text-black py-2 rounded font-semibold transition cursor-pointer ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-yellow-400'
                     }` }
               >
                  { loading ? 'Processing...' : 'Invest Now' }
               </button>
            </motion.div>

            {/* Right: Funding Stats, Impact, Trust */ }
            <motion.div
               initial={ { opacity: 0, x: 30 } }
               animate={ { opacity: 1, x: 0 } }
               transition={ { duration: 0.5, delay: 0.2 } }
               className="space-y-10"
            >
               {/* Funding Summary */ }
               <div>
                  <h2 className="text-lg font-semibold text-[#0F172A] mb-2">Funding Summary</h2>
                  <div className="w-full bg-gray-200 h-3 rounded-full mb-2">
                     <div
                        className="h-3 bg-[#FACC15] rounded-full"
                        style={ { width: `${project.percentageFunded}%` } }
                     />
                  </div>
                  <div className="flex flex-wrap justify-between text-sm text-gray-600">
                     <span>{ formatCurrencyAmount(project.amountRaised) } raised</span>
                     <span>Goal: { project.goal ? formatCurrencyAmount(project.goal, currency) : 'No goal set' }</span>
                     <span>{ project.percentageFunded }% funded</span>
                     <span>{ project.daysLeft } days left</span>
                  </div>

                  <div>
                     <span className="text-xs text-blue-600">Min Invest: </span>
                     <span className="text-xs text-gray-600">
                        { project.minInvestment ? formatCurrencyAmount(project.minInvestment, currency) : 'No min investment' }
                     </span>
                  </div>
               </div>

               {/* Impact */ }
               <div>
                  <h2 className="text-lg font-semibold text-[#0F172A] mb-2 flex items-center gap-2">
                     <FaRocket className="text-green-600" />
                     Your Impact
                  </h2>
                  <ul className="list-disc list-inside text-gray-600 text-sm">
                     <li>₵100 provides water to 10 people</li>
                     <li>₵200 supports 2 mobile health kits</li>
                     <li>₵500 funds a classroom tablet</li>
                  </ul>
                  <p className="mt-3 text-xs text-gray-500 flex items-center gap-1">
                     <FaUsers className="text-gray-400" /> <strong>{ project.investorCount } investors</strong> so far
                  </p>
               </div>

               {/* Trust */ }
               <div className="bg-gray-50 p-4 rounded-lg border text-sm text-gray-600">
                  <p className="mb-2 font-semibold flex items-center gap-2">
                     <FaLock className="text-gray-500" />
                     Secure & Trusted
                  </p>
                  <p>All payments are securely processed.</p>
                  <p>Your investment goes directly to the project.</p>
                  <p className="mt-2 underline cursor-pointer text-blue-600">
                     Read our terms & refund policy
                  </p>
               </div>
            </motion.div>
         </div>
      </section>
   );
};

export default Investment;
