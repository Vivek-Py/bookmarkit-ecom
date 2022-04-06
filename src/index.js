import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Cart from "./containers/Cart";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Wishlist from "./containers/Wishlist";
import Product from "./containers/Product";
import Header from "./containers/Header";

import ProtectedRoute from "./components/ProtectedRoute";
import { HeaderProvider } from "./containers/Header/headerContext";
import { ProductProvider } from "./containers/Home/productContext";
import { LoginProvider } from "./containers/Login/loginContext";
import "./index.css";
import { WhishlistProvider } from "./containers/Wishlist/wishlistContext";

ReactDOM.render(
  <React.StrictMode>
    <HeaderProvider>
      <ProductProvider>
        <WhishlistProvider>
          <LoginProvider>
            <BrowserRouter>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/wishlist"
                  element={<ProtectedRoute element={<Wishlist />} />}
                />
                <Route path="/product/:productId" element={<Product />} />
                <Route
                  path="/cart"
                  element={<ProtectedRoute element={<Cart />} />}
                />
              </Routes>
            </BrowserRouter>
          </LoginProvider>
        </WhishlistProvider>
      </ProductProvider>
    </HeaderProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
