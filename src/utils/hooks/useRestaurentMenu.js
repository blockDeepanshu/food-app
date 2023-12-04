import { useEffect, useState } from "react";
import { MENU_URL } from "../constants";

export const useRestaurentMenu = (resId) => {
  const [resDetails, setResDeatils] = useState(null);
  const [resMenu, setResMenu] = useState([]);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const res = await fetch(MENU_URL + resId);
    const data = await res.json();

    const menuList =
      data?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards;

    const filteredMenuList = menuList.filter((item, index) => {
      return index > 0 && index < menuList.length - 2;
    });

    setResDeatils(data?.data?.cards[0]?.card?.card?.info);
    setResMenu(filteredMenuList);
  };

  return { resMenu, resDetails };
};
