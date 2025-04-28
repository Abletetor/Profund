import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { motion } from 'framer-motion';
import { FaProjectDiagram, FaMoneyBillWave, FaBolt } from 'react-icons/fa';
import { cardVariants, formatCurrencyAmount } from '../../helper/helper';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ShimmerLoader from '../../components/ShimmerLoder';


const QuickStats = () => {
   const navigate = useNavigate();
   const { getCreatorDashboardStats, dashStats, token, currency } = useContext(AppContext);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      if (!token) {
         toast.warn("Please log in to access your dashboard.");
         navigate('/login', { replace: true });
         window.scrollTo(0, 0);
         return;
      }
      setLoading(true);
      getCreatorDashboardStats().finally(() => setLoading(false));
   }, [token, navigate]);


   // Loading state
   if (loading || !dashStats) {
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

   const stats = [
      {
         label: 'Total Projects',
         value: dashStats.totalProjects,
         icon: <FaProjectDiagram className="text-2xl text-blue-600" />,
         color: 'bg-blue-50',
      },
      {
         label: 'Total Raised',
         value: formatCurrencyAmount(dashStats.totalRaised, currency),
         icon: <FaMoneyBillWave className="text-2xl text-green-600" />,
         color: 'bg-green-50',
      },
      {
         label: 'Active Campaigns',
         value: dashStats.activeCampaigns,
         icon: <FaBolt className="text-2xl text-yellow-500" />,
         color: 'bg-yellow-50',
      },
   ];

   return (
      <div className="grid md:grid-cols-3 gap-6 mt-8">
         { stats.map((stat, i) => (
            <motion.div
               key={ stat.label }
               variants={ cardVariants }
               initial="hidden"
               animate="visible"
               custom={ i }
               className={ `p-5 rounded-lg shadow-md flex items-center space-x-4 ${stat.color}` }
            >
               <div className="bg-white p-3 rounded-full shadow">{ stat.icon }</div>
               <div>
                  <p className="text-gray-600 text-sm">{ stat.label }</p>
                  <h3 className="text-xl font-bold text-[#0F172A]">{ stat.value }</h3>
               </div>
            </motion.div>
         )) }
      </div>
   );
};

export default QuickStats;
