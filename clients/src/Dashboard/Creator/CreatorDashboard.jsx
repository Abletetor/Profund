import React from 'react';
import { FaTachometerAlt, FaProjectDiagram, FaPlusCircle, FaUserCog, FaSignOutAlt } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';


const sidebarLinks = [
   { label: 'Quick Stats', icon: <FaTachometerAlt size={ 25 } className="text-[#FACC15]" />, to: '/creator/dashboard' },
   { label: 'My Projects', icon: <FaProjectDiagram size={ 25 } className="text-[#FACC15]" />, to: '/creator/projects' },
   { label: 'Add New Project', icon: <FaPlusCircle size={ 25 } className="text-[#FACC15]" />, to: '/creator/add-new' },
   { label: 'Profile', icon: <FaUserCog size={ 25 } className="text-[#FACC15]" />, to: '/creator/profile' },
];

const CreatorDashboard = () => {
   return (
      <div className="flex min-h-screen bg-gray-100">
         {/* Sidebar */ }
         <aside className="bg-[#0F172A] text-white w-16 md:w-64 transition-all duration-300 flex flex-col">
            <div className="p-4 text-center font-bold text-lg hidden md:block">
               Dashboard
            </div>
            <nav className="flex-1 flex flex-col space-y-2 mt-6 px-2">
               { sidebarLinks.map((link, idx) => (
                  <NavLink
                     key={ idx }
                     to={ link.to }
                     onClick={ () => scrollTo(0, 0) }
                     className={ ({ isActive }) => `flex items-center md:justify-start justify-center space-x-4 py-3 px-3 rounded ${isActive ? 'bg-[#1e293b] border-r-4 border-[#FACC15] font-semibold' : ''}` }
                  >
                     <span className="text-xl">{ link.icon }</span>
                     <span className="hidden md:inline">{ link.label }</span>
                  </NavLink>
               )) }
            </nav>
         </aside>

         {/* Main Content */ }
         <div className="flex-1 flex flex-col">
            {/* Navbar */ }
            {/* <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
               <h1 className="text-xl font-bold text-[#0F172A]">Creator Dashboard</h1>

               <div className="mb-4 px-2">
                  <button className="flex items-center md:justify-start justify-center text-red-400 hover:text-red-300 w-full px-3 py-2 rounded cursor-pointer">
                     <FaSignOutAlt className="text-lg" />
                     <span className="hidden md:inline ml-2">Logout</span>
                  </button>
               </div>
            </header> */}

            {/* Dynamic Content */ }
            <main className="p-6 flex-1">
               <Outlet />
            </main>
         </div>
      </div>
   );
};

export default CreatorDashboard;
