import { useState } from "react";
import Search from "./components/Search/Search";
import "./App.css";
import ClipLoader from "react-spinners/ClipLoader";

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
            <div className="location-name">
              {data.name}
            </div>
            <div>
              {data.main ? (
                <h1 className="temperature">
                  {data.main.temp.toFixed()}°F
                </h1>
              ) : null}
            </div>
            <div>
              {data.weather?.length ? (
                <p>{data.weather[0].description}</p>
              ) : null}
            </div>
          </div>
          {data.name !== undefined && (
            <div className="snapshot">
              {data.main ? (
                <div>
                  Feels Like
                  <div>
                    {data.main.feels_like.toFixed()}°F
                  </div>
                </div>
              ) : null}
              {data.main ? (
                <div>
                  Humidity
                  <div>{data.main.humidity}%</div>
                </div>
              ) : null}
              {data.wind ? (
                <div>
                  Wind Speed
                  <div>
                    {data.wind.speed.toFixed()} MPH
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
