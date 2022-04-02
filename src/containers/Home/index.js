import { useEffect, useState } from "react";
import { ProductProvider, useProducts } from "./productContext";

import "./index.css";

const Home = () => {
  /* Custom webhook for products */
  const { productFilters, dispatch } = useProducts();

  /* States for product filters */
  const [genderFilter, setGenderFilter] = useState([]);
  const [starFilter, setStarFilter] = useState([]);
  const [minPrice, setMinPrice] = useState(1);

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
    console.log("dispatching", minPrice);
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
              <span class="price-tip --left">₹ 1</span>
              <span class="price-tip --right">₹ 1000</span>
            </ul>
          </form>
        </aside>
        <section className="section grid-auto">
          {productFilters.map((product) => {
            return (
              <div
                key={product?.id}
                className="card-wrapper vertical no-padding"
              >
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
                    <h4 className="h4">₹{product?.price}</h4>
                    <p className="text-sm price-cut sub-text">
                      ₹{product?.price + product?.price}
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
  <ProductProvider>
    <Home />
  </ProductProvider>
);

export default HomeProducts;
