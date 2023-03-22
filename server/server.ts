import express, { Application, Request, Response } from 'express';
const app: Application = express();
const axios = require('axios');


// const OPEN_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?q=miami&appid=ff3af498ead27371a1dcb730a1c7e5a7';

// const GEO_LOCATE_URL = 'http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}'

// http://api.openweathermap.org/geo/1.0/zip?zip=23221&appid=ff3af498ead27371a1dcb730a1c7e5a7
const API_KEY = 'ff3af498ead27371a1dcb730a1c7e5a7';
app.get("/api/weather", (req: Request, res: Response) => {

    const location = req.query.location;

    if (!location) return;


    const GEO_LOCATE_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${API_KEY}`;

    axios.get(GEO_LOCATE_URL).then((response) => {
        if (response.data) {
            console.log(response)
            // const OPEN_WEATHER_URL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=f${API_KEY}`;
        }
    })

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${API_KEY}`;

    axios.get(url).then((response) => {
        if (response?.data) {
            res.json(response.data)
        }
    }).catch(e => {
        if (e?.response?.status) {
            res.status(e.response.status).send()
        }
    })
    
})

app.listen(5001, () => { console.log("Server started on port 5001") })