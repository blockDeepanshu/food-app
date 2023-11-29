import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  return (
    <div style={{ color: "white" }}>
      <h1>
        {err.status}:{err.statusText}
      </h1>
    </div>
  );
};

export default Error;
