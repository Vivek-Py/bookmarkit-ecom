import { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useHeader } from "./headerContext";
import { WhishlistProvider } from "../Wishlist/wishlistContext";
import { useProducts } from "../Products/productContext";

import { APP_NAME, LOGIN, SEARCH_PLACEHOLDER } from "../../utils/constants";
import {
  getAllCartProducts,
  getAllWishlistProducts,
} from "../../utils/databaseQuery";

import "./index.css";
import { debounceFn } from "../../utils/helperFunction";
import { supabaseAuthId } from "../../utils/supabaseClient";

const Header = () => {
  const { items, cartItems, dispatch } = useHeader();
  const { dispatch: dispatchProducts } = useProducts();

  const ref = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, supabaseAuthId]);

  const handleSearch = (e) => {
    if (location.pathname !== "/products") {
      navigate("/products");
    }
    setTimeout(() => {
      dispatchProducts({
        type: "REQUEST_SEARCH_FILTER",
        payload: e.target.value,
      });
    }, 0);
  };

  const debouncedSearch = debounceFn(handleSearch, 500);

  return (
    <header className="navbar row">
      <Link to="/" className="nav-brand h2">
        {APP_NAME}
      </Link>
      <input
        type="text"
        className="input search"
        onChange={debouncedSearch}
        placeholder={SEARCH_PLACEHOLDER}
      />
      <div
        className="badge-wrapper hamburger-icon"
        onClick={() => {
          if (ref.current.classList[3] !== "active") {
            ref.current.classList.add("active");
          } else {
            ref.current.classList.remove("active");
          }
        }}
      >
        <i className="fas fa-solid fa-bars fa-2x icon"></i>
      </div>
      <div className="nav row justify-end active" ref={ref}>
        <Link className="nav-item" to="/login">
          <div className="badge-wrapper">
            <i className="fas fa-solid fa-user fa-2x icon"></i>
          </div>
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
