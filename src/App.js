import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import Header from "./components/navbar/Header";
import Body from "./components/Body";
import Error from "./components/errors/Error";

import RestaurentMenu from "./components/restaurent/RestaurentMenu";
import { Provider } from "react-redux";
import appStrore from "./utils/store/appStore";
import Shimmer from "./components/Shimmer";
import { ErrorBoundary } from "react-error-boundary";
import RestaurentFetchingError from "./components/errors/RestaurentFetchingError";

const Cart = lazy(() => import("./components/restaurent/Cart"));

const AppLayout = () => {
  return (
    <Provider store={appStrore}>
      <Header />
      <Outlet />
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
        element: (
          <ErrorBoundary FallbackComponent={RestaurentFetchingError}>
            <Body />
          </ErrorBoundary>
        ),
      },
      {
        path: "/restaurents/:resId",
        element: (
          <ErrorBoundary FallbackComponent={RestaurentFetchingError}>
            <RestaurentMenu />
          </ErrorBoundary>
        ),
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
