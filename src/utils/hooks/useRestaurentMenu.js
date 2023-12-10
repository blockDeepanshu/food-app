import { useEffect, useState } from "react";
import { MENU_URL } from "../constants";
import { useSelector } from "react-redux";
import { useErrorBoundary } from "react-error-boundary";

export const useRestaurentMenu = (resId) => {
  const [resDetails, setResDeatils] = useState(null);
  const [resMenu, setResMenu] = useState([]);

  useEffect(() => {
    fetchMenu();
  }, []);

  const coordinates = useSelector((store) => store.location.coordinates);

  const fetchMenu = async () => {
    const { showBoundary } = useErrorBoundary();

    try {
      const res =
        await fetch(`https://corsproxy.io/?https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${coordinates.lat}&lng=${coordinates.lng}&restaurantId=${resId};
    `);
      const data = await res.json();

      const menuList =
        data?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards;

      const filteredMenuList = menuList?.filter((item, index) => {
        return index > 0 && index < menuList.length - 2;
      });

      setResDeatils(data?.data?.cards[0]?.card?.card?.info);
      setResMenu(filteredMenuList);
    } catch (err) {
      showBoundary(err);
    }
  };

  return { resMenu, resDetails };
};
