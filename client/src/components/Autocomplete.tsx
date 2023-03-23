import React, { useState } from 'react';
import axios from 'axios';
import { KeyboardEvent } from 'react';

function Autocomplete(props) {
  const [location, setLocation] = useState('');
  const [locationOptions, setLocationOptions] = useState<any[]>([]);


  const searchLocation = (event: KeyboardEvent) => {
    if (location === "") {
      setLocationOptions([]);
    }
    if (event.key === 'Enter') {
      // props.setError(false)
      // axios.get("/api/weather", { params: { location } }).then((response) => {
      //   props.setData(response.data)
      // }).catch(e => {
      //   props.setError(true);
      //   console.error(e?.response?.status);
      // })
      // setLocation('')
    } else {
      axios.get("/api/location", { params: { location } }).then((response) => {
        console.log(response)
        setLocationOptions(response.data);
      }).catch(e => {
        // props.setError(true);
        // console.error(e?.response?.status);
      })
    }
  }

  return (
    <div className="relative">
      <input
        id="location"
        placeholder="City or Zip"
        className="peer block w-full border-gray-300 border-[1px] border-solid h-[40px] rounded-full pl-[10px] focus:outline-indigo-500 outline-offset-[1px] text-gray-700 placeholder-transparent"
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyUp={searchLocation}
        type="text" />
      <label htmlFor="location" className="absolute left-[14px] top-[-10px] text-sm text-indigo-500 peer-placeholder-shown:top-[10px] peer-placeholder-shown:text-md peer-placeholder-shown:left-[12px] peer-placeholder-shown:text-gray-400 bg-white transition-all">
        City or Zip
      </label>
      <div>
        {locationOptions?.length ? 
          locationOptions.map((location, i) => <div key={i}>{location?.name}{location?.state ? <span>, {location?.state}</span> : null}{location?.country ? <span> {location?.country}</span> : null}</div>)
        : null}
      </div>
    </div>
  );
}

export default Autocomplete;