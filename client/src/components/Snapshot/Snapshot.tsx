
import "./Snapshot.css";
import { WiStrongWind, WiThermometer, WiHumidity } from "react-icons/wi";

function Snapshot({ snapshot }) {
  return (
    <>
      {(
        <div> 
          {snapshot.name !== undefined && (
            <div className="snapshot">
              {snapshot.main ? (
                <div className="snapshot-item">
                  <WiThermometer className="snapshot-icon" />
                  <span>Feels like</span>
                  <div className="snapshot-data">
                    {snapshot.main.feels_like.toFixed()}°F
                  </div>
                </div>
              ) : null}
              {snapshot.main ? (
                <div className="snapshot-item">
                  <WiHumidity className="snapshot-icon" />
                  <span>Humidity</span>
                  <div className="snapshot-data">{snapshot.main.humidity}%</div>
                </div>
              ) : null}
              {snapshot.wind ? (
                <div className="snapshot-item">
                  <WiStrongWind className="snapshot-icon" />
                  <span>Wind Speed</span>
                  <div className="snapshot-data">
                    {snapshot.wind.speed.toFixed()} <span className="mph">MPH</span>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      )}
    </>
  );
}
export default Snapshot;
