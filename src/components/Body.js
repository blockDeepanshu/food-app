import { useEffect, useState } from "react";
import RestaurentCard, { closedRestaurentComponent } from "./RestaurentCard";

import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

const Body = () => {
  const [restaurentList, setRestaurentist] = useState([]);
  const [filteredRestaurent, setFilteredRestaurent] = useState([]);
  const [searchText, setSearchText] = useState("");

  const coordinates = useSelector((store) => store.location.coordinates);

  const RestaurentCloseCard = closedRestaurentComponent(RestaurentCard);

  const getTopRatedRestaurent = () => {
    const list = filteredRestaurent.filter((rest) => {
      return rest.info.avgRating > 4;
    });

    setFilteredRestaurent(list);
  };

  const fetchData = async () => {
    const res = await fetch(
      `https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=${coordinates.lat}&lng=${coordinates.lng}`
    );

    const data = await res.json();

    console.log(data);

    const restaurentList =
      data?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;
    setRestaurentist(restaurentList);
    setFilteredRestaurent(restaurentList);
  };

  const handleSearch = () => {
    let filteredList = restaurentList?.filter((res) => {
      return res.info.name.toLowerCase().includes(searchText.toLowerCase());
    });

    const cuisine = restaurentList?.map((item) => {
      for (let i = 0; i < item.info.cuisines.length; i++) {
        item.info.cuisines[i] = item.info.cuisines[i].toLowerCase();
      }
      return item;
    });

    setRestaurentist(cuisine);

    console.log(restaurentList);

    const cuisineFilter = restaurentList?.filter((res) => {
      return res.info.cuisines.includes(searchText);
    });
    console.log(cuisineFilter);
    filteredList = [...filteredList, ...cuisineFilter];

    setFilteredRestaurent(filteredList);
    setSearchText("");
  };

  useEffect(() => {
    fetchData();
  }, [coordinates]);

  return (
    <div>
      <div className="flex justify-center">
        <div className="m-4">
          <input
            type="text"
            className="p-4 w-96 border-2 border-red-500 rounded-full"
            placeholder="Search for Restaurents and food"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
          <button
            className="mx-4 bg-red-500 text-white rounded-full p-4"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <button
          className="m-4 bg-red-500 text-white rounded-2xl p-4 box-border h-18"
          onClick={getTopRatedRestaurent}
        >
          Top rated 4+
        </button>
      </div>

      {filteredRestaurent?.length !== 0 ? (
        <div className="flex flex-wrap justify-center">
          {filteredRestaurent?.map((restaurent) => {
            return restaurent.info.isOpen ? (
              <Link
                style={{ textDecoration: "none" }}
                to={`/restaurents/${restaurent.info.id}`}
                key={restaurent.info.id}
                className="p-4"
              >
                <RestaurentCard resData={restaurent} />
              </Link>
            ) : (
              <RestaurentCloseCard
                resData={restaurent}
                key={restaurent.info.id}
              />
            );
          })}
        </div>
      ) : (
        <Shimmer />
      )}
    </div>
  );
};

export default Body;
