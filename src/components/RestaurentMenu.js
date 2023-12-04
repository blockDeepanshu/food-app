import React, { useEffect, useState } from "react";
import Shimmer from "./Shimmer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faRupee } from "@fortawesome/free-solid-svg-icons";
import MenuList from "./MenuList";
import { useParams } from "react-router-dom";
import { useRestaurentMenu } from "../utils/hooks/useRestaurentMenu";

const RestaurentMenu = () => {
  const { resId } = useParams();

  const { resDetails, resMenu } = useRestaurentMenu(resId);

  return resDetails === null ? (
    <Shimmer />
  ) : (
    <div className="menu">
      <div className="menu-res-detail">
        <div className="res-info">
          <h3>{resDetails.name}</h3>
          <p>{resDetails.cuisines.join(",")}</p>
          <br />
          <p>{resDetails.feeDetails.message}</p>
        </div>
        <div className="res-rating">
          <p>{resDetails.avgRating} stars</p>
          <hr />
          <p>{resDetails.totalRatingsString}</p>
        </div>
      </div>
      <hr />
      <div className="res-delivery-info">
        <h5>
          <FontAwesomeIcon icon={faClock} /> {resDetails.sla.slaString}
        </h5>
        <h5>
          <FontAwesomeIcon icon={faRupee} /> {resDetails.costForTwoMessage}
        </h5>
      </div>
      <hr />
      <div className="toggle-btn-container">
        <h4>Veg Only</h4>

        <input type="checkbox" />
      </div>
      <hr />
      {resMenu.length === 0 ? (
        <h1>Loading....</h1>
      ) : (
        resMenu.map((item) => {
          return <MenuList key={item.card.card.title} menu={item.card.card} />;
        })
      )}
    </div>
  );
};

export default RestaurentMenu;
