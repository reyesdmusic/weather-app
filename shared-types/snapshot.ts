
export interface Snapshot {
  main: SnapshotWeatherDetail;
  name: string;
  weather: Weather[]; 
};

interface SnapshotWeatherDetail {
  feels_like: string;
  humidity: string;
  wind: Wind;
  temp: string;
}

interface Wind {
  speed: string;
}

interface Weather {
  icon: string;
  description: string;
}