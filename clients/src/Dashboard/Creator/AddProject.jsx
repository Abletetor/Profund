import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUpload } from 'react-icons/fa';

const AddProject = () => {
   const [formData, setFormData] = useState({
      title: '',
      category: '',
      thumbnail: '',
      pitch: '',
      location: '',
      overview: '',
      problemSolution: '',
      goal: '',
      duration: '',
      minInvestment: '',
      impact: '',
      creator: 'Kwame Mensah',
      bio: 'Kwame is a renewable energy advocate with 7+ years of experience designing sustainable solutions for rural Africa.'
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Submitting:', formData);
   };

   return (
      <motion.section
         initial={ { opacity: 0, y: 30 } }
         animate={ { opacity: 1, y: 0 } }
         className="max-w-5xl mx-auto bg-white shadow-md p-8 rounded-md mt-10 mb-20"
      >
         <h2 className="text-2xl font-bold mb-6 text-[#0F172A]">Create a New Project</h2>

         <form onSubmit={ handleSubmit } className="space-y-8">
            {/* Basic Info */ }
            <div>
               <h3 className="text-lg font-semibold mb-3">Basic Info</h3>
               <div className="grid md:grid-cols-2 gap-4">
                  <input type="text" name="title" placeholder="Project Title" onChange={ handleChange } className="input" />
                  <input type="text" name="category" placeholder="Category" onChange={ handleChange } className="input" />
                  <div className="col-span-2">
                     <label className="block mb-1 font-medium">Project Thumbnail</label>
                     <div className="flex items-center space-x-4">
                        <label className="flex items-center cursor-pointer bg-gray-100 border border-dashed border-gray-400 px-4 py-2 rounded hover:bg-gray-200 transition">
                           <FaUpload className="mr-2 text-[#FACC15]" />
                           <span>Upload Image</span>
                           <input
                              type="file"
                              accept="image/*"
                              name="thumbnail"
                              onChange={ (e) => {
                                 const file = e.target.files[0];
                                 if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                       setFormData((prev) => ({ ...prev, thumbnail: reader.result }));
                                    };
                                    reader.readAsDataURL(file);
                                 }
                              } }
                              className="hidden"
                           />
                        </label>
                        { formData.thumbnail && (
                           <img
                              src={ formData.thumbnail }
                              alt="Thumbnail Preview"
                              className="h-16 w-16 object-cover rounded border"
                           />
                        ) }
                     </div>
                  </div>

                  <input type="text" name="pitch" placeholder="Short Message" onChange={ handleChange } className="input" />
                  <input type="text" name="location" placeholder="Location" onChange={ handleChange } className="input" />
               </div>
            </div>

            {/* Details */ }
            <div>
               <h3 className="text-lg font-semibold mb-3">Details</h3>
               <textarea name="overview" placeholder="Project Overview" onChange={ handleChange } className="input h-24" />
               <textarea name="problemSolution" placeholder="Problem & Proposed Solution" onChange={ handleChange } className="input h-24 mt-4" />
            </div>

            {/* Funding */ }
            <div>
               <h3 className="text-lg font-semibold mb-3">Funding</h3>
               <div className="grid md:grid-cols-3 gap-4">
                  <input type="number" name="goal" placeholder="Funding Goal (₵)" onChange={ handleChange } className="input" />
                  <input type="number" name="duration" placeholder="Duration (days)" onChange={ handleChange } className="input" />
                  <input type="number" name="minInvestment" placeholder="Min. Investment (₵)" onChange={ handleChange } className="input" />
               </div>
            </div>

            {/* Impact */ }
            <div>
               <h3 className="text-lg font-semibold mb-3">Impact Statement</h3>
               <textarea name="impact" placeholder="Describe expected impact..." onChange={ handleChange } className="input h-24" />
            </div>

            {/* Profile */ }
            <div>
               <h3 className="text-lg font-semibold mb-3">Profile</h3>
               <input type="text" name="creator" value={ formData.creator } onChange={ handleChange } className="input mb-3" />
               <textarea name="bio" value={ formData.bio } onChange={ handleChange } className="input h-20" />
            </div>

            {/* Submit */ }
            <div className="text-right">
               <button
                  type="submit"
                  className="bg-[#FACC15] text-[#0F172A] font-semibold px-6 py-2 rounded hover:bg-yellow-400 transition"
               >
                  Submit Project
               </button>
            </div>
         </form>
      </motion.section>
   );
};

export default AddProject;
