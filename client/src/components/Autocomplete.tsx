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
    <input
      value={location}
      onChange={event => setLocation(event.target.value)}
      onKeyPress={searchLocation}
      placeholder='Enter Location'
      type="text" />
  );
}

export default Autocomplete;