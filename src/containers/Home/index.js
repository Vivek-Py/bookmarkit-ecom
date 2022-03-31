import { useEffect, useState } from "react";
import { getAllProducts } from "../../utils/databaseQuery";

import "./index.css";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts().then(setProducts);
  }, []);

  return (
    <div>
      <main className="main-section grid-2">
        <aside className="sidebar">
          <div className="grid-2">
            <h4 className="h4">Filters</h4>
            <button className="link-btn">Clear</button>
          </div>

          <ul className="stacked-list">
            <li className="text-sm fw-700 no-padding">Category</li>
            <li className="grid-2 checkbox">
              <input type="checkbox" value="Men" />
              <label for="Men">Men</label>
              <input type="checkbox" value="Women" />
              <label for="Women">Women</label>
            </li>
          </ul>

          <ul className="stacked-list">
            <li className="text-sm fw-700 no-padding">Ratings</li>
            <li className="grid-2 checkbox">
              <input type="checkbox" value="4star" />
              <label htmlFor="4star">4 stars and up</label>
              <input type="checkbox" value="3star" />
              <label htmlFor="3stars">3 stars and up</label>
              <input type="checkbox" value="2star" />
              <label htmlFor="2star">2 stars and up</label>
              <input type="checkbox" value="1star" />
              <label htmlFor="1star">1 star and up</label>
            </li>
          </ul>
          {/* home className card wrapper */}
          <ul>
            <li className="text-sm fw-700 no-padding">Price Range</li>
            <input
              type="range"
              min="1"
              max="100"
              className="slider"
              id="slider"
            />
          </ul>
        </aside>
        <section className="section grid-auto">
          {products.map((product) => {
            return (
              <div class="card-wrapper vertical no-padding">
                <img
                  class="card-img responsive-img hero-img"
                  loading="lazy"
                  src={product.img}
                  alt="Sample Avatar"
                />
                <section className="flex column flex-start">
                  <p class="text-md">{product?.brand}</p>
                  <p class="text-sm sub-text">{product?.brand_sub_text}</p>
                  <div className="grid-3 pricing">
                    <h4 class="h4">₹{product?.price}</h4>
                    <p class="text-sm price-cut sub-text">
                      ₹{product?.price + product?.price}
                    </p>
                    <p class="text-sm discount">(50%)</p>
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

export default Home;
