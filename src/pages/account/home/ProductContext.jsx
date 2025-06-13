import { createContext, useContext, useState } from "react";

const ProductContext = createContext();
export const ProductProvider = ({ children }) => {
  const [productLength, setProductLength] = useState(0);
  return (
    <ProductContext.Provider value={{ productLength, setProductLength }}>
      {children}
    </ProductContext.Provider>
  );
};
export const useProductText = () => useContext(ProductContext);
