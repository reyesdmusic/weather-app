import { useState } from "react";
import Search from "./components/Search/Search";
import "./App.css";
import ClipLoader from "react-spinners/ClipLoader";
import Snapshot from "./components/Snapshot/Snapshot";
import WeatherInfo from "./components/WeatherInfo/WeatherInfo";
import Chart from './components/Chart/Chart';

function App() {
  const [data, setData] = useState<any>({});
  const [forecast, setForecast] = useState<any>({});
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="page">
      <Search setData={setData} setError={setError} setIsLoading={setIsLoading} setForecast={setForecast} />
      {error ? (
        <div>Sorry, couldn't find that location</div>
      ) : (
        <>
          <WeatherInfo data={data} />
          <Snapshot data={data} />
          <Chart data={forecast} />
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
