import "./WeatherInfo.css";
import WeatherIcon from "../WeatherIcon/WeatherIcon";

function WeatherInfo({snapshot}) {

  return (
    <article className="weather-info"> 
      <div>
        {snapshot.main ? (
            <h1 className="temperature">
              {snapshot.main.temp.toFixed()}°F
            </h1>
          ) : null}
        <WeatherIcon snapshot={snapshot} />
        <div className="location-description-container">
          {snapshot.name ? (
            <div className="location-name">
              {snapshot.name}
            </div>
          ) : null}
          {snapshot?.weather && snapshot?.weather[0]?.description ? (
            <div className="description">
              {snapshot.weather[0]?.description}
            </div>
          ) : null}   
        </div>
      </div>
    </article>
  );
}
export default WeatherInfo;
