import { CDN_URL } from "../utils/constants";

const RestaurentCard = (props) => {
  const { resData } = props;
  const { name, avgRating, cuisines, sla, cloudinaryImageId } = resData.info;
  return (
    <div className="res-card">
      <img
        className="res-logo"
        alt="res-logo"
        src={CDN_URL + cloudinaryImageId}
      />
      <div className="res-detail">
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

export default RestaurentCard;
