import "./WeatherInfo.css";
import WeatherIcon from "../WeatherIcon/WeatherIcon";

function WeatherInfo({ snapshot }) {
  return (
    <article className="weather-info">
      <div>
        {snapshot.main ? (
          <h1 className="temperature">{snapshot.main.temp.toFixed()}°F</h1>
        ) : null}
        <WeatherIcon snapshot={snapshot} />
        <h2 className="location-description-container">
          {snapshot.name ? (
            <span className="location-name">{snapshot.name}</span>
          ) : null}
          {snapshot?.weather && snapshot?.weather[0]?.description ? (
            <span className="description">
              {snapshot.weather[0]?.description}
            </span>
          ) : null}
        </h2>
      </div>
    </article>
  );
}
export default WeatherInfo;
