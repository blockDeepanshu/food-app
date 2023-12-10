import React from "react";

const Shimmer = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center mb-4">
        <div className="mb-4 md:mb-0">
          <div className="shimmer-box w-96 h-16 mb-2 animate-pulse"></div>
          <div className="shimmer-box w-64 h-10 animate-pulse"></div>
        </div>
        <div className="flex gap-4">
          <div className="shimmer-box w-24 h-10 animate-pulse"></div>
          <div className="shimmer-box w-24 h-10 animate-pulse"></div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center">
        {[1, 2, 3, 4, 5].map((index) => (
          <div
            key={index}
            className="shimmer-card m-4 w-64 h-80 animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Shimmer;
