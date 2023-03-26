export type Forecast = {
  dt_txt: string;
  main: WeatherDetail;
};

type WeatherDetail = {
  temp: string;
  humidity: string;
};
