import { createContext, useContext, useEffect, useReducer } from "react";
import { getAllCartProducts } from "../../utils/databaseQuery";
import { reducer } from "./reducer";

const CartContext = createContext({ cart: [] });

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    cart: [],
  });

  useEffect(() => {
    getAllCartProducts()
      .then((cart) => dispatch({ type: "SET_CART", payload: cart }))
      .catch(dispatch({ type: "SET_CART", payload: [] }));
  }, []);

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
