import { createContext } from "react";
import { projects } from "../assets/assets";

export const AppContext = createContext();

const AppContextProvider = (props) => {

   const currency = "GHS";

   const value = {
      projects, currency
   };
   return (
      <AppContext.Provider value={ value }>
         { props.children }
      </AppContext.Provider>
   );
};

export default AppContextProvider;