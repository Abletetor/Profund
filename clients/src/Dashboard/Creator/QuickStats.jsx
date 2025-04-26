import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { motion } from 'framer-motion';
import { FaProjectDiagram, FaMoneyBillWave, FaBolt } from 'react-icons/fa';

const cardVariants = {
   hidden: { opacity: 0, y: 20 },
   visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 },
   }),
};

const QuickStats = () => {
   const { dashProject, currency } = useContext(AppContext);

   const totalProjects = dashProject.length;
   const totalRaised = dashProject.reduce((sum, proj) => sum + proj.currentFunding, 0);
   const activeCampaigns = dashProject.filter((p) => p.daysLeft > 0).length;

   const stats = [
      {
         label: 'Total Projects',
         value: totalProjects,
         icon: <FaProjectDiagram className="text-2xl text-blue-600" />,
         color: 'bg-blue-50',
      },
      {
         label: 'Total Raised',
         value: `${currency} ${totalRaised.toLocaleString()}`,
         icon: <FaMoneyBillWave className="text-2xl text-green-600" />,
         color: 'bg-green-50',
      },
      {
         label: 'Active Campaigns',
         value: activeCampaigns,
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
