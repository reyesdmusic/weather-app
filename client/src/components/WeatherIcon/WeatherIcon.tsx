import "./WeatherIcon.css";
import { WiDayCloudy, WiMoonAltFull, WiDaySunny, WiCloudy, WiNightAltCloudy, WiNightAltThunderstorm, WiDayThunderstorm, WiDayShowers, WiDayRain, WiNightAltShowers, WiNightAltRain, WiDaySnowWind, WiNightAltSnowWind, WiDust, WiDayCloudyHigh, WiNightAltCloudyHigh } from "react-icons/wi";
import { useEffect, useState } from "react";

function WeatherIcon({data}) {
  const [icon, setIcon] = useState(<WiDayCloudy />);

const icons = {
    "01d": <WiDaySunny/>,
    "01n": <WiMoonAltFull  />,
    "02d": <WiCloudy />,
    "02n": <WiNightAltCloudy />,
    "03d": <WiDayCloudyHigh />,
    "03n": <WiNightAltCloudyHigh />,
    "04d": <WiDayCloudy />,
    "04n": <WiNightAltCloudy />,
    "09d": <WiDayShowers />,
    "09n": <WiNightAltShowers />,
    "10d": <WiDayRain />,
    "10n": <WiNightAltRain />,
    "11d": <WiDayThunderstorm />,
    "11n": <WiNightAltThunderstorm />,
    "13d": <WiDaySnowWind />,
    "13n": <WiNightAltSnowWind />,
    "50d": <WiDust />,
    "50n": <WiDust />
  }


  useEffect(() => {
    if (data.weather) {
      const iconId = data.weather[0]?.icon;
      setIcon(icons[iconId])
    }
  }, [data]);
  

  return (
      <>
        {data.weather?.length ? (
          <div className="weather-icon-container">
            {icon}
          </div>
        ) : null}
      </>
  );
}
export default WeatherIcon;
