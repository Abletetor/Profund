import { createContext, useEffect, useState } from "react";
import { projects } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = (props) => {
   const currency = "GHS";
   const backendUrl = import.meta.env.VITE_BACKEND_URL;

   const [token, setToken] = useState(localStorage.getItem("token") || null);
   const [userData, setUserData] = useState(false);
   const [dashProject, setDashProject] = useState([]);
   const [dashStats, setDashStats] = useState(null);

   // **Get Dashbord Stats for Creator**
   const getCreatorDashboardStats = async () => {
      try {

         const { data } = await axios.get(`${backendUrl}/api/user/creator/dashboard`, {
            headers: { Authorization: `Bearer ${token}` }
         });

         if (data.success) {
            setDashStats(data.dashStats);
         } else {
            toast.error(data.message);
         }

      } catch (error) {
         toast.error(error.response?.data?.message || "Something went wrong");
         console.error(error);
      }
   };
   // **Get Dashboard Project**
   const getDashProject = async () => {
      try {
         const { data } = await axios.get(`${backendUrl}/api/user/my-projects`, {
            headers: { Authorization: `Bearer ${token}` }
         });

         data.success ? setDashProject(data.projects) : toast.error(data.message);

      } catch (error) {
         toast.error(error.response?.data?.message || "Something went wrong");
         console.error(error);
      }
   };

   // **Get User Profile**
   const getUserProfile = async () => {
      try {
         const { data } = await axios.get(`${backendUrl}/api/user/profile`, {
            headers: { Authorization: `Bearer ${token}` }
         });

         if (data.success) {
            setUserData(data.userData);
         } else {
            toast.error(data.message);
         }

      } catch (error) {
         toast.error(error.response?.data?.message || "Something went wrong");
         console.error(error);
      }
   };

   useEffect(() => {
      if (token) {
         getUserProfile();
      }
   }, [token]);

   const value = {
      projects, currency, backendUrl,
      token, setToken,
      userData, setUserData, getUserProfile,
      dashProject, setDashProject, getDashProject,
      getCreatorDashboardStats, dashStats, setDashStats,
   };


   return (
      <AppContext.Provider value={ value }>
         { props.children }
      </AppContext.Provider>
   );
};

export default AppContextProvider;