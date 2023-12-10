import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuItem from "./Menu/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { clearCart } from "../../utils/store/slice/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Cart() {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleClearItems = () => {
    dispatch(clearCart());
  };

  const notify = () => {
    dispatch(clearCart());
    toast.success("Order placed successfully ✅", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center font-bold m-2 p-2 text-2xl">
        Cart
        {cartItems.length > 0 && (
          <button
            onClick={handleClearItems}
            className="p-2 mx-3.5 bg-red-500 text-black cursor-pointer"
          >
            Clear <FontAwesomeIcon icon={faTrashCan} />
          </button>
        )}
      </h1>

      <div>
        {cartItems.length > 0 ? (
          cartItems &&
          cartItems.map((item) => (
            <MenuItem item={item} isCart={true} key={item.id} />
          ))
        ) : (
          <h1 className="text-center font-bold m-2 p-2 text-2xl">
            Cart is Empty ☹
          </h1>
        )}
      </div>

      {cartItems.length > 0 && (
        <button
          onClick={notify}
          className="flex justify-center items-center m-auto p-2 bg-black text-white rounded-lg mt-4"
        >
          Place Order
        </button>
      )}
      <ToastContainer theme="dark" />
    </div>
  );
}

export default Cart;
