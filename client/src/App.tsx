import { useState } from "react";
import "./App.css";
import Search from "./components/Search/Search";
import ClipLoader from "react-spinners/ClipLoader";
import SnapshotComponent from "./components/Snapshot/Snapshot";
import WeatherInfo from "./components/WeatherInfo/WeatherInfo";
import ForecastComponent from './components/Forecast/Forecast';
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import { Forecast, Snapshot } from "../../shared-types";

function App() {
  const [snapshot, setSnapshot] = useState<Snapshot | {}>({});
  const [forecast, setForecast] = useState<Forecast | {}>({});
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="page">
      <Search setSnapshot={setSnapshot} setError={setError} setIsLoading={setIsLoading} setForecast={setForecast} />
      {error ? (
        <ErrorMessage error={error} />
      ) : (
        <>
          <WeatherInfo snapshot={snapshot} />
          <SnapshotComponent snapshot={snapshot} />
          <ForecastComponent forecast={forecast} />
        </>
      )}
      {isLoading 
        ? <ClipLoader color="var(--primary)" cssOverride={ { position: "absolute", top: "calc(50vh - 50px)" } }/>
        : null
      }
    </div>
  );
}
export default App;
