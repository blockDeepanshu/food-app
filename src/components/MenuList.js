import React, { useState } from "react";
import { CDN_URL } from "../utils/constants";
import { useMenuCardList } from "../utils/hooks/useMenuCardList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleDown,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";

const MenuList = ({ menu, open, setIndex }) => {
  const { title } = menu;

  const cardInfoList = useMenuCardList(menu);

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
          return (
            <div
              className="flex justify-between border-2 border-red-500 p-4 m-4 rounded-2xl"
              key={item.id}
            >
              <div className="w-96">
                <h1 className="font-extrabold">{item.name}</h1>
                <h5>Rs.{item.price / 100}</h5>
                <br />
                <p className="font-bold">{item.description}</p>
              </div>
              <div>
                <img
                  className="w-48 mx-2 border-2 border-red-500 rounded-3xl"
                  alt={item.name}
                  src={CDN_URL + item.imageId}
                />
                <button className="border-2 border-red-500 text-red-500 p-2 rounded-full mx-4 my-1 relative bottom-15 left-12 hover:bg-red-500 hover:text-white">
                  Add +
                </button>
              </div>
            </div>
          );
        })}
    </React.Fragment>
  );
};

export default MenuList;
