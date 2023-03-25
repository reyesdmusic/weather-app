import { useState } from "react";
import Search from "./components/Search/Search";
import "./App.css";
import ClipLoader from "react-spinners/ClipLoader";
import { WiDayCloudy, WiStrongWind, WiThermometer, WiHumidity } from "react-icons/wi";

function App() {
  const [data, setData] = useState<any>({});
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="page">
      <Search setData={setData} setError={setError} setIsLoading={setIsLoading} />
      {error ? (
        <div>Sorry, couldn't find that location</div>
      ) : (
        <div className="weather-info"> 
          <div>
            {data.main ? (
                <h1 className="temperature">
                  {data.main.temp.toFixed()}°F
                </h1>
              ) : null}
            {data.weather?.length ? (
              <div className="weather-icon-container">
                <WiDayCloudy />
              </div>
            ) : null}
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
          {data.name !== undefined && (
            <div className="snapshot">
              {data.main ? (
                <div className="snapshot-item">
                  <WiThermometer className="snapshot-icon" />
                  <span>Feels like</span>
                  <div className="snapshot-data">
                    {data.main.feels_like.toFixed()}°F
                  </div>
                </div>
              ) : null}
              {data.main ? (
                <div className="snapshot-item">
                  <WiHumidity className="snapshot-icon" />
                  <span>Humidity</span>
                  <div className="snapshot-data">{data.main.humidity}%</div>
                </div>
              ) : null}
              {data.wind ? (
                <div className="snapshot-item">
                  <WiStrongWind className="snapshot-icon" />
                  <span>Wind Speed</span>
                  <div className="snapshot-data">
                    {data.wind.speed.toFixed()} <span className="mph">MPH</span>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      )}
      {isLoading 
        ? <ClipLoader color="var(--primary)" cssOverride={ { position: "absolute", top: "calc(50vh - 50px)" } }/>
        : null
      }
    </div>
  );
}
export default App;
