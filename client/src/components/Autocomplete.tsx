import React, { useState } from 'react';
import axios from 'axios';
import { KeyboardEvent } from 'react';

function Autocomplete(props) {
  const [data, setData] = useState<any>({});
  const [location, setLocation] = useState('');
  const [error, setError] = useState<any>(null);

  const searchLocation = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      axios.get("/api/weather", { params: { location } }).then((response) => {
        props.setData(response.data)
      }).catch(e => {
        setError({ hasError: true, status: e?.response?.status })
      })
      setLocation('')
    }
  }

  return (
    <div className="relative">
      <input
        id="location"
        placeholder="City or Zip"
        className="peer block w-full border-gray-200 border-[1px] border-solid h-[40px] rounded-sm pl-[5px] focus:outline-gray-300 outline-offset-[1px] text-gray-500 placeholder-transparent"
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        type="text" />
      <label htmlFor="location" className="absolute left-[8px] top-[-10px] text-sm text-gray-500 peer-placeholder-shown:top-[10px] peer-placeholder-shown:text-md peer-placeholder-shown:left-[7px] peer-placeholder-shown:text-gray-400 bg-white transition-all">
        City or Zip
      </label>
    </div>
  );
}

export default Autocomplete;