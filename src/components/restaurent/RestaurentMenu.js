import React, { useState } from "react";
import Shimmer from "../Shimmer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faStar } from "@fortawesome/free-regular-svg-icons";
import { faRupee } from "@fortawesome/free-solid-svg-icons";
import MenuList from "./Menu/MenuList";
import { useParams } from "react-router-dom";
import { useRestaurentMenu } from "../../utils/hooks/useRestaurentMenu";

const RestaurentMenu = () => {
  const { resId } = useParams();
  const { resDetails, resMenu } = useRestaurentMenu(resId);
  const [showIndex, setShowIndex] = useState(0);
  const [isVeg, setIsVeg] = useState(false);

  console.log(resMenu);

  return resDetails === null ? (
    <Shimmer />
  ) : (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="font-extrabold mb-4 md:mb-0 md:mr-4">
          <h3>{resDetails?.name}</h3>
          <p>{resDetails?.cuisines.join(",")}</p>
          <br />
          <p>{resDetails?.feeDetails.message}</p>
        </div>
        <div className="h-24 w-20 border-2 border-red-500 my-2 mx-4 p-2 rounded-lg shadow-red-500 shadow-lg text-red-500">
          <p>
            {resDetails?.avgRating} <FontAwesomeIcon icon={faStar} />
          </p>
          <hr />
          <p>{resDetails?.totalRatingsString}</p>
        </div>
      </div>
      <hr className="my-4" />
      <div className="mb-4">
        <h5>
          <FontAwesomeIcon icon={faClock} /> {resDetails?.sla?.slaString}
        </h5>
        <h5>
          <FontAwesomeIcon icon={faRupee} /> {resDetails?.costForTwoMessage}
        </h5>
      </div>
      <hr className="my-4" />
      <div className="flex items-center mb-4">
        <h4 className="mr-2">Veg Only</h4>
        <input
          onChange={(e) => setIsVeg(e.target.checked)}
          type="checkbox"
          className="mr-2"
        />
      </div>

      {resMenu?.length === 0 ? (
        <h1>Loading....</h1>
      ) : (
        resMenu?.map((item, index) => (
          <MenuList
            key={item.card.card.title}
            menu={item.card.card}
            open={index === showIndex ? true : false}
            setIndex={() => setShowIndex(index)}
            isVeg={isVeg}
          />
        ))
      )}
    </div>
  );
};

export default RestaurentMenu;
