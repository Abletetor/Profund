import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaUserCircle, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { BsTag } from 'react-icons/bs';
import RelatedProjects from '../components/RelatedProjects';
import { formatCurrencyAmount } from '../helper/helper';
import ShimmerLoader from '../components/ShimmerLoder';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProjectDetail = () => {
   const { id } = useParams();
   const { backendUrl, currency, token } = useContext(AppContext);
   const navigate = useNavigate();

   const [project, setProject] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      if (!token) {
         toast.warn("Please login to view project details");
         navigate('/login');
         return;
      }

      const fetchProject = async () => {
         try {
            const { data } = await axios.get(`${backendUrl}/api/user/projects/${id}`, {
               headers: { Authorization: `Bearer ${token}` }
            });
            if (data.success) {
               setProject(data.project);
            } else {
               toast.error(data.message);
            }
         } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
            console.error(error);
         } finally {
            setLoading(false);
         }
      };

      fetchProject();
   }, [id, backendUrl, token]);

   if (loading || !project) {
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
                  src={ project.thumbnail }
                  alt={ project.title }
                  className="rounded-xl w-full h-80 object-cover shadow-md"
               />
            </div>

            <div className="space-y-4">
               <h1 className="text-3xl font-bold">{ project.title }</h1>
               <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">By { project.creator?.fullName }</span>
                  <span className="flex items-center gap-1 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                     <BsTag /> { project.category }
                  </span>
               </div>

               <p className="text-gray-700 leading-relaxed">
                  { project.overview }
               </p>

               {/* Funding Stats */ }
               <div>
                  {/* Progress Bar */ }
                  <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden mb-2">
                     <motion.div
                        initial={ { width: 0 } }
                        animate={ { width: `${project.percentageFunded}%` } }
                        transition={ { duration: 1 } }
                        className="h-3 bg-[#FACC15] rounded-full"
                     />
                  </div>

                  {/* Stats - Responsive Layout */ }
                  <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-2 text-sm text-gray-600">
                     <span className="w-full sm:w-auto">Raised: { formatCurrencyAmount(project.amountRaised) }</span>
                     <span className="w-full sm:w-auto">
                        Goal: { project.goal ? formatCurrencyAmount(project.goal, currency) : 'No goal set' }
                     </span>
                     <span className="w-full sm:w-auto">{ project.percentageFunded }% Funded</span>
                     <span className="w-full sm:w-auto">{ project.daysLeft } Days Left</span>
                  </div>

                  <div>
                     <span className="text-xs text-blue-600">Min Invest: </span>
                     <span className="text-xs text-gray-600">
                        { project.minInvestment ? formatCurrencyAmount(project.minInvestment, currency) : 'No min investment' }
                     </span>
                  </div>
               </div>

               {/* CTA */ }
               <Link
                  to={ `/invest/${project._id}` }
                  onClick={ () => scrollTo(0, 0) }
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
               { project.creator?.imageUrl ?
                  <img
                     src={ project.creator?.imageUrl }
                     alt="Profile"
                     className="mt-3 h-15 w-15 object-cover rounded-full"
                  /> :
                  <FaUserCircle className="text-6xl text-gray-400" />

               }
               <div>
                  <p className="text-lg font-semibold">{ project.creator?.fullName }</p>
                  <p className="text-sm text-gray-600">
                     { project.creator?.bio }
                  </p>
                  <div className="flex gap-4 mt-2 text-blue-600">
                     <a
                        href={ project.creator?.linkedin } className="hover:text-yellow-400"
                        target='_blank'>
                        <FaTwitter size={ 20 } />
                     </a>
                     <a
                        href={ project.creator?.twitter }
                        className="hover:text-yellow-400"
                        target='_blank'>
                        <FaLinkedin size={ 20 } />
                     </a>
                  </div>
               </div>
            </div>
         </div>

         <RelatedProjects currentProject={ project } />
      </motion.div>
   );
};

export default ProjectDetail;
