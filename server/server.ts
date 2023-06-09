import express, { Application, Request, Response } from "express";
const app: Application = express();
const axios = require("axios");
import { Forecast, Snapshot, LocationOption } from "../shared-types";
import handleError from "./utils/handleError";

const API_KEY = "ff3af498ead27371a1dcb730a1c7e5a7";

app.get("/api/weather", (req: Request, res: Response) => {
  const { location, lat, lon } = req?.query;

  if (!location && (!lat || !lon)) {
    res.status(400).send();
    handleError(400);
    return
  };

  // Set URL to lat and lon when it's provided,
  // if the location is a number set it to search by zip, 
  // otherwise set it search by location name
  let url;

    if (lat && lon) {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`
    } else {
      url = location && isNaN(+location)
        ? `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${API_KEY}`
        : `https://api.openweathermap.org/data/2.5/weather?zip=${location}&units=imperial&appid=${API_KEY}`;
    }

  axios
    .get(url)
    .then((response) => {
      const snapshot: Snapshot = response?.data;
      if (snapshot) {
        res.json(snapshot);
      }
    })
    .catch((e) => {
      if (e?.response?.status) {
        res.status(e.response.status).send();
        handleError(e);
      }
    });
});

app.get("/api/forecast", (req: Request, res: Response) => {
  const { location, lat, lon } = req?.query;

  if (!location && (!lat || !lon)) {
    res.status(400).send();
    handleError(400);
    return
  };

  // Set URL to lat and lon when it's provided,
  // otherwise set it search by location - which can be name or zip
  let url = lat && lon
    ? `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`
    : `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=imperial&appid=${API_KEY}`;

  axios
    .get(url)
    .then((response) => {
      const forecast: Forecast = response?.data;
      if (forecast) {
        res.json(forecast);
      }
    })
    .catch((e) => {
      if (e?.response?.status) {
        res.status(e.response.status).send();
        handleError(e);
      }
    });
});

app.get("/api/location", (req: Request, res: Response) => {
  const location = req.query.location;

  if (!location) {
    res.status(400).send();
    handleError(400);
    return
  };

  const GEO_LOCATE_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${API_KEY}`;

  axios
  .get(GEO_LOCATE_URL)
  .then((response) => {
    const locationOptions: LocationOption[] = response.data; 
    if (locationOptions) {
      res.json(locationOptions);
    }
  })
  .catch((e) => {
    if (e?.response?.status) {
      res.status(e.response.status).send();
      handleError(e);
    }
  });
});

app.listen(5001, () => {
  console.log("Server started on port 5001");
});
