import Forecast from "../Forecast/Forecast";
import Snapshot from "../Snapshot/Snapshot";
import WeatherInfo from "../WeatherInfo/WeatherInfo";

function Dashboard({ error, snapshot, forecast }) {
  if (error) return null;

  return (
    <>
      <WeatherInfo snapshot={snapshot} />
      <Snapshot snapshot={snapshot} />
      <Forecast forecast={forecast} />
    </>
  );
}

export default Dashboard;
