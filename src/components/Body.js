import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RestaurentCard, {
  closedRestaurentComponent,
} from "./restaurent/RestaurentCard";
import Shimmer from "./Shimmer";
import { useSelector } from "react-redux";
import { useErrorBoundary } from "react-error-boundary";

const Body = () => {
  const [restaurentList, setRestaurentist] = useState([]);
  const [filteredRestaurent, setFilteredRestaurent] = useState([]);
  const [searchText, setSearchText] = useState("");

  const { showBoundary } = useErrorBoundary();

  const coordinates = useSelector((store) => store.location.coordinates);

  const RestaurentCloseCard = closedRestaurentComponent(RestaurentCard);

  const getTopRatedRestaurent = () => {
    const list = filteredRestaurent.filter((rest) => rest.info.avgRating > 4);
    setFilteredRestaurent(list);
  };

  const fetchData = async () => {
    try {
      const res = await fetch(
        `https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=${coordinates.lat}&lng=${coordinates.lng}`
      );
      const data = await res.json();

      const cardList = data?.data?.cards?.filter((item) => {
        return item.card.card.id === "restaurant_grid_listing";
      });

      const restaurentList =
        cardList[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

      setRestaurentist(restaurentList);
      setFilteredRestaurent(restaurentList);
    } catch (error) {
      showBoundary(error);
    }
  };

  const handleSearch = () => {
    let filteredList = restaurentList?.filter((res) =>
      res.info.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const cuisine = restaurentList?.map((item) => {
      item.info.cuisines = item.info.cuisines.map((cuisine) =>
        cuisine.toLowerCase()
      );
      return item;
    });

    setRestaurentist(cuisine);

    const cuisineFilter = restaurentList?.filter((res) =>
      res.info.cuisines.includes(searchText)
    );

    filteredList = [...filteredList, ...cuisineFilter];
    setFilteredRestaurent(filteredList);
    setSearchText("");
  };

  useEffect(() => {
    fetchData();
  }, []);

  // console.log("filtered", filteredRestaurent);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 w-full md:w-2/3 md:mx-auto">
        <input
          type="text"
          className="p-4 w-full border-2 border-red-500 rounded-full"
          placeholder="Search for Restaurants and food"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-4">
        <button
          className="bg-red-500 text-white rounded-full p-4"
          onClick={handleSearch}
        >
          Search
        </button>
        <button
          className="bg-red-500 text-white rounded-2xl p-4 box-border h-18"
          onClick={getTopRatedRestaurent}
        >
          Top rated 4+
        </button>
      </div>

      {filteredRestaurent?.length !== 0 ? (
        <div className="flex flex-wrap justify-center">
          {filteredRestaurent?.map((restaurent) => (
            <Link
              style={{ textDecoration: "none" }}
              to={`/restaurents/${restaurent.info.id}`}
              key={restaurent.info.id}
              className="p-4 w-full  sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4"
            >
              {restaurent.info.isOpen ? (
                <RestaurentCard resData={restaurent} />
              ) : (
                <RestaurentCloseCard resData={restaurent} />
              )}
            </Link>
          ))}
        </div>
      ) : (
        <Shimmer />
      )}
    </div>
  );
};

export default Body;
