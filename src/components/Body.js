import { useEffect, useState } from "react";
import RestaurentCard from "./RestaurentCard";

import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { RES_URL } from "../utils/constants";

const Body = () => {
  const [restaurentList, setRestaurentist] = useState([]);
  const [filteredRestaurent, setFilteredRestaurent] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const getTopRatedRestaurent = () => {
    const list = filteredRestaurent.filter((rest) => {
      return rest.info.avgRating > 4;
    });

    setFilteredRestaurent(list);
  };

  const fetchData = async () => {
    const res = await fetch(RES_URL);

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
  }, []);

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
        <button
          className="m-4 bg-red-500 text-white rounded-2xl p-4 box-border h-18"
          onClick={onOpenModal}
        >
          Sort By
        </button>
      </div>
      <Modal open={open} onClose={onCloseModal} center>
        <label class="form-control">
          <input type="radio" name="radio" />
          Radio
        </label>
        <label class="form-control">
          <input type="radio" name="radio" />
          Radio
        </label>
        <label class="form-control">
          <input type="radio" name="radio" />
          Radio
        </label>
        <label class="form-control">
          <input type="radio" name="radio" />
          Radio
        </label>
      </Modal>

      {filteredRestaurent?.length !== 0 ? (
        <div className="flex flex-wrap justify-center">
          {filteredRestaurent?.map((restaurent) => {
            return (
              <Link
                style={{ textDecoration: "none" }}
                to={`/restaurents/${restaurent.info.id}`}
                key={restaurent.info.id}
              >
                <RestaurentCard resData={restaurent} />
              </Link>
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
