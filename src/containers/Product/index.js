import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import If from "../../components/If";
import { useHeader } from "../Header/headerContext";
import { useWishlist } from "../Wishlist/wishlistContext";
import {
  addToCart,
  addToWishlist,
  findProduct,
  getAllCartProducts,
  getAllWishlistProducts,
} from "../../utils/databaseQuery";
import { supabaseAuthId } from "../../utils/supabaseClient";

import "./index.css";

const Product = () => {
  const params = useParams();
  const { dispatch } = useWishlist();
  const { dispatch: dispatchHeader } = useHeader();
  const navigate = useNavigate();

  const [product, setProduct] = useState([]);
  useEffect(() => {
    findProduct({ id: params.productId }).then(setProduct);
  }, [params.productId]);

  return (
    <If
      condition={product[0]}
      otherwise={
        <div className="not-found flex column">
          <img
            className="image-not-found"
            src="https://constant.myntassets.com/web/assets/img/11488523304066-search404.png"
            alt="Could not find product"
          />
          <h3 className="h3">Could not find the anything!</h3>
          <button
            className="primary-btn back-store"
            onClick={() => navigate("/")}
          >
            Take me to store!
          </button>
        </div>
      }
    >
      <div className="grid-2 product-page">
        <section className="img-container">
          <img
            className="responsive-img adjust-size"
            src={product[0]?.img}
            alt="hero-img"
          />
        </section>
        <section className="flex-start">
          <h2 className="h2">{product[0]?.brand}</h2>
          <h3 className="h3 product-sub-text">{product[0]?.brand_sub_text}</h3>
          <h1 className="h1">₹ {product[0]?.price}</h1>
          <div className="flex justify-start">
            <button
              className="primary-btn"
              onClick={async () => {
                await addToCart({
                  product_id: product[0].id,
                  user_id: supabaseAuthId,
                });
                getAllCartProducts()
                  .then((cart) => {
                    dispatch({ type: "SET_CART", payload: cart });
                    dispatchHeader({
                      type: "SET_CART_ITEMS",
                      payload: cart.length,
                    });
                  })
                  .catch(dispatch({ type: "SET_CART", payload: [] }));
              }}
            >
              Add to Cart
            </button>
            <button
              className="secondary-btn"
              onClick={async () => {
                await addToWishlist({
                  product_id: product[0].id,
                  user_id: supabaseAuthId,
                });
                getAllWishlistProducts().then((wishlist) => {
                  dispatchHeader({
                    type: "SET_ITEMS",
                    payload: wishlist.length,
                  });
                });
              }}
            >
              Wishlist
            </button>
          </div>
          <section className="details">
            <p className="fw-700">Product Details:</p> {product[0]?.detail}
          </section>

          <table className="table" cellSpacing="0">
            <tr>
              <td>
                <p className="fw-700">More Details:</p>
              </td>
            </tr>
            <tr className="bottom-border">
              <td className="fw-700">Sizes</td>
              <td>{product[0]?.meta?.size?.join(", ")}</td>
            </tr>
            <tr className="bottom-border">
              <td className="fw-700">Washable</td>
              <td>{product[0]?.meta?.washable.toString()}</td>
            </tr>
            <tr className="bottom-border">
              <td className="fw-700">Type</td>
              <td>{product[0]?.meta?.type}</td>
            </tr>
          </table>
        </section>
      </div>
    </If>
  );
};

export default Product;
