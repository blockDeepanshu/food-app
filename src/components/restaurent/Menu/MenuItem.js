import React from "react";
import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../../../utils/store/slice/cartSlice";
import { CDN_URL } from "../../../utils/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MenuItem({ item, isCart }) {
  const dispatch = useDispatch();

  const handleAddItems = (item) => {
    dispatch(addItem(item));
    toast.success(`${item.name} added to cart ✅`, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleRemoveItems = (item) => {
    dispatch(removeItem(item));
    toast.success(`${item.name} removed from cart ✅`, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <div className="flex flex-col md:flex-row justify-between border-2 border-red-500 p-4 m-4 rounded-2xl">
      <div className="mb-4 md:mb-0 md:mr-4 w-full md:w-96">
        <h1 className="font-extrabold">{item?.name}</h1>
        <h5>Rs.{(item.price ? item.price : item.defaultPrice) / 100}</h5>
        <br />
        <p className="font-bold">{item?.description}</p>
      </div>
      <div className="flex flex-col items-center">
        <img
          className="w-full md:w-48 mx-2 border-2 border-red-500 rounded-3xl mb-4 md:mb-0"
          alt={item?.name}
          src={CDN_URL + item?.imageId}
        />
        {!isCart ? (
          <button
            onClick={() => handleAddItems(item)}
            className="border-2 border-black bg-black text-white p-2 rounded-lg mb-2"
          >
            Add +
          </button>
        ) : (
          <button
            onClick={() => handleRemoveItems(item)}
            className="border-2 border-black bg-black text-white p-2 rounded-lg mb-2"
          >
            Delete
          </button>
        )}
        <ToastContainer theme="dark" style={{ width: "fit-content" }} />
      </div>
    </div>
  );
}

export default MenuItem;
