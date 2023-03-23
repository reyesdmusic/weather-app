import express, { Application, Request, Response } from "express";
const app: Application = express();
const axios = require("axios");

// const OPEN_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?q=miami&appid=ff3af498ead27371a1dcb730a1c7e5a7';

// const GEO_LOCATE_URL = 'http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}'

// 
const API_KEY = "ff3af498ead27371a1dcb730a1c7e5a7";
app.get("/api/weather", (req: Request, res: Response) => {
  const location = req.query.location;

  if (!location) return;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${API_KEY}`;

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

  console.log({ isnan: isNaN(+location), location })

  if (isNaN(+location)) {
    axios
    .get(GEO_LOCATE_URL)
    .then((response) => {
      if (response?.data) {
        console.log({response})
        res.json(response.data);
      }
    })
    .catch((e) => {
      if (e?.response?.status) {
        res.status(e.response.status).send();
      }
    });
  } else if (location.length === 5) {
    const ZIP_LOCATE_URL = `http://api.openweathermap.org/geo/1.0/zip?zip=${location}&appid=${API_KEY}`
    axios
    .get(ZIP_LOCATE_URL)
    .then((response) => {
      if (response?.data) {
        console.log({response})
        res.json([response.data]);
      }
    })
    .catch((e) => {
      // if (e?.response?.status) {
      //   res.status(e.response.status).send();
      // }
    });
  }
});

app.listen(5001, () => {
  console.log("Server started on port 5001");
});
