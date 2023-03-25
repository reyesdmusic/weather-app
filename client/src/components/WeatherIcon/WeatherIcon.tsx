import "./WeatherIcon.css";
import { WiDayCloudy } from "react-icons/wi";

function WeatherIcon({data}) {

  return (
      <>
        {data.weather?.length ? (
          <div className="weather-icon-container">
            <WiDayCloudy />
          </div>
        ) : null}
      </>
  );
}
export default WeatherIcon;
