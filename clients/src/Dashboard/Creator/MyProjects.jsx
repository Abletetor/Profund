import React, { useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaEye } from 'react-icons/fa';
import { AppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { calculateDaysLeft, fadeIn } from '../../helper/helper';


const MyProjects = () => {
   const { dashProject, token, getDashProject, currency } = useContext(AppContext);

   useEffect(() => {
      if (token) {
         getDashProject();
      }
   }, [token]);

   return (
      <section className="p-6 mb-20">
         <h2 className="text-2xl font-bold text-[#0F172A] mb-6">My Projects</h2>

         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            { dashProject.map((project, i) => {
               const daysLeft = calculateDaysLeft(project.createdAt, project.duration);
               const amountRaised = project.currentFunding || 0;
               const percentageFunded = project.goal ? Math.min((amountRaised / project.goal) * 100, 100).toFixed(0) : 0;

               return (
                  <motion.div
                     key={ project._id }
                     className="bg-white rounded-lg shadow-md overflow-hidden"
                     variants={ fadeIn }
                     initial="hidden"
                     whileInView="visible"
                     viewport={ { once: true } }
                     custom={ i }
                  >
                     <img
                        src={ project.thumbnail }
                        alt={ project.title }
                        className="w-full h-40 object-cover"
                     />

                     <div className="p-4">
                        <div className="flex justify-between items-center mb-2">
                           <h3 className="text-lg font-semibold text-[#0F172A]">{ project.title }</h3>
                           <div className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600">{ project.category }</div>
                        </div>

                        <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
                           <div
                              className="h-2 rounded-full bg-[#FACC15]"
                              style={ { width: `${percentageFunded}%` } }
                           />
                        </div>
                        <div className='flex justify-between'>

                           <div className="text-sm text-gray-600 mb-3">
                              { percentageFunded }% funded ({ currency } { amountRaised.toLocaleString() })
                           </div>
                           <span className="text-xs text-gray-500 mb-1">
                              { daysLeft } days left
                           </span>
                        </div>

                        <div className='md:flex justify-between mb-2 hidden'>
                           <div className='flex gap-1'>
                              <span className="text-xs text-blue-600">Goal: </span>
                              <span className="text-xs text-gray-600">
                                 { project.goal ? `${currency} ${project.goal.toLocaleString()}` : 'No goal set' }
                              </span>
                           </div>

                           <div className='flex gap-1'>
                              <span className="text-xs text-blue-600">Min Invest: </span>
                              <span className="text-xs text-gray-600">
                                 { project.minInvestment ? `${currency} ${project.minInvestment.toLocaleString()}` : 'No min investment' }
                              </span>
                           </div>
                        </div>
                        <div className="flex justify-between text-sm text-[#0F172A]">
                           <Link
                              to={ `/projects/${project._id}` }
                              className="flex items-center gap-1 hover:text-blue-600"
                           >
                              <FaEye /> View
                           </Link>
                           <Link
                              to={ `/creator/projects/edit/${project._id}` }
                              className="flex items-center gap-1 hover:text-yellow-500"
                           >
                              <FaEdit /> Edit
                           </Link>
                        </div>
                     </div>
                  </motion.div>
               );
            }) }
         </div>
      </section>
   );
};

export default MyProjects;
