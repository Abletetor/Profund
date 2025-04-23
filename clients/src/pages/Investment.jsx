import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { FaMoneyBillWave, FaLock, FaUsers, FaRocket } from 'react-icons/fa';

const Investment = () => {
   const { id } = useParams();
   const { projects, currency } = useContext(AppContext);
   const project = projects.find((p) => p.id === parseInt(id));
   const [amount, setAmount] = useState('');
   const [paymentMethod, setPaymentMethod] = useState('');

   if (!project) {
      return <div className="text-center py-20">Project not found</div>;
   }

   const handleInvest = () => {
      console.log('Investing:', amount, paymentMethod);
      alert('Investment submitted!');
   };

   return (
      <section className="bg-white min-h-screen py-12 px-4 sm:px-8 lg:px-24">
         {/* 1. Project Summary Header */ }
         <motion.div
            initial={ { opacity: 0, y: 30 } }
            animate={ { opacity: 1, y: 0 } }
            transition={ { duration: 0.5 } }
            className="mb-12"
         >
            <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-3">{ project.title }</h1>
            <div className="text-sm text-gray-600 flex flex-wrap gap-2 items-center">
               <span>By { project.creator }</span>
               <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs">{ project.category }</span>
            </div>
            <img
               src={ project.image }
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

               <div className="flex gap-4 mb-4">
                  { [100, 200, 500].map((value) => (
                     <button
                        key={ value }
                        onClick={ () => setAmount(value) }
                        className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 text-sm"
                     >
                        ₵{ value }
                     </button>
                  )) }
               </div>

               <input
                  type="number"
                  placeholder="Enter amount (₵)"
                  value={ amount }
                  onChange={ (e) => setAmount(e.target.value) }
                  className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
               />

               <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Payment Method</label>
                  <select
                     value={ paymentMethod }
                     onChange={ (e) => setPaymentMethod(e.target.value) }
                     className="w-full px-4 py-2 border border-gray-300 rounded"
                  >
                     <option value="">Select Method</option>
                     <option value="card">Card</option>
                     <option value="mobile">Mobile Money</option>
                     <option value="crypto">Crypto</option>
                  </select>
               </div>

               <button
                  onClick={ handleInvest }
                  className="w-full bg-[#FACC15] text-black py-2 rounded font-semibold hover:bg-yellow-400 transition"
               >
                  Invest Now
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
                        style={ { width: `${project.funded}%` } }
                     />
                  </div>
                  <div className="flex flex-wrap justify-between text-sm text-gray-600">
                     <span>{ currency } { project.raised.toLocaleString() } raised</span>
                     <span>Goal: { currency } { project.goal.toLocaleString() }</span>
                     <span>{ project.funded }% funded</span>
                     <span>{ project.daysLeft } days left</span>
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
                     <FaUsers className="text-gray-400" /> <strong>218 investors</strong> so far
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
