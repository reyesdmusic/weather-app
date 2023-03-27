import { useState } from "react";
import "./App.css";
import Search from "./components/Search/Search";
import ClipLoader from "react-spinners/ClipLoader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import { Forecast, Snapshot } from "../../shared-types";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  const [snapshot, setSnapshot] = useState<Snapshot | {}>({});
  const [forecast, setForecast] = useState<Forecast | {}>({});
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="page">
      <Search setSnapshot={setSnapshot} setError={setError} setIsLoading={setIsLoading} setForecast={setForecast} />
      <Dashboard error={error} snapshot={snapshot} forecast={forecast} />
      <ErrorMessage error={error} />
      {isLoading 
        ? <ClipLoader color="var(--primary)" cssOverride={ { position: "absolute", top: "calc(50vh - 50px)" } }/>
        : null
      }
    </div>
  );
}
export default App;
