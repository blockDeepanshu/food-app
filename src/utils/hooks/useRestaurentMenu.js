import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useErrorBoundary } from "react-error-boundary";

export const useRestaurentMenu = (resId) => {
  const [resDetails, setResDeatils] = useState(null);
  const [resMenu, setResMenu] = useState([]);

  useEffect(() => {
    fetchMenu();
  }, []);

  const coordinates = useSelector((store) => store.location.coordinates);
  const { showBoundary } = useErrorBoundary();

  const fetchMenu = async () => {
    try {
      const res =
        await fetch(`https://corsproxy.io/?https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${coordinates.lat}&lng=${coordinates.lng}&restaurantId=${resId};
    `);
      const data = await res.json();

      //console.log("menudata", data);

      const menuListCard = data?.data?.cards.filter((item) => {
        return item.hasOwnProperty("groupedCard");
      });

      const menuList =
        menuListCard[0]?.groupedCard?.cardGroupMap?.REGULAR?.cards;

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
