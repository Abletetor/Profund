import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { FaRegSmileBeam } from 'react-icons/fa';
import { AppContext } from '../../context/AppContext';

const CreatorWelcome = () => {
   const { projectData } = useContext(AppContext);

   return (
      <motion.div
         initial={ { opacity: 0, y: 30 } }
         animate={ { opacity: 1, y: 0 } }
         transition={ { duration: 0.5 } }
         className="bg-white rounded-xl shadow-md p-6 md:p-10"
      >
         <div className="flex items-center mb-4">
            <FaRegSmileBeam className="text-yellow-400 text-3xl mr-3" />
            <h2 className="text-2xl font-bold text-[#0F172A]">
               Welcome { projectData?.creator?.fullName || 'Creator' }
            </h2>
         </div>
         <p className="text-gray-700 leading-relaxed text-[16px] md:text-[17px]">
            Welcome! This is your Profund dashboard — the place to create projects, track your funding, and connect with supporters. Every project you launch brings real change. Let’s get started!
         </p>
      </motion.div>
   );
};

export default CreatorWelcome;
