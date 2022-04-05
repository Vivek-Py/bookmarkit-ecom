import { createContext, useContext, useEffect, useReducer } from "react";
import { getAllProducts } from "../../utils/databaseQuery";
import { reducer } from "./reducer";

const ProductContext = createContext({ products: [], productFilters: [] });

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    products: [],
    productFilters: [],
  });

  useEffect(() => {
    getAllProducts()
      .then((products) => dispatch({ type: "SET_PRODUCTS", payload: products }))
      .catch(dispatch({ type: "SET_PRODUCTS", payload: [] }));
  }, []);

  return (
    <ProductContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
