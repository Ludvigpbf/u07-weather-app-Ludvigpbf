export interface ForecastData {
  city: {
    name: string;
    country: string;
  };
  list: {
    time: any;
    dt: number;
    dt_txt: string;
    main: {
      temp: number;
      temp_max: number;
      temp_min: number;
      icon: string;
    };
    weather: {
      icon: string;
    };
  }[];
}

export interface WeatherData {
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
  };
  name: string;
}
