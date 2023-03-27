import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Search.css";
import useDebounce from "../../hooks/useDebounce";
import Autocomplete from "react-autocomplete";
import { CiLocationOn, CiSearch } from "react-icons/ci";
import { Forecast, Snapshot, LocationOption } from "../../../../shared-types";

interface Location {
  lat: string;
  lon: string;
}

// Type for locations HashTable used to store lat and lon values associated with a LocationOption
interface Locations {
  [key: string]: Location;
}

function Search({ setError, setIsLoading, setSnapshot, setForecast }) {
  const [search, setSearch] = useState<string>("");
  const [locationOptions, setLocationOptions] = useState<LocationOption[]>([]);
  const [selectedLocationName, setSelectedLocationName] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [geoLocation, setGeoLocation] = useState<GeolocationCoordinates | null>(
    null
  );
  const locations: Locations | {} = {};

  const debouncedSearch = useDebounce(search, 300);
  useEffect(() => {
    async function fetchLocations() {
      await axios
        .get("/api/location", { params: { location: search } })
        .then((response) => {
          const locations: LocationOption[] = response?.data;
          setLocationOptions(locations);
        });
    }

    if (debouncedSearch) fetchLocations();
    else setLocationOptions([]);
  }, [debouncedSearch]);

  useEffect(() => {
    if (!locations[selectedLocationName] && !search) return;
    setError(false);

    const lat = locations[selectedLocationName]?.lat;
    const lon = locations[selectedLocationName]?.lon;

    const params: any = {};

    if (lat && lon) {
      params.lat = lat;
      params.lon = lon;
    } else {
      params.location = search;
    }

    axios
      .get("/api/weather", { params })
      .then((response) => {
        setSearch("");
        setSelectedLocationName("");
        const snapshot: Snapshot = response?.data;
        setSnapshot(snapshot);
      })
      .catch(() => {
        setError(true);
        setSearch("");
        setSelectedLocationName("");
      });

    axios
      .get("/api/forecast", { params })
      .then((response) => {
        const forecast: Forecast = response?.data;
        setForecast(forecast);
      })
      .catch(() => {
        setError(true);
      });
  }, [selectedLocationName]);

  useEffect(() => {
    if (!geoLocation) return;

    const { latitude, longitude } = geoLocation;

    if (!latitude || !longitude) return;

    axios
      .get("/api/weather", { params: { lat: latitude, lon: longitude } })
      .then((response) => {
        setSearch("");
        setSnapshot(response.data);
      })
      .catch(() => {
        setError(true);
      });
  }, [geoLocation]);

  function fetchGeolocation() {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition((position) => {
      setIsLoading(false);
      setError(false);
      const geoLocation: GeolocationCoordinates = position?.coords;
      setGeoLocation(geoLocation);
    });
  }
  function onKeyUp(e) {
    if (e.key === "Enter") {
      onSubmit();
    }
  }

  function onSubmit() {
    if (!selectedLocationName && search) {
      setSelectedLocationName(search);
    }
  }

  return (
    <header className="search-form">
      <div className="search-input-container" onKeyUp={(e) => onKeyUp(e)}>
        <label className={isFocused ? "label-focused" : ""}>Location</label>
        <Autocomplete
          getItemValue={(item) => item?.label}
          items={locationOptions.map((locationOption: LocationOption) => {
            const { name, state, lat, lon } = locationOption;

            const city = `${name || ""}`;
            const stateName = `${state || ""}`;

            const label = `${city}, ${stateName}`;

            const location: Location = { lat, lon };

            locations[label] = location;

            const item = { label };

            return item;
          })}
          renderItem={(item, isHighlighted) => (
            <option
              key={`${item.label}-${item.latitude}-${item.longitude}`}
              style={{
                background: isHighlighted
                  ? "var(--accent)"
                  : "var(--background)",
                cursor: "pointer",
                padding: "6px",
              }}
            >
              {item.label}
            </option>
          )}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSelect={(val) => {
            setSearch(val);
            setSelectedLocationName(val);
          }}
          inputProps={{
            onFocus: () => setIsFocused(true),
            onBlur: () => (search ? null : setIsFocused(false)),
          }}
          wrapperStyle={{ width: "100%" }}
        />
        <button
          className="location-icon-button"
          aria-label="get current location"
          onClick={fetchGeolocation}
        >
          <CiLocationOn className="location-icon" />
        </button>
      </div>
      <button
        className="search-icon-button"
        aria-label={`get weather data ${search ? `for ${search}` : ""}`}
        onClick={onSubmit}
      >
        <CiSearch className="search-icon" />
      </button>
    </header>
  );
}

export default Search;
