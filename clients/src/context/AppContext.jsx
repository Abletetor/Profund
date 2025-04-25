import { createContext, useState } from "react";
import { projects } from "../assets/assets";

export const AppContext = createContext();

const AppContextProvider = (props) => {
   const currency = "GHS";
   const backendUrl = import.meta.env.VITE_BACKEND_URL;

   const [token, setToken] = useState(localStorage.getItem("token") || null);
   const [userData, setUserData] = useState(false);

   const value = {
      projects, currency, backendUrl,
      token, setToken,
      userData, setUserData,
   };


   return (
      <AppContext.Provider value={ value }>
         { props.children }
      </AppContext.Provider>
   );
};

export default AppContextProvider;