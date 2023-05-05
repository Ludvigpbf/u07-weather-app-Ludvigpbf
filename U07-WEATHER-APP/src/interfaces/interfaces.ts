import { Dispatch, SetStateAction, ComponentProps } from "react";

export interface WeatherData {
  localTime: string | number | Date;
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  rain?: {
    "1h": number;
    "3h": number;
  };
  snow?: {
    "1h": number;
    "3h": number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    message: number;
    country: string;
    sunrise: string;
    sunset: string;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
  time?: string;
}

export interface ForecastData {
  city: {
    name: string;
    country: string;
  };
  list: {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    rain: {
      "3h": number;
    };
    sys: {
      pod: string;
    };
    dt_txt: string;
    time?: string;
  }[];
}

export interface OutletProps extends ComponentProps<any> {
  unit: string;
  setUnit: Dispatch<SetStateAction<string>>;
  weatherData: WeatherData;

  setWeatherData: Dispatch<SetStateAction<WeatherData>>;
  forecastData: ForecastData;
}

export interface AppProps {
  weatherData: WeatherData;
  forecastData: ForecastData;
  unit: string;
  setUnit: Dispatch<SetStateAction<string>>;

  setWeatherData: Dispatch<SetStateAction<WeatherData>>;
  toggleUnit: () => void;
}

export interface HeaderProps {
  toggleUnit: () => void;
}

export interface WorldWeatherProps {
  unit: string;
}
