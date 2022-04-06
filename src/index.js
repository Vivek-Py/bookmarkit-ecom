import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./containers/Home";
import Cart from "./containers/Cart";
import Products from "./containers/Products";
import Login from "./containers/Login";
import Wishlist from "./containers/Wishlist";
import Product from "./containers/Product";
import Header from "./containers/Header";

import Error from "./components/Error";
import ProtectedRoute from "./components/ProtectedRoute";
import { HeaderProvider } from "./containers/Header/headerContext";
import { ProductProvider } from "./containers/Products/productContext";
import { LoginProvider } from "./containers/Login/loginContext";
import { WhishlistProvider } from "./containers/Wishlist/wishlistContext";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <HeaderProvider>
      <ProductProvider>
        <WhishlistProvider>
          <LoginProvider>
            <BrowserRouter>
              <Header />
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/products" element={<Products />} />
                <Route exact path="/login" element={<Login />} />
                <Route
                  exact
                  path="/wishlist"
                  element={<ProtectedRoute element={<Wishlist />} />}
                />
                <Route exact path="/product/:productId" element={<Product />} />
                <Route
                  exact
                  path="/cart"
                  element={<ProtectedRoute element={<Cart />} />}
                />
                <Route path="*" element={<Error />} />
              </Routes>
            </BrowserRouter>
          </LoginProvider>
        </WhishlistProvider>
      </ProductProvider>
    </HeaderProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
