import { useState } from "react";
import "./App.css";
import Search from "./components/Search/Search";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import { Forecast, Snapshot } from "../../shared-types";
import Dashboard from "./components/Dashboard/Dashboard";
import Spinner from "./components/Spinner/Spinner";

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
      <Spinner isLoading={isLoading} />
    </div>
  );
}
export default App;
