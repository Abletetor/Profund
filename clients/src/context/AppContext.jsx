import { createContext, useState } from "react";
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

   // **Get Dashboard Project**
   const getDashProject = async () => {
      try {
         const { data } = await axios.get(`${backendUrl}/api/user/my-projects`, {
            headers: { Authorization: `Bearer ${token}` }
         });

         data.success ? setDashProject(data.projects) : toast.error(data.message);

         console.log(data);
      } catch (error) {
         toast.error(error.response?.data?.message || "Something went wrong");
         console.error(error);
      }
   };

   const value = {
      projects, currency, backendUrl,
      token, setToken,
      userData, setUserData,
      dashProject, setDashProject, getDashProject
   };


   return (
      <AppContext.Provider value={ value }>
         { props.children }
      </AppContext.Provider>
   );
};

export default AppContextProvider;