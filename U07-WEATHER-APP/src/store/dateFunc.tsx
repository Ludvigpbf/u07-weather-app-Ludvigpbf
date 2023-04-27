import { useState, useEffect } from "react";
export const getCurrentTime = () => {
  const date = new Date();
  const month = (date.getMonth() + 1).toString();
  const todaysDate = date.getDate().toString().padStart(2, "0");
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  const day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][date.getDay()];

  return {
    time: `${hour}:${minute}`,
    day: day,
    date: `${todaysDate}/${month}`,
  };
};

export const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return currentTime;
};
