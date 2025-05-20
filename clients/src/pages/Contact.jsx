import React from 'react';
import { motion } from 'motion/react';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const Contact = () => {
   return (
      <section className="min-h-screen bg-gray-50 py-16 px-6 lg:px-24">
         <div className="max-w-6xl mx-auto">
            {/* Header */ }
            <div className="text-center mb-12">
               <h2 className="text-4xl font-bold text-[#0F172A] mb-2">Let’s Talk 👋</h2>
               <p className="text-gray-600 text-lg">
                  Have a question, feedback, or partnership idea? We’d love to hear from you.
               </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
               {/* Contact Form */ }
               <motion.form
                  initial={ { opacity: 0, y: 30 } }
                  whileInView={ { opacity: 1, y: 0 } }
                  transition={ { duration: 0.5 } }
                  className="bg-white p-8 rounded-lg shadow-md space-y-6"
               >
                  <div>
                     <label className="block text-gray-700 font-medium mb-1">Full Name</label>
                     <input
                        type="text"
                        placeholder="Enter your name"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                     />
                  </div>

                  <div>
                     <label className="block text-gray-700 font-medium mb-1">Email Address</label>
                     <input
                        type="email"
                        placeholder="you@example.com"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                     />
                  </div>

                  <div>
                     <label className="block text-gray-700 font-medium mb-1">Subject</label>
                     <input
                        type="text"
                        placeholder="Message subject"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                     />
                  </div>

                  <div>
                     <label className="block text-gray-700 font-medium mb-1">Message</label>
                     <textarea
                        rows="5"
                        placeholder="Type your message here..."
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                     />
                  </div>

                  <button
                     type="submit"
                     className="bg-[#FACC15] text-[#0F172A] font-semibold px-6 py-3 rounded-md hover:bg-yellow-400 transition"
                  >
                     Send Message
                  </button>
               </motion.form>

               {/* Contact Info */ }
               <motion.div
                  initial={ { opacity: 0, y: 30 } }
                  whileInView={ { opacity: 1, y: 0 } }
                  transition={ { delay: 0.2, duration: 0.5 } }
                  className="space-y-6"
               >
                  <div className="flex items-start space-x-4">
                     <FaMapMarkerAlt className="text-[#0F172A] mt-1" size={ 20 } />
                     <div>
                        <h4 className="font-semibold text-[#0F172A]">Our Office</h4>
                        <p className="text-gray-600">123 Fund Street, Koforidua, Ghana</p>
                     </div>
                  </div>

                  <div className="flex items-start space-x-4">
                     <FaEnvelope className="text-[#0F172A] mt-1" size={ 20 } />
                     <div>
                        <h4 className="font-semibold text-[#0F172A]">Email Us</h4>
                        <p className="text-gray-600">support@klyntfund.io</p>
                     </div>
                  </div>

                  <div className="flex items-start space-x-4">
                     <FaPhoneAlt className="text-[#0F172A] mt-1" size={ 20 } />
                     <div>
                        <h4 className="font-semibold text-[#0F172A]">Call Us</h4>
                        <p className="text-gray-600">+233 555 123 456</p>
                     </div>
                  </div>
               </motion.div>
            </div>
         </div>
      </section>
   );
};

export default Contact;
