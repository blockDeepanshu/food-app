import { CDN_URL } from "../utils/constants";

const RestaurentCard = (props) => {
  const { resData } = props;

  const { name, avgRating, cuisines, sla, cloudinaryImageId, isOpen } =
    resData.info;
  const closeClass = !isOpen ? "bg-black opacity-60" : "";
  return (
    <div
      className={`w-80 m-4  h-full border-2 border-red-500 rounded-2xl shadow-lg shadow-red-500 ${closeClass}`}
    >
      <img
        className="w-full h-80 rounded-2xl"
        alt="res-logo"
        src={CDN_URL + cloudinaryImageId}
      />
      <div className="p-4 w-full">
        <h3>{name}</h3>

        <h4>
          {avgRating} stars • {sla.slaString}
        </h4>
        <h4>
          {cuisines
            .map(
              (item) =>
                `${item.charAt(0).toUpperCase()}${item.slice(
                  1,
                  item.length - 1
                )}`
            )
            .join(",")}
        </h4>
      </div>
    </div>
  );
};

export const closedRestaurentComponent = (RestaurentCard) => {
  return (props) => {
    return (
      <div>
        <h1 className="bg-black text-white absolute my-10 mx-10 p-1 rounded-lg z-40">
          Closed
        </h1>
        <RestaurentCard {...props} />;
      </div>
    );
  };
};

export default RestaurentCard;
