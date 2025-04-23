import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion } from "motion/react";
import { assets } from '../assets/assets';

const Navbar = () => {
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

   const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
   };

   const navLinks = [
      { name: 'Home', path: '/' },
      { name: 'Projects', path: '/projects' },
      { name: 'About', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Blog', path: '/blog' },
   ];

   return (
      <header className="sticky top-0 z-50 bg-[#0F172A]">
         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            {/* Logo */ }
            <Link to="/"
               onClick={ () => scrollTo(0, 0) }
               className="text-[#FACC15] text-2xl font-bold">
               <img src={ assets.logo } alt="logo" className='w-38' />
            </Link>

            {/* Desktop Nav */ }
            <nav className="hidden md:flex gap-8 items-center">
               { navLinks.map((link) => (
                  <NavLink
                     key={ link.name }
                     to={ link.path }
                     className={ ({ isActive }) =>
                        `text-white hover:text-[#FACC15] transition duration-200 font-medium ${isActive ? 'text-[#FACC15]' : ''
                        }`
                     }
                     onClick={ () => scrollTo(0, 0) }
                  >
                     { link.name }
                  </NavLink>
               )) }
               <Link
                  to="/login"
                  onClick={ () => scrollTo(0, 0) }
                  className="bg-[#FACC15] text-[#0F172A] font-semibold px-5 py-2 rounded-md hover:bg-yellow-400 transition"
               >
                  Get Started
               </Link>
            </nav>

            {/* Mobile Menu Button */ }
            <button
               onClick={ toggleMobileMenu }
               className="text-white text-2xl md:hidden z-50 relative"
               aria-label="Toggle Mobile Menu"
            >
               { isMobileMenuOpen ? <FaTimes /> : <FaBars /> }
            </button>

         </div>

         {/* Mobile Nav */ }
         {/* Overlay */ }
         { isMobileMenuOpen && (
            <div
               className="fixed inset-0 bg-transparent bg-opacity-40 z-30"
               onClick={ toggleMobileMenu }
            />
         ) }

         {/* Mobile Slide-in Menu */ }
         { isMobileMenuOpen && (
            <motion.div
               initial={ { x: '100%' } }
               animate={ { x: 0 } }
               exit={ { x: '100%' } }
               transition={ { duration: 0.3 } }
               className="fixed top-0 right-0 w-2/3 h-full bg-[#1E293B] p-6 z-40 md:hidden shadow-lg"
            >
               <ul className="flex flex-col gap-6 mt-16">
                  { navLinks.map((link) => (
                     <NavLink
                        key={ link.name }
                        to={ link.path }
                        onClick={ () => { setIsMobileMenuOpen(false); scrollTo(0, 0); } }
                        className={ ({ isActive }) =>
                           `block text-white hover:text-[#FACC15] text-lg font-medium transition ${isActive ? 'text-[#FACC15]' : ''
                           }`
                        }
                     >
                        { link.name }
                     </NavLink>
                  )) }
                  <Link
                     to="/login"
                     onClick={ () => { setIsMobileMenuOpen(false); scrollTo(0, 0); } }
                     className="block bg-[#FACC15] text-[#0F172A] text-center font-semibold py-2 rounded-md hover:bg-yellow-400 transition"
                  >
                     Get Started
                  </Link>
               </ul>
            </motion.div>
         ) }
      </header>
   );
};

export default Navbar;
