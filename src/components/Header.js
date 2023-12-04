import { Link } from "react-router-dom";
import { LOGO_URL } from "../utils/constants";
import { useNetworkStatus } from "../utils/hooks/useNetworkStatus";

const Header = () => {
  const online = useNetworkStatus();

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL} />
      </div>

      <div className="nav-items">
        <ul>
          <li>{online ? "Connected :🟢" : "Offline: 🔴"}</li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>Cart</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
