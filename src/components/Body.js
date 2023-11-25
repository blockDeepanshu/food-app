import { useState } from "react";
import RestaurentCard from "./RestaurentCard";
import resList from "../utils/mockData";

const Body = () => {
  const [restaurentList, setRestaurentist] = useState(resList);

  const getTopRatedRestaurent = () => {
    const list = restaurentList.filter((rest) => {
      return rest.info.avgRating > 4;
    });

    setRestaurentist(list);
  };

  return (
    <div className="body">
      <div className="search">
        <button onClick={getTopRatedRestaurent}>Top rated 4+</button>
      </div>
      <div className="res-container">
        {restaurentList.map((restaurent, index) => {
          return (
            <RestaurentCard resData={restaurent} key={restaurent.info.id} />
          );
        })}
      </div>
    </div>
  );
};

export default Body;
