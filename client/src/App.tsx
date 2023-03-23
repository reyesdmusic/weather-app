import { useState } from "react";
import Autocomplete from "./components/Autocomplete";

function App() {
  const [data, setData] = useState<any>({});
  const [error, setError] = useState<any>(null);

  return (
    <div className="px-5 py-20 flex flex-col items-center text-gray-700 h-full">
      <div className="w-full max-w-[500px] h-full">
        <div>
          <Autocomplete setData={setData} setError={setError} />
        </div>
        {error ? (
          <div>Sorry, couldn't find that location</div>
        ) : (
          <div className="h-full flex flex-col justify-between">
            <div>
              <div className="mt-[50px] text-[20px] font-medium">
                {data.name}
              </div>
              <div>
                {data.main ? (
                  <h1 className="text-[80px] text-indigo-600 font-black leading-none">
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
              <div className="rounded-md bg-indigo-50 flex justify-between p-4 text-center">
                {data.main ? (
                  <div>
                    Feels Like
                    <div className="font-semibold">
                      {data.main.feels_like.toFixed()}°F
                    </div>
                  </div>
                ) : null}
                {data.main ? (
                  <div>
                    Humidity
                    <div className="font-semibold">{data.main.humidity}%</div>
                  </div>
                ) : null}
                {data.wind ? (
                  <div>
                    Wind Speed
                    <div className="font-semibold">
                      {data.wind.speed.toFixed()} MPH
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
export default App;
