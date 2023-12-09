import { Link } from "react-router-dom";
import { LOGO_URL } from "../utils/constants";
import { useNetworkStatus } from "../utils/hooks/useNetworkStatus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

import { useLocation } from "../utils/hooks/useGeoLocation";

const Header = () => {
  const online = useNetworkStatus();

  const cartItems = useSelector((store) => store.cart.items);

  const { address } = useLocation();

  return (
    <div className="flex justify-between bg-red-500  w-full  shadow-red-500 shadow-lg text-yellow-50 font-medium sticky z-40 top-0 left-48">
      <div className="w-64 p-4">
        <Link to="/">
          {" "}
          <img className="ml-0" src={LOGO_URL} />
        </Link>
      </div>

      <div className="m-0">
        <ul className="flex m-4">
          <li className="p-4 mx-4 cursor-pointer">
            <FontAwesomeIcon icon={faLocation} /> {address && address}
          </li>
          <li className="p-4">{online ? "Connected :🟢" : "Offline: 🔴"}</li>

          <li className="p-4">
            <Link to="/cart">
              <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>-
              {cartItems?.length} Items
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
