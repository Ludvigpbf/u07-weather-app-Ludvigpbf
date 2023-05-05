import { createContext } from "react";
import {
  ForecastData,
  OutletProps,
  WeatherData,
} from "../interfaces/interfaces";

export const WeatherContext = createContext<OutletProps>({
  unit: "metric",
  setUnit: () => {},
  weatherData: {
    coord: {
      lon: 0,
      lat: 0,
    },
    weather: [],
    base: "",
    main: {
      temp: 0,
      feels_like: 0,
      pressure: 0,
      humidity: 0,
      temp_min: 0,
      temp_max: 0,
      sea_level: 0,
      grnd_level: 0,
    },
    visibility: 0,
    wind: {
      speed: 0,
      deg: 0,
      gust: 0,
    },
    clouds: {
      all: 0,
    },
    rain: { "1h": 0, "3h": 0 },
    snow: { "1h": 0, "3h": 0 },
    dt: 0,
    sys: {
      type: 0,
      id: 0,
      message: 0,
      country: "",
      sunrise: "",
      sunset: "",
    },
    timezone: 0,
    id: 0,
    name: "",
    cod: 0,
    localTime: "",
  },
  forecastData: {
    city: {
      name: "",
      country: "",
    },
    list: [
      {
        dt: 0,
        main: {
          temp: 0,
          feels_like: 0,
          temp_min: 0,
          temp_max: 0,
          pressure: 0,
          sea_level: 0,
          grnd_level: 0,
          humidity: 0,
          temp_kf: 0,
        },
        weather: [
          {
            id: 0,
            main: "",
            description: "",
            icon: "",
          },
        ],
        clouds: {
          all: 0,
        },
        wind: [
          {
            speed: 0,
            deg: 0,
            gust: 0,
          },
        ],
        visibility: 0,
        pop: 0,
        rain: {
          "3h": 0,
        },
        sys: {
          pod: "",
        },
        dt_txt: "",
      },
    ],
  },
  calculateTemperature: () => 0,
  setWeatherData: () => {},
  forecastDataContext: {} as ForecastData,
  weatherDataContext: {} as WeatherData,
});
