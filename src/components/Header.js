import { Link } from "react-router-dom";
import { LOGO_URL } from "../utils/constants";
import { useNetworkStatus } from "../utils/hooks/useNetworkStatus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const online = useNetworkStatus();

  return (
    <div className="flex justify-between bg-red-500 my-4 mx-auto w-9/12 rounded-2xl shadow-red-500 shadow-lg text-yellow-50 font-medium sticky top-0 left-48">
      <div className="w-64 p-4">
        <Link to="/">
          {" "}
          <img className="ml-0" src={LOGO_URL} />
        </Link>
      </div>

      <div className="m-0">
        <ul className="flex m-4">
          <li className="p-4">{online ? "Connected :🟢" : "Offline: 🔴"}</li>

          <li className="p-4">
            <Link to="/about">About Us</Link>
          </li>
          <li className="p-4">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="p-4">
            <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
