import React from 'react';
import { motion } from 'framer-motion';
import { FaRegSmileBeam } from 'react-icons/fa';

const CreatorWelcome = () => {
   return (
      <motion.div
         initial={ { opacity: 0, y: 30 } }
         animate={ { opacity: 1, y: 0 } }
         transition={ { duration: 0.5 } }
         className="bg-white rounded-xl shadow-md p-6 md:p-10"
      >
         <div className="flex items-center mb-4">
            <FaRegSmileBeam className="text-yellow-400 text-3xl mr-3" />
            <h2 className="text-2xl font-bold text-[#0F172A]">Welcome back, Kwame!</h2>
         </div>
         <p className="text-gray-700 leading-relaxed text-[16px] md:text-[17px]">
            We’re thrilled to see you back on Profund. Your contributions are powering real change, and every project you launch brings us one step closer to a better tomorrow. Use this dashboard to manage your campaigns, track funding progress, and keep your supporters
            updated. Let’s keep building a brighter future together!
         </p>
      </motion.div>
   );
};

export default CreatorWelcome;
