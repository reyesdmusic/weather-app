import express, { Application, Request, Response } from "express";
const app: Application = express();
const axios = require("axios");

const API_KEY = "ff3af498ead27371a1dcb730a1c7e5a7";

app.get("/api/weather", (req: Request, res: Response) => {
  const { location, lat, lon } = req?.query;

  if (!location && (!lat || !lon)) return;

  let url = lat && lon
    ? `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`
    : `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${API_KEY}`;

  axios
    .get(url)
    .then((response) => {
      if (response?.data) {
        res.json(response.data);
      }
    })
    .catch((e) => {
      if (e?.response?.status) {
        res.status(e.response.status).send();
      }
    });
});

app.get("/api/forecast", (req: Request, res: Response) => {
  const { location, lat, lon } = req?.query;

  if (!location && (!lat || !lon)) return;

  let url = lat && lon
    ? `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`
    : `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=imperial&appid=${API_KEY}`;

  axios
    .get(url)
    .then((response) => {
      if (response?.data) {
        res.json(response.data);
      }
    })
    .catch((e) => {
      if (e?.response?.status) {
        res.status(e.response.status).send();
      }
    });
});

app.get("/api/location", (req: Request, res: Response) => {
  const location = req.query.location;

  if (!location) return;

  const GEO_LOCATE_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${API_KEY}`;

  axios
  .get(GEO_LOCATE_URL)
  .then((response) => {
    if (response?.data) {
      res.json(response.data);
    }
  })
  .catch((e) => {
    if (e?.response?.status) {
      res.status(e.response.status).send();
    }
  });
});

app.listen(5001, () => {
  console.log("Server started on port 5001");
});
