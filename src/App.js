import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import Header from "./components/Header";
import Body from "./components/Body";
import Error from "./components/Error";
// import About from "./components/About";
import Contact from "./components/Contact";
import RestaurentMenu from "./components/RestaurentMenu";
import { Provider } from "react-redux";
import appStrore from "./utils/store/appStore";

const About = lazy(() => import("./components/About"));

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
        path: "/about",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restaurents/:resId",
        element: <RestaurentMenu />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRoutes} />);
