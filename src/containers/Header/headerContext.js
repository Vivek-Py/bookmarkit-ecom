import { createContext, useContext, useReducer } from "react";
import { reducer } from "./reducer";

const HeaderContext = createContext({ items: 0 });

export const HeaderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    items: 0,
    cartItems: 0,
    user: null,
  });

  return (
    <HeaderContext.Provider value={{ ...state, dispatch }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => useContext(HeaderContext);
