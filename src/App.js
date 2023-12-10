import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import Header from "./components/Header";
import Body from "./components/Body";
import Error from "./components/Error";

import RestaurentMenu from "./components/RestaurentMenu";
import { Provider } from "react-redux";
import appStrore from "./utils/store/appStore";
import Shimmer from "./components/Shimmer";
// import Cart from "./components/Cart";

const Cart = lazy(() => import("./components/Cart"));

const AppLayout = () => {
  return (
    <Provider store={appStrore}>
      <div className="app">
        <Header />
        <Outlet />
      </div>
    </Provider>
  );
};

const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },

      {
        path: "/restaurents/:resId",
        element: <RestaurentMenu />,
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Cart />
          </Suspense>
        ),
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRoutes} />);
