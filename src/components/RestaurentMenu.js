import React, { useEffect, useState } from "react";
import Shimmer from "./Shimmer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faStar } from "@fortawesome/free-regular-svg-icons";
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
    <div className="m-auto w-5/6">
      <div className="flex justify-between">
        <div className="font-extrabold">
          <h3>{resDetails.name}</h3>
          <p>{resDetails.cuisines.join(",")}</p>
          <br />
          <p>{resDetails.feeDetails.message}</p>
        </div>
        <div className="h-24 w-20 border-2 border-red-500 my-2 mx-4 p-2 rounded-lg shadow-red-500 shadow-lg text-red-500">
          <p>
            {resDetails.avgRating} <FontAwesomeIcon icon={faStar} />
          </p>
          <hr />
          <p>{resDetails.totalRatingsString}</p>
        </div>
      </div>
      <hr />
      <div className="m-4">
        <h5>
          <FontAwesomeIcon icon={faClock} /> {resDetails.sla.slaString}
        </h5>
        <h5>
          <FontAwesomeIcon icon={faRupee} /> {resDetails.costForTwoMessage}
        </h5>
      </div>
      <hr />
      <div className="flex justify-start m-4">
        <h4>Veg Only</h4>

        <input type="checkbox" className="mx-2" />
      </div>

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
