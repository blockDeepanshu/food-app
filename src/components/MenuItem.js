import React from "react";
import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../utils/store/slice/cartSlice";
import { CDN_URL } from "../utils/constants";
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
    <div
      className="flex justify-between border-2 border-red-500 p-4 m-4 rounded-2xl"
      key={item?.id}
    >
      <div className="w-96">
        <h1 className="font-extrabold">{item?.name}</h1>
        <h5>Rs.{(item.price ? item.price : item.defaultPrice) / 100}</h5>
        <br />
        <p className="font-bold">{item?.description}</p>
      </div>
      <div>
        <img
          className="w-48 mx-2 border-2 border-red-500 rounded-3xl"
          alt={item?.name}
          src={CDN_URL + item?.imageId}
        />
        {!isCart ? (
          <button
            onClick={() => handleAddItems(item)}
            className="border-2 border-black bg-black text-white p-2 rounded-lg mx-4 my-1 relative bottom-8 left-14"
          >
            Add +
          </button>
        ) : (
          <button
            onClick={() => handleRemoveItems(item)}
            className="border-2 border-black bg-black text-white p-2 rounded-lg mx-4 my-1 relative bottom-8 left-14"
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
