export interface ForecastData {
  city: {
    name: string;
    country: string;
  };
  list: {
    rain: {
      "3h": number;
    };
    sys: any;
    visibility: any;
    wind: any;
    time: any;
    dt: number;
    dt_txt: string;
    main: {
      temp: number;
      temp_max: number;
      temp_min: number;
      icon: string;
      humidity: number;
    };
    weather: {
      icon: string;
      main: string;
      description: string;
    }[];
  }[];
}

export interface WeatherData {
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
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
  localTime: any;
}
