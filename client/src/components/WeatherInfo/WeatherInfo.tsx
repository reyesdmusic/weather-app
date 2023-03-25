import "./WeatherInfo.css";
import WeatherIcon from "../WeatherIcon/WeatherIcon";
import { WiDayCloudy } from "react-icons/wi";

function WeatherInfo({data}) {

  return (
    <div className="weather-info"> 
      <div>
        {data.main ? (
            <h1 className="temperature">
              {data.main.temp.toFixed()}°F
            </h1>
          ) : null}
        <WeatherIcon data={data} />
        <div className="location-description-container">
          {data.name ? (
            <div className="location-name">
              {data.name}
            </div>
          ) : null}
          {data?.weather && data?.weather[0]?.description ? (
            <div className="description">
              {data.weather[0]?.description}
            </div>
          ) : null}   
        </div>
      </div>
    </div>
  );
}
export default WeatherInfo;
