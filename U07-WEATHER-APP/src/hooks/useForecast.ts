import { useState, useEffect } from "react";
import { ForecastData } from "../interfaces/interfaces";

export const useForecast = (apiUrl: string): { data: ForecastData } => {
  const [data, setData] = useState<ForecastData>({
    city: { name: "", country: "" },
    list: [],
  });
  useEffect(() => {
    const getForecastData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.list) {
          setData({
            city: { name: data.city.name, country: data.city.country },
            list: data.list,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getForecastData();
  }, [apiUrl, setData]);

  return { data };
};
