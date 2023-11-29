import React from "react";
import Shimmer from "./Shimmer";
//import { CDN_URL } from "../utils/constants";

const MenuList = ({ menu }) => {
  const { title, itemCards } = menu;

  console.log(itemCards);
  const itemcards = menu.categories
    ? menu.categories.map((item) => item.itemCards).flat(1)
    : menu.carousel
    ? menu.carousel.map((item) => item.dish)
    : menu.itemCards;

  console.log(itemcards);

  const cardInfoList = itemcards.map((item) => {
    return item.card ? item.card.info : item.info;
  });

  console.log(cardInfoList);

  return (
    <>
      <hr
        style={{ height: "5px", backgroundColor: "red", marginTop: "20px" }}
      />
      <h1>{`${title}(${cardInfoList?.length})`}</h1>
      {cardInfoList?.map((item) => {
        return (
          <div className="list-container" key={item.id}>
            <div className="food-info">
              <h1>{item.name}</h1>
              <h5>Rs.{item.price / 100}</h5>
              <br />
              <p>{item.description}</p>
            </div>
            <div className="food-img">
              <img
                alt={item.name}
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item.imageId}`}
              />
              <button>Add +</button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MenuList;
