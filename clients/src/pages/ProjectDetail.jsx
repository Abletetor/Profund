import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaUserCircle, FaTwitter, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';
import { BsTag } from 'react-icons/bs';
import RelatedProjects from '../components/RelatedProjects';


const ProjectDetail = () => {
   const { id } = useParams();
   const { projects, currency } = useContext(AppContext);
   const project = projects.find((p) => String(p.id) === id);

   if (!project) {
      return (
         <div className="min-h-[50vh] flex items-center justify-center text-xl text-gray-600">
            Project not found.
         </div>
      );
   }

   return (
      <motion.div
         initial={ { opacity: 0 } }
         animate={ { opacity: 1 } }
         exit={ { opacity: 0 } }
         transition={ { duration: 0.6 } }
         className="bg-white text-[#0F172A] py-10 px-6 md:px-20"
      >
         {/* Breadcrumb & Hero */ }
         <div className="mb-6">
            <Link
               to="/projects"
               className="text-sm text-blue-600 flex items-center gap-2 hover:underline"
            >
               <FaArrowLeft /> Back to Projects
            </Link>
         </div>

         <div className="grid lg:grid-cols-2 gap-8">
            <div>
               <img
                  src={ project.image }
                  alt={ project.title }
                  className="rounded-xl w-full h-80 object-cover shadow-md"
               />
            </div>

            <div className="space-y-4">
               <h1 className="text-3xl font-bold">{ project.title }</h1>
               <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">By { project.creator }</span>
                  <span className="flex items-center gap-1 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                     <BsTag /> { project.category }
                  </span>
               </div>

               <p className="text-gray-700 leading-relaxed">
                  { project.overview }
               </p>

               {/* Funding Stats */ }
               <div>
                  <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden mb-2">
                     <motion.div
                        initial={ { width: 0 } }
                        animate={ { width: `${project.funded}%` } }
                        transition={ { duration: 1 } }
                        className="h-3 bg-[#FACC15] rounded-full"
                     />
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                     <span>Raised: { currency } { project.raised.toLocaleString() }</span>
                     <span>Goal: { currency } { project.goal.toLocaleString() }</span>
                     <span>{ project.funded }% Funded</span>
                     <span>{ project.daysLeft } Days Left</span>
                  </div>
               </div>

               {/* CTA */ }
               <Link
                  to={ `/invest/${project.id}` }
                  className="inline-block mt-4 bg-[#FACC15] text-[#0F172A] font-semibold px-6 py-3 rounded hover:bg-yellow-400 transition"
               >
                  Invest Now
               </Link>
            </div>
         </div>

         {/* Creator Section */ }
         <div className="mt-16 border-t pt-10 border-gray-400">
            <h3 className="text-2xl font-semibold mb-4">About the Creator</h3>
            <div className="flex items-center gap-6">
               <FaUserCircle className="text-6xl text-gray-400" />
               <div>
                  <p className="text-lg font-semibold">{ project.creator }</p>
                  <p className="text-sm text-gray-600">
                     { project.bio }
                  </p>
                  <div className="flex gap-4 mt-2 text-blue-600">
                     <a href="#" className="hover:text-yellow-400"><FaTwitter size={ 20 } /></a>
                     <a href="#" className="hover:text-yellow-400"><FaLinkedin size={ 20 } /></a>
                     <a href="#" className="hover:text-yellow-400"><FaInstagram size={ 20 } /></a>
                     <a href="#" className="hover:text-yellow-400"><FaFacebook size={ 20 } /></a>
                  </div>
               </div>
            </div>
         </div>
         <RelatedProjects currentProject={ project } />
      </motion.div>
   );
};

export default ProjectDetail;
