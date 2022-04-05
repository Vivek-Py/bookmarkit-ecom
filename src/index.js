import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Cart from "./containers/Cart";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Wishlist from "./containers/Wishlist";
import { LoginProvider } from "./containers/Login/loginContext";

import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./containers/Header";
import "./index.css";
import { HeaderProvider } from "./containers/Header/headerContext";

ReactDOM.render(
  <React.StrictMode>
    <HeaderProvider>
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
            <Route
              path="/cart"
              element={<ProtectedRoute element={<Cart />} />}
            />
          </Routes>
        </BrowserRouter>
      </LoginProvider>
    </HeaderProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
