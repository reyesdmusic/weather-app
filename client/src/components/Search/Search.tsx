import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Search.css";
import useDebounce from "../../shared/hooks/useDebounce";
import Autocomplete from "react-autocomplete";
import { CiLocationOn } from "react-icons/ci";

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
    if (!locations[selectedLocationName]) return;

    const { location } = locations[selectedLocationName];

    if (location) {
      axios.get("/api/weather", { params: { location } }).then((response) => {
        setSearch("");
        props.setData(response.data);
      });
    } else {
      props.setError(true);
    }
  }, [selectedLocationName]);

  useEffect(() => {
    const { latitude, longitude } = geoLocation;

    if (!latitude || !longitude) return;

    axios.get("/api/weather", { params: { lat: latitude, lon: longitude } }).then((response) => {
      setSearch("");
      props.setData(response.data);
    }).catch(e => {
      console.error(e);
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

  return (
    <div className="search-input-container">
      <label className={isFocused ? "label-focused" : ""}>Location</label>
      <Autocomplete
      id="search"
      getItemValue={(item) => item.label}
      items={locationOptions.map((location) => {
        const city = `${location?.name ? location?.name : ""}`;
        const state = `${location?.state ? `, ${location?.state}` : ""}`;
        const country = location?.country || "";

        const label = `${city}${state}`;
        const queryParam = `${city},${state},${country}`;

        locations[label] = { location: queryParam };

        const item = { label };

        return item;
      })}
      renderItem={(item, isHighlighted) => (
        <option
          key={item.label}
          style={{ background: isHighlighted ? "var(--accent)" : "var(--background)", cursor: "pointer", padding: "6px" }}
        >
          {item.label}
        </option>
      )}
      value={search}
      onChange={(event) => {
        console.log({event})
        setSearch(event.target.value);
      }}
      onSelect={(val) => {
        setSelectedLocationName(val);
        setSearch(val);
      }}

      inputProps={{ onFocus: () => setIsFocused(true), onBlur: () => search ? null : setIsFocused(false) }}
      wrapperStyle={ { width: "100%" }}
    />
    <button className="icon-button" aria-label="geolocate" onClick={fetchGeolocation} >
      <CiLocationOn className="icon" />
    </button>
    </div>
  );
}

export default Search;
