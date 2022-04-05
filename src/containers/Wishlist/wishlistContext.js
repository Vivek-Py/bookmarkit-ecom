import { createContext, useContext, useEffect, useReducer } from "react";
import { getAllWishlistProducts } from "../../utils/databaseQuery";
import { reducer } from "./reducer";

const WislistContext = createContext({ wishlist: [] });

export const WhishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    wishlist: [],
  });

  useEffect(() => {
    getAllWishlistProducts()
      .then((wishlist) => dispatch({ type: "SET_WISHLIST", payload: wishlist }))
      .catch(dispatch({ type: "SET_WISHLIST", payload: [] }));
  }, []);

  return (
    <WislistContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WislistContext.Provider>
  );
};

export const useWishlist = () => useContext(WislistContext);
