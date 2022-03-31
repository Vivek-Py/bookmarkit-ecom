import { Link } from "react-router-dom";
import { APP_NAME, LOGIN, SEARCH_PLACEHOLDER } from "../../utils/constants";

const Header = () => {
  return (
    <header className="navbar row">
      <Link to="/" className="nav-brand h2">
        {APP_NAME}
      </Link>
      <div className="nav row justify-end">
        <input type="text" className="input" placeholder={SEARCH_PLACEHOLDER} />
        <Link className="nav-item" to="/login">
          <button className="primary-btn">{LOGIN}</button>
        </Link>
        <Link className="nav-item" to="/wishlist">
          <div className="badge-wrapper">
            <i className="fas fa-solid fa-heart fa-2x icon">
              <div className="badge__icon--right">2</div>
            </i>
          </div>
        </Link>
        <Link className="nav-item" to="/cart">
          <div className="badge-wrapper">
            <i className="fas fa-solid fa-cart-arrow-down fa-2x icon">
              <div className="badge__icon--right">1</div>
            </i>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
