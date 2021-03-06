import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "./productContext";
import { useHeader } from "../Header/headerContext";

import "./index.css";
import {
  addToWishlist,
  getAllWishlistProducts,
} from "../../utils/databaseQuery";
import { supabaseAuthId } from "../../utils/supabaseClient";
import { WhishlistProvider } from "../Wishlist/wishlistContext";

const Products = () => {
  /* Custom webhook for products */
  const { productFilters, dispatch } = useProducts();
  const { dispatch: headerDispatch } = useHeader();

  /* States for product filters */
  const [genderFilter, setGenderFilter] = useState([]);
  const [starFilter, setStarFilter] = useState([]);
  const [minPrice, setMinPrice] = useState(1);

  /* Ref for all products */
  const productsRef = useRef([]);
  const navigate = useNavigate();

  /* Function to handle various filter */
  const handleFilter = (type) => {
    if (type === "gender") {
      return function (e) {
        if (e.target.checked)
          setGenderFilter([...genderFilter, e.target.value]);
        else
          setGenderFilter([
            ...genderFilter.filter((item) => item !== e.target.value),
          ]);
      };
    } else if (type === "rating") {
      return function (e) {
        if (e.target.checked)
          setStarFilter([...new Set([...starFilter, +e.target.value[0]])]);
        else
          setStarFilter([
            ...starFilter.filter((item) => item !== +e.target.value[0]),
          ]);
      };
    } else if ("price") {
      return function (e) {
        setMinPrice(e.target.value);
      };
    }
  };

  useEffect(() => {
    dispatch({
      type: "SET_PRODUCT_FILTERS",
      payload: { gender: genderFilter, star: starFilter, minPrice },
    });
  }, [genderFilter, starFilter, minPrice, dispatch]);

  return (
    <div>
      <main className="main-section grid-2">
        <aside className="sidebar">
          <form>
            <div className="grid-2">
              <h4 className="h4">Filters</h4>
              <input
                type="reset"
                className="link-btn"
                onClick={(e) => {
                  setGenderFilter([]);
                  setStarFilter([]);
                  setMinPrice(1);
                }}
              ></input>
            </div>

            <ul className="stacked-list">
              <li className="text-sm fw-700 no-padding">Category</li>
              <li className="grid-2 checkbox">
                <input
                  type="checkbox"
                  value="Male"
                  onClick={handleFilter("gender")}
                />
                <label htmlFor="Male">Men</label>
                <input
                  type="checkbox"
                  value="Female"
                  onClick={handleFilter("gender")}
                />
                <label htmlFor="Female">Women</label>
              </li>
            </ul>

            <ul className="stacked-list">
              <li className="text-sm fw-700 no-padding">Ratings</li>
              <li className="grid-2 checkbox">
                <input
                  type="checkbox"
                  value="4star"
                  onClick={handleFilter("rating")}
                />
                <label htmlFor="4star">4 stars and up</label>
                <input
                  type="checkbox"
                  value="3star"
                  onClick={handleFilter("rating")}
                />
                <label htmlFor="3stars">3 stars and up</label>
                <input
                  type="checkbox"
                  value="2star"
                  onClick={handleFilter("rating")}
                />
                <label htmlFor="2star">2 stars and up</label>
                <input
                  type="checkbox"
                  value="1star"
                  onClick={handleFilter("rating")}
                />
                <label htmlFor="1star">1 star and up</label>
              </li>
            </ul>
            <ul className="price-slider">
              <li className="text-sm fw-700 no-padding">Price</li>
              <input
                type="range"
                min="1"
                max="1000"
                defaultValue={1}
                className="slider"
                id="slider"
                onChange={handleFilter("price")}
              />
              <span className="price-tip --left">??? 1</span>
              <span className="price-tip --right">??? 1000</span>
            </ul>
          </form>
        </aside>
        <section className="section grid-auto">
          {productFilters.map((product, itr) => {
            return (
              <div
                key={product?.id}
                className="card-wrapper vertical no-padding"
                ref={(ele) => (productsRef.current[itr] = ele)}
                onMouseEnter={() => {
                  const className = productsRef.current[itr].className;
                  productsRef.current[
                    itr
                  ].className = `${className} opacity-low`;
                  productsRef.current[itr].children[0].style.display = "block";
                  productsRef.current[itr].children[1].style.display = "block";
                }}
                onMouseLeave={() => {
                  const className = productsRef.current[itr].className;
                  productsRef.current[itr].className = `${className.replace(
                    "opacity-low",
                    ""
                  )}`;
                  productsRef.current[itr].children[0].style.display = "none";
                  productsRef.current[itr].children[1].style.display = "none";
                }}
              >
                <button
                  id="no-opacity"
                  className="secondary-btn"
                  onClick={async () => {
                    await addToWishlist({
                      product_id: product.id,
                      user_id: supabaseAuthId,
                    });
                    getAllWishlistProducts().then((wishlist) => {
                      headerDispatch({
                        type: "SET_ITEMS",
                        payload: wishlist.length,
                      });
                    });
                  }}
                >
                  Add to Wishlist
                </button>
                <button
                  id="no-opacity"
                  className="secondary-btn upper"
                  onClick={() => navigate("/product/" + product?.id)}
                >
                  View Details
                </button>
                <img
                  className="card-img responsive-img hero-img"
                  loading="lazy"
                  src={product.img}
                  alt="Sample Avatar"
                />
                <section className="flex column flex-start">
                  <p className="text-md">{product?.brand}</p>
                  <p className="text-sm sub-text">{product?.brand_sub_text}</p>
                  <div className="grid-3 pricing">
                    <h4 className="h4">???{product?.price}</h4>
                    <p className="text-sm price-cut sub-text">
                      ???{product?.price + product?.price}
                    </p>
                    <p className="text-sm discount">(50%)</p>
                  </div>
                </section>
              </div>
            );
          })}
        </section>
      </main>
    </div>
  );
};

const HomeProducts = () => (
  <WhishlistProvider>
    <Products />
  </WhishlistProvider>
);

export default HomeProducts;
