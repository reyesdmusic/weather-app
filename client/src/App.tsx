import { useState } from "react";
import Search from "./components/Search/Search";
import "./App.css";
import ClipLoader from "react-spinners/ClipLoader";
import { WiDayCloudy } from "react-icons/wi";
import Snapshot from "./components/Snapshot/Snapshot";

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
          <Snapshot data={data} />
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
