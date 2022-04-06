import React from "react";
import { useNavigate } from "react-router-dom";
import { PRODUCTS_LINK } from "../../utils/constants";
import "./index.css";

const Home = () => {
  const navigate = useNavigate();
  const featuredProducts = PRODUCTS_LINK;
  return (
    <div onClick={() => navigate("/products")}>
      <img
        className="responsive-img"
        src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/4/5/de979eef-5aad-43e4-85bf-cdf2f37cb3061649160204949-Sportswear_Desk.jpg"
        alt="hero-img"
        srcset=""
      />
      <h2 className="h2 gap-header">BIGGEST DEALS ON TOP BRANDS</h2>
      <div className="grid-auto section home">
        {featuredProducts.map((item) => {
          return (
            <div className="card-wrapper vertical no-padding">
              <img
                className="card-img responsive-img"
                loading="lazy"
                src={item}
                alt="Sample Avatar"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
