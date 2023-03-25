import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Search.css";
import useDebounce from "../../shared/hooks/useDebounce";
import Autocomplete from "react-autocomplete";
import { CiLocationOn, CiSearch } from "react-icons/ci";

function Search(props) {
  const [search, setSearch] = useState("");
  const [locationOptions, setLocationOptions] = useState<any[]>([]);
  const [selectedLocationName, setSelectedLocationName] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [geoLocation, setGeoLocation] = useState<any>({});
  const locations = {};

  const debouncedSearch = useDebounce(search, 300);
  useEffect(() => {
    async function fetchLocations() {
      await axios
        .get("/api/location", { params: { location: search } })
        .then((response) => {
          setLocationOptions(response.data);
        });
    }

    if (debouncedSearch) fetchLocations();
    else setLocationOptions([]);
  }, [debouncedSearch]);

  useEffect(() => {
    if (!locations[selectedLocationName] && !search) return;

    const lat = locations[selectedLocationName]?.lat;
    const lon = locations[selectedLocationName]?.lon;

    const params: any = {};

    if (lat && lon) {
      params.lat = lat;
      params.lon = lon;
    } else {
      params.location = search;
    }

    axios.get("/api/weather", {params}).then((response) => {
      setSearch("");
      setSelectedLocationName("");
      props.setData(response.data);
    }).catch(() => {
      props.setError(true);
    });


  }, [selectedLocationName]);

  useEffect(() => {
    const { latitude, longitude } = geoLocation;

    if (!latitude || !longitude) return;

    axios.get("/api/weather", { params: { lat: latitude, lon: longitude } }).then((response) => {
      console.log({response})
      setSearch("");
      props.setData(response.data);
    }).catch(e => {
      console.log('error!')
      props.setError(true);
    });
  
  }, [geoLocation]);

  function fetchGeolocation() {
    props.setIsLoading(true);
    navigator.geolocation.getCurrentPosition(position => {
      props.setIsLoading(false);
      setGeoLocation(position?.coords);
    })
  }

  function onSubmit(e) {
    if (e.key === 'Enter' && !selectedLocationName && search) {
      setSelectedLocationName(search)
    }
  }

  return (
      <div 
        className="search-input-container"
        onKeyUp={(e) => onSubmit(e)}
      >
        <label className={isFocused ? "label-focused" : ""}>Location</label>
        <Autocomplete
          id="search"
          getItemValue={(item) => item.label}
          items={locationOptions.map((location) => {

            if (!location) return;

            const { name, state, lat, lon } = location;

            const city = `${name || ""}`;
            const stateName = `${state || ""}`;

            const label = `${city}, ${stateName}`;

            locations[label] = { lat, lon };

            const item = { label };

            return item;
          })}
          renderItem={(item, isHighlighted) => (
            <option
              key={`${item.label}-${Math.floor(Math.random() * Date.now())}`}
              style={{ background: isHighlighted ? "var(--accent)" : "var(--background)", cursor: "pointer", padding: "6px" }}
            >
              {item.label}
            </option>
          )}
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          onSelect={(val) => {
            setSelectedLocationName(val);
            setSearch(val);
          }}
          inputProps={{ onFocus: () => setIsFocused(true), onBlur: () => search ? null : setIsFocused(false) }}
          wrapperStyle={ { width: "100%" }}
        />
        <button className="location-icon-button" aria-label="geolocate" onClick={fetchGeolocation} >
          <CiLocationOn className="location-icon" />
        </button>
        </div>
  );
}

export default Search;
