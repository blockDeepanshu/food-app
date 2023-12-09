import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { update } from "../store/slice/locationSlice";

export const useLocation = () => {
  const [response, setResponse] = useState(null);

  const dispatch = useDispatch();

  const fetchData = async () => {
    const data = await fetch("https://ipapi.co/json/");
    const res = await data.json();
    setResponse(res);
  };

  useEffect(() => {
    fetchData();
    dispatch(
      update({
        lat: response ? response.latitude : "18.969539",
        lng: response ? response.longitude : "72.819329",
      })
    );
  }, []);

  return {
    address: `${response?.city},${response?.country_name}`,
  };
};
