import { useEffect, useState } from "react";
import RestaurentCard from "./RestaurentCard";

import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

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
    const res = await fetch(
      "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.969539&lng=72.819329"
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

    const cuisineFilter = restaurentList?.filter((res) => {
      return res.info.cuisines.includes(searchText);
    });
    // console.log(cuisineFilter);
    filteredList = [...filteredList, ...cuisineFilter];

    // console.log(filteredList);

    setFilteredRestaurent(filteredList);
    setSearchText("");
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            placeholder="Search for Restaurents and food"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
          <button className="search-btn" onClick={handleSearch}>
            search
          </button>
        </div>

        <button className="filter-btn" onClick={getTopRatedRestaurent}>
          Top rated 4+
        </button>
        <button className="sort-btn" onClick={onOpenModal}>
          Sort By
        </button>
      </div>
      <Modal open={open} onClose={onCloseModal} center classNames="modal">
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
        <div className="res-container">
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
