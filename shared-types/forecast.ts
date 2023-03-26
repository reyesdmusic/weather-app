export interface Forecast {
  dt_txt: string;
  main: WeatherDetail;
};

interface WeatherDetail {
  temp: string;
  humidity: string;
};
