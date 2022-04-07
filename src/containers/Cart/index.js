import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import If from "../../components/If";
import { CartProvider, useCart } from "./cartContext";
import { useHeader } from "../Header/headerContext";
import { getAllCartProducts, removeFromCart } from "../../utils/databaseQuery";

import "./index.css";
import Error from "../../components/Error";

const Cart = () => {
  const { cart, dispatch } = useCart();
  const { dispatch: headerDispatch } = useHeader();

  const navigate = useNavigate();
  const productsRef = useRef([]);
  return (
    <If condition={cart[0]} otherwise={<Error />}>
      <h3 className="h3">My Cart</h3>
      <div className="grid-2 main-section cart">
        <div className="flex column item-container">
          <div className="item-total-details">
            <section className="flex column total-item-text fw-700">
              Total Items: {cart.length}
            </section>
            <section>
              {cart.map((item, itr) => {
                return (
                  <>
                    <div className="grid-3">
                      <span>{item?.products?.brand}</span>
                      <span>x1</span>
                      <span>₹ {item?.products?.price}</span>
                    </div>
                  </>
                );
              })}
            </section>
          </div>
          <button className="secondary-btn cart-pay-btn">Pay Now</button>
        </div>
        <section className="section grid-auto">
          {cart.map((item, itr) => {
            return (
              <div
                key={itr}
                className="card-wrapper vertical no-padding"
                ref={(ele) => (productsRef.current[itr] = ele)}
                onMouseEnter={() => {
                  const className = productsRef.current[itr].className;
                  productsRef.current[
                    itr
                  ].className = `${className} opacity-low`;
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
                  onClick={() => navigate("/product/" + item?.products?.id)}
                >
                  View Product
                </button>
                <button
                  className="card-dismiss-btn"
                  onClick={async () => {
                    await removeFromCart({ id: item?.id });
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
      </div>
    </If>
  );
};

const CartWithProvider = () => (
  <CartProvider>
    <Cart />
  </CartProvider>
);

export default CartWithProvider;
