import { useRef } from "react";
import { useWishlist, WhishlistProvider } from "./wishlistContext";
import { useHeader } from "../Header/headerContext";

import {
  addToCart,
  getAllCartProducts,
  getAllWishlistProducts,
  removeFromWishlist,
} from "../../utils/databaseQuery";
import { supabaseAuthId } from "../../utils/supabaseClient";

const Wishlist = () => {
  const { wishlist, dispatch } = useWishlist();
  const { dispatch: headerDispatch } = useHeader();

  const productsRef = useRef([]);
  return (
    <>
      <h3 class="h3">My Wishlist</h3>
      <section className="section grid-auto">
        {wishlist.map((item, itr) => {
          return (
            <div
              key={itr}
              className="card-wrapper vertical no-padding"
              ref={(ele) => (productsRef.current[itr] = ele)}
              onMouseEnter={() => {
                const className = productsRef.current[itr].className;
                productsRef.current[itr].className = `${className} opacity-low`;
                productsRef.current[itr].children[0].style.display = "block";
              }}
              onMouseLeave={() => {
                const className = productsRef.current[itr].className;
                productsRef.current[itr].className = `${className.replace(
                  "opacity-low",
                  ""
                )}`;
                productsRef.current[itr].children[0].style.display = "none";
              }}
            >
              <button
                id="no-opacity"
                className="secondary-btn"
                onClick={async () => {
                  await addToCart({
                    product_id: item.products.id,
                    user_id: supabaseAuthId,
                  });
                  await removeFromWishlist({ id: item?.id });
                  getAllWishlistProducts()
                    .then((wishlist) => {
                      dispatch({ type: "SET_WISHLIST", payload: wishlist });
                      headerDispatch({
                        type: "SET_ITEMS",
                        payload: wishlist.length,
                      });
                    })
                    .catch(dispatch({ type: "SET_WISHLIST", payload: [] }));
                  getAllCartProducts()
                    .then((cart) => {
                      dispatch({ type: "SET_CART", payload: cart });
                      headerDispatch({
                        type: "SET_CART_ITEMS",
                        payload: cart.length,
                      });
                    })
                    .catch(dispatch({ type: "SET_CART", payload: [] }));
                }}
              >
                Move to cart
              </button>
              <button
                class="card-dismiss-btn"
                onClick={async () => {
                  await removeFromWishlist({ id: item?.id });
                  getAllWishlistProducts()
                    .then((wishlist) => {
                      dispatch({ type: "SET_WISHLIST", payload: wishlist });
                      headerDispatch({
                        type: "SET_ITEMS",
                        payload: wishlist.length,
                      });
                    })
                    .catch(dispatch({ type: "SET_WISHLIST", payload: [] }));
                }}
              >
                X
              </button>
              <img
                className="card-img responsive-img hero-img"
                loading="lazy"
                src={item?.products.img}
                alt="Sample Avatar"
              />
              <section className="flex column flex-start">
                <p className="text-md">{item?.products?.brand}</p>
                <p className="text-sm sub-text">
                  {item?.products?.brand_sub_text}
                </p>
                <div className="grid-3 pricing">
                  <h4 className="h4">₹{item?.products?.price}</h4>
                  <p className="text-sm price-cut sub-text">
                    ₹{item?.products?.price + item?.products?.price}
                  </p>
                  <p className="text-sm discount">(50%)</p>
                </div>
              </section>
            </div>
          );
        })}
      </section>
    </>
  );
};

const WishlistProducts = () => (
  <WhishlistProvider>
    <Wishlist />
  </WhishlistProvider>
);

export default WishlistProducts;
