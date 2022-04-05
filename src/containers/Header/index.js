import { Link } from "react-router-dom";
import { useHeader } from "./headerContext";

import { WhishlistProvider } from "../Wishlist/wishlistContext";
import { APP_NAME, LOGIN, SEARCH_PLACEHOLDER } from "../../utils/constants";
import { useEffect } from "react";
import {
  getAllCartProducts,
  getAllWishlistProducts,
} from "../../utils/databaseQuery";

const Header = () => {
  const { items, cartItems, dispatch } = useHeader();
  useEffect(() => {
    getAllWishlistProducts().then((wishlist) => {
      dispatch({
        type: "SET_ITEMS",
        payload: wishlist.length,
      });
    });
    getAllCartProducts().then((cart) => {
      dispatch({
        type: "SET_CART_ITEMS",
        payload: cart.length,
      });
    });
  }, [dispatch]);
  return (
    <header className="navbar row">
      <Link to="/" className="nav-brand h2">
        {APP_NAME}
      </Link>
      <div className="nav row justify-end">
        <input type="text" className="input" placeholder={SEARCH_PLACEHOLDER} />
        <Link className="nav-item" to="/login">
          <button className="primary-btn">{LOGIN}</button>
        </Link>
        <Link className="nav-item" to="/wishlist">
          <div className="badge-wrapper">
            <i className="fas fa-solid fa-heart fa-2x icon">
              <div className="badge__icon--right">{items}</div>
            </i>
          </div>
        </Link>
        <Link className="nav-item" to="/cart">
          <div className="badge-wrapper">
            <i className="fas fa-solid fa-cart-arrow-down fa-2x icon">
              <div className="badge__icon--right">{cartItems}</div>
            </i>
          </div>
        </Link>
      </div>
    </header>
  );
};

const HeaderWithContext = () => (
  <WhishlistProvider>
    <Header />
  </WhishlistProvider>
);

export default HeaderWithContext;
