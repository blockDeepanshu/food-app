import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();

  return (
    <div className="flex items-center justify-center h-screen bg-red-500 text-white">
      <div className="text-center">
        <div className="text-6xl font-bold mb-4">{err.status}</div>
        <h1 className="text-2xl">{err.statusText}</h1>
      </div>
    </div>
  );
};

export default Error;
