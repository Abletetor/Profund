import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaEye } from 'react-icons/fa';
import { AppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';

const fadeIn = {
   hidden: { opacity: 0, y: 30 },
   visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
         delay: i * 0.1,
         duration: 0.5,
         ease: 'easeOut'
      }
   }),
};

const MyProjects = () => {
   const { projects } = useContext(AppContext);

   return (
      <section className="p-6">
         <h2 className="text-2xl font-bold text-[#0F172A] mb-6">My Projects</h2>

         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0,6).map((project, i) => (
               <motion.div
                  key={project.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
               >
                  <img
                     src={project.image}
                     alt={project.title}
                     className="w-full h-40 object-cover"
                  />

                  <div className="p-4">
                     <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold text-[#0F172A]">{project.title}</h3>
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600">Active</span>
                     </div>

                     <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
                        <div
                           className="h-2 rounded-full bg-[#FACC15]"
                           style={{ width: `${project.funded}%` }}
                        />
                     </div>
                     <div className="text-sm text-gray-600 mb-3">{project.funded}% funded</div>

                     <div className="flex justify-between text-sm text-[#0F172A]">
                        <Link
                           to={`/projects/${project.id}`}
                           className="flex items-center gap-1 hover:text-blue-600"
                        >
                           <FaEye /> View
                        </Link>
                        <Link
                           to={`/creator/projects/edit/${project.id}`}
                           className="flex items-center gap-1 hover:text-yellow-500"
                        >
                           <FaEdit /> Edit
                        </Link>
                     </div>
                  </div>
               </motion.div>
            ))}
         </div>
      </section>
   );
};

export default MyProjects;
