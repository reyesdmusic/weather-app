import "./WeatherIcon.css";
import { WiDayCloudy, WiMoonAltFull, WiDaySunny, WiCloudy, WiNightAltCloudy, WiNightAltThunderstorm, WiDayThunderstorm, WiDayShowers, WiDayRain, WiNightAltShowers, WiNightAltRain, WiDaySnowWind, WiNightAltSnowWind, WiDust, WiDayCloudyHigh, WiNightAltCloudyHigh } from "react-icons/wi";
import { ReactElement, useEffect, useState } from "react";

function WeatherIcon({ snapshot }) {
  const [icon, setIcon] = useState(<WiDayCloudy />);

interface Icons {
  [key: string]: ReactElement;
}

const icons: Icons = {
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
    if (snapshot.weather) {
      const iconId = snapshot.weather[0]?.icon;
      setIcon(icons[iconId])
    }
  }, [snapshot]);
  

  return (
      <>
        {snapshot.weather?.length ? (
          <div className="weather-icon-container">
            {icon}
          </div>
        ) : null}
      </>
  );
}
export default WeatherIcon;
