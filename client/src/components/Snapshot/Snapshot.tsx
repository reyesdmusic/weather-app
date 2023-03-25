
import "./Snapshot.css";
import { WiStrongWind, WiThermometer, WiHumidity } from "react-icons/wi";

function Snapshot({data}) {
  return (
    <>
      {(
        <div> 
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
    </>
  );
}
export default Snapshot;
