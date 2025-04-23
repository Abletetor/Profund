import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const fadeInUp = {
   hidden: { opacity: 0, y: 40 },
   visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 },
   }),
};

const FeaturedProjects = () => {
   const { projects, currency } = useContext(AppContext);
   return (
      <section className="bg-white py-20 px-6 md:px-12 lg:px-24">
         <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">Featured Projects</h2>
            <p className="text-gray-600 mt-2">Discover ideas making waves across Ghana and beyond.</p>
         </div>

         <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            { projects.slice(0, 6).map((project, i) => (
               <motion.div
                  key={ project.id }
                  variants={ fadeInUp }
                  initial="hidden"
                  whileInView="visible"
                  viewport={ { once: true } }
                  custom={ i }
                  className="bg-[#F8FAFC] rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
               >
                  <img src={ project.image } alt={ project.title } className="w-full h-38 object-cover" />

                  <div className="p-5">
                     <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold text-[#0F172A]">{ project.title }</h3>
                        <span className="bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full">
                           { project.category }
                        </span>
                     </div>
                     <p className="text-sm text-gray-500 mb-2">By { project.creator }</p>

                     {/* Progress Bar */ }
                     <div className="w-full bg-gray-200 h-3 rounded-full mb-2">
                        <div
                           className="h-3 rounded-full bg-[#FACC15]"
                           style={ { width: `${project.funded}%` } }
                        />
                     </div>
                     <div className="text-sm text-gray-600 mb-2 flex justify-between">
                        <span>{ project.funded }% funded</span>
                        <span>{ project.daysLeft } days left</span>
                     </div>

                     {/* Funding Details */ }
                     <div className="text-xs text-gray-500 mb-4">
                        Raised: { currency } { project.raised.toLocaleString() } of { currency } { project.goal.toLocaleString() }
                     </div>

                     <Link
                        to={ `/projects/${project.id}` }
                        onClick={ () => scrollTo(0, 0) }
                        className="inline-block text-sm font-medium text-white bg-[#0F172A] px-4 py-2 rounded hover:bg-[#1e293b] transition"
                     >
                        View Project
                     </Link>
                  </div>
               </motion.div>
            )) }
         </div>

         {/* View All Projects CTA */ }
         <div className="text-center mt-14">
            <Link
               to="/projects"
               onClick={ () => scrollTo(0, 0) }
               className="inline-block text-[#0F172A] font-semibold border border-[#0F172A] px-6 py-3 rounded hover:bg-[#0F172A] hover:text-white transition"
            >
               View All Projects
            </Link>
         </div>
      </section>
   );
};

export default FeaturedProjects;
