import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { KeyboardEvent } from 'react';
import './Search.css';
import useDebounce from '../../shared/hooks/useDebounce';
import Autocomplete from 'react-autocomplete';

function Search(props) {
  const [search, setSearch] = useState('');
  const [locationOptions, setLocationOptions] = useState<any[]>([]);
  const [selectedLocationName, setSelectedLocationName] = useState('');
  const locations = {};

  const debouncedSearch = useDebounce(search, 300);
  useEffect(() => {
    async function fetchLocations() {

      await axios.get("/api/location", { params: { location: search } }).then((response) => {
        setLocationOptions(response.data);
      })
    }

    if (debouncedSearch) fetchLocations();
    else setLocationOptions([]);
  }, [debouncedSearch])

  useEffect(() => {
    if (!locations[selectedLocationName]) return;

    const { lat, lon } = locations[selectedLocationName];

    if (lat && lon) {
      axios.get("/api/weather", { params: { lat, lon } }).then((response) => {
        setSearch('');
        props.setData(response.data);
      })
    } else {
      props.setError(true);
    }
   
  }, [selectedLocationName])

  return (

    <Autocomplete
      getItemValue={(item) => item.label}
      items={locationOptions.map(location => {
        const city = `${location?.name ? location?.name : ''}`;
        const state = `${location?.state ? `, ${location?.state}` : ''}`;
        const label = `${city}${state}`;

        locations[label] = location;

        const item = { label };

        return item;
      })}
      renderItem={(item, isHighlighted) =>
        <div key={item.label} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
          {item.label}
        </div>
      }
      value={search}
      onChange={event => setSearch(event.target.value)}
      onSelect={(val) => {
        setSelectedLocationName(val);
        setSearch(val);
      }}
      onEnter={() => {
        setSelectedLocationName(search);
      }}
    />
  );
}

export default Search;