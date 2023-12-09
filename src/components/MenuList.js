import React, { useState } from "react";

import { useMenuCardList } from "../utils/hooks/useMenuCardList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleDown,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";

import MenuItem from "./MenuItem";

const MenuList = ({ menu, open, setIndex, isVeg }) => {
  const { title } = menu;

  const cardInfoList = useMenuCardList(menu, isVeg);

  return (
    <React.Fragment>
      <hr className="w-full bg-red-500 h-1 rounded-full" />
      <div
        className="flex justify-between bg-gray-50 shadow-lg p-4 h-14 align-middle cursor-pointer"
        onClick={() => setIndex()}
      >
        <span className="m-4 my-auto font-extrabold">{`${title}(${cardInfoList?.length})`}</span>
        <span className="text-lg">
          <FontAwesomeIcon
            icon={open ? faArrowCircleDown : faArrowCircleRight}
          />
        </span>
      </div>
      {open &&
        cardInfoList?.map((item) => {
          return <MenuItem item={item} key={item.id} isCart={false} />;
        })}
    </React.Fragment>
  );
};

export default MenuList;
