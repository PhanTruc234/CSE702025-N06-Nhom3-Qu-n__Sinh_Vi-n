import { createContext, useContext, useState } from "react";

const CateContext = createContext();

export const CateProvider = ({ children }) => {
  const [categoryLength, setCategoryLength] = useState(0);

  return (
    <CateContext.Provider value={{ categoryLength, setCategoryLength }}>
      {children}
    </CateContext.Provider>
  );
};

export const useCateText = () => useContext(CateContext);
