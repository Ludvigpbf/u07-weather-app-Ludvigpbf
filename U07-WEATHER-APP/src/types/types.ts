export type ForecastData = {
  city: {
    name: string;
    country: string;
  };
  list: {
    dt: number;
    dt_txt: string;
    main: {
      temp: number;
      temp_max: number;
      temp_min: number;
    };
  }[];
};