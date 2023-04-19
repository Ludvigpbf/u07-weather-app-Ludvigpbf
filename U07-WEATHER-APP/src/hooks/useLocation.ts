import { useState, useEffect } from "react";

export const useLocation = () => {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const getLocation = () => {
      if (!navigator.geolocation) {
        setStatus("Geolocation is not supported by your browser!");
      } else {
        setStatus("Loading...");
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus("");
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    };
    getLocation();
  }, []);

  return { lat, lng, status };
};
