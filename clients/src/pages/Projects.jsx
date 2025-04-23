import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const fadeIn = {
   hidden: { opacity: 0, y: 40 },
   visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
   }),
};

const Projects = () => {
   const { projects, currency } = useContext(AppContext);
   const [activeCategory, setActiveCategory] = useState('All');

   const allCategories = ['All', ...new Set(projects.map(p => p.category))];

   const filteredProjects = activeCategory === 'All'
      ? projects
      : projects.filter(p => p.category === activeCategory);

   return (
      <section className="bg-white min-h-screen py-16 px-6 md:px-12 lg:px-24">
         <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">All Projects</h2>
            <p className="text-gray-600 mt-2 max-w-xl mx-auto">
               Browse through all ongoing and trending innovations on Profund.
            </p>
         </div>

         {/* Filter Buttons */ }
         <div className="flex flex-wrap justify-center gap-3 mb-10">
            { allCategories.map((cat, idx) => (
               <button
                  key={ idx }
                  onClick={ () => setActiveCategory(cat) }
                  className={ `text-sm px-4 py-2 rounded-full border transition ${activeCategory === cat
                     ? 'bg-[#0F172A] text-white'
                     : 'bg-gray-100 text-[#0F172A] hover:bg-[#E2E8F0]'
                     }` }
               >
                  { cat }
               </button>
            )) }
         </div>

         {/* Project Cards */ }
         <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            { filteredProjects.map((project, i) => (
               <motion.div
                  key={ project.id }
                  variants={ fadeIn }
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
      </section>
   );
};

export default Projects;
